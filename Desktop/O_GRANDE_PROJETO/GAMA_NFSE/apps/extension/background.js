/**
 * GAMA NFS-e AutoFill — Background Service Worker (Manifest V3)
 *
 * Responsabilidades:
 * 1. Listener onMessageExternal — recebe mensagens da Vercel App
 * 2. Validação de payload — verifica campos obrigatórios
 * 3. Storage management — salva em chrome.storage.local com TTL
 * 4. Tab management — abre ou foca abano do portal NFS-e
 *
 * Security:
 * - Valida sender origin (externally_connectable domain)
 * - TTL de 5 min para auto-limpeza
 * - Logging sem dados sensíveis
 */

// ========== CONFIGURAÇÃO ==========
const PORTAL_URL = 'https://www.nfse.gov.br/EmissorNacional/DPS/Pessoas';
const STORAGE_KEY = 'nfse_auto_fill_payload';
const STORAGE_TTL_MS = 5 * 60 * 1000; // 5 minutos
const REQUIRED_FIELDS = [
  'competencia',
  'cnpj_tomador',
  'nome_tomador',
  'endereco_tomador',
  'municipio_tomador',
  'estado_tomador',
  'cep_tomador',
  'local_prestacao',
  'valor_servico'
];

// ========== UTILITÁRIOS ==========

/**
 * Valida estrutura do payload
 * @param {Object} payload - Payload recebido da Vercel App
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validatePayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload não é um objeto válido'] };
  }

  // Verifica campos obrigatórios
  const missingFields = REQUIRED_FIELDS.filter(field => !payload[field]);
  if (missingFields.length > 0) {
    errors.push(`Campos faltando: ${missingFields.join(', ')}`);
  }

  // Valida CNPJ (formato básico: XX.XXX.XXX/XXXX-XX)
  if (payload.cnpj_tomador && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(payload.cnpj_tomador)) {
    errors.push('CNPJ em formato inválido');
  }

  // Valida CEP (formato básico: XXXXX-XXX)
  if (payload.cep_tomador && !/^\d{5}-\d{3}$/.test(payload.cep_tomador)) {
    errors.push('CEP em formato inválido');
  }

  // Valida valor (deve ser número > 0)
  if (payload.valor_servico) {
    const valor = parseFloat(payload.valor_servico);
    if (isNaN(valor) || valor <= 0) {
      errors.push('Valor de serviço inválido (deve ser > 0)');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Salva payload em chrome.storage.local com TTL
 * @param {Object} payload - Payload validado
 * @returns {Promise<void>}
 */
function savePayloadWithTTL(payload) {
  return new Promise((resolve, reject) => {
    const storageData = {
      [STORAGE_KEY]: {
        ...payload,
        timestamp: Date.now()
      }
    };

    chrome.storage.local.set(storageData, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(`Storage failed: ${chrome.runtime.lastError.message}`));
        return;
      }

      console.log(`[GAMA] Payload salvo em storage com TTL de ${STORAGE_TTL_MS}ms`);
      console.log(`[GAMA] Timestamp: ${storageData[STORAGE_KEY].timestamp}`);

      // Agenda limpeza automática após TTL
      setTimeout(() => {
        chrome.storage.local.remove(STORAGE_KEY, () => {
          if (chrome.runtime.lastError) {
            console.warn(`[GAMA] Erro ao limpar storage: ${chrome.runtime.lastError.message}`);
          } else {
            console.log('[GAMA] Payload auto-removido do storage após TTL');
          }
        });
      }, STORAGE_TTL_MS);

      resolve();
    });
  });
}

/**
 * Abre ou foca abano do portal NFS-e
 * @returns {Promise<number>} Tab ID onde portal foi aberto/focado
 */
function openOrFocusPortalTab() {
  return new Promise((resolve, reject) => {
    // Procura por abano existente do portal
    chrome.tabs.query(
      { url: 'https://www.nfse.gov.br/*' },
      (existingTabs) => {
        if (chrome.runtime.lastError) {
          reject(new Error(`Tab query failed: ${chrome.runtime.lastError.message}`));
          return;
        }

        if (existingTabs && existingTabs.length > 0) {
          // Foca primeira abano existente
          const tabId = existingTabs[0].id;
          chrome.tabs.update(tabId, { active: true }, (updatedTab) => {
            if (chrome.runtime.lastError) {
              reject(new Error(`Tab update failed: ${chrome.runtime.lastError.message}`));
              return;
            }
            console.log(`[GAMA] Abano do portal focada: ${tabId}`);
            resolve(tabId);
          });
        } else {
          // Cria nova abano
          chrome.tabs.create({ url: PORTAL_URL, active: true }, (newTab) => {
            if (chrome.runtime.lastError) {
              reject(new Error(`Tab create failed: ${chrome.runtime.lastError.message}`));
              return;
            }
            console.log(`[GAMA] Nova abano do portal criada: ${newTab.id}`);
            resolve(newTab.id);
          });
        }
      }
    );
  });
}

// ========== MESSAGE LISTENER ==========

/**
 * Listener para mensagens da Vercel App via chrome.runtime.onMessageExternal
 */
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    // Log da mensagem recebida (sem dados sensíveis)
    console.log(`[GAMA] Mensagem recebida de: ${sender.origin}`);
    console.log(`[GAMA] Campos no payload:`, Object.keys(request));

    // Valida payload
    const validation = validatePayload(request);
    if (!validation.valid) {
      const errorMsg = `Payload inválido: ${validation.errors.join('; ')}`;
      console.error(`[GAMA] ${errorMsg}`);
      sendResponse({
        status: 'error',
        reason: errorMsg
      });
      return; // Não continua
    }

    console.log('[GAMA] Payload validado com sucesso');

    // Salva payload em storage e abre/foca portal
    savePayloadWithTTL(request)
      .then(() => openOrFocusPortalTab())
      .then((tabId) => {
        console.log(`[GAMA] Fluxo completo: payload salvo + portal aberto (tab ${tabId})`);
        sendResponse({
          status: 'success',
          tabId: tabId,
          timestamp: Date.now()
        });
      })
      .catch((error) => {
        const errorMsg = `Falha no fluxo: ${error.message}`;
        console.error(`[GAMA] ${errorMsg}`);
        sendResponse({
          status: 'error',
          reason: errorMsg
        });
      });

    // Indica que sendResponse será chamado de forma assíncrona
    return true;
  }
);

// ========== LOGS INICIAIS ==========
console.log('[GAMA] Service Worker iniciado');
console.log(`[GAMA] Portal URL: ${PORTAL_URL}`);
console.log(`[GAMA] Storage TTL: ${STORAGE_TTL_MS}ms`);
console.log(`[GAMA] Campos obrigatórios: ${REQUIRED_FIELDS.join(', ')}`);
