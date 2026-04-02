/**
 * GAMA NFS-e AutoFill — Content Script (Manifest V3)
 *
 * Responsabilidades:
 * 1. Lê payload de chrome.storage.local
 * 2. Aguarda DOM estar pronto (MutationObserver)
 * 3. Injeta valores nos campos do portal
 * 4. Simula eventos (input, change, blur) para ativar validações
 * 5. Limpa storage após injeção (cleanup)
 *
 * Security:
 * - Usa event simulation (não atribuição direta de valor)
 * - Cleanup automático após 2 segundos
 * - Nenhuma transmissão de dados
 */

// ========== CONFIGURAÇÃO ==========
const STORAGE_KEY = 'nfse_auto_fill_payload';
const DOM_READY_TIMEOUT = 10000; // 10 segundos
const CLEANUP_DELAY = 2000; // 2 segundos após injeção

// Mapeamento de campos: campo_payload -> seletor_dom
const FIELD_SELECTORS = {
  competencia: { primary: '[name="competencia"]', label: 'Competência' },
  cnpj_tomador: { primary: '[name="cnpj_tomador"]', label: 'CNPJ' },
  nome_tomador: { primary: '[name="nome_tomador"]', label: 'Nome' },
  endereco_tomador: { primary: '[name="endereco_tomador"]', label: 'Endereço' },
  municipio_tomador: { primary: '[name="municipio_tomador"]', label: 'Município' },
  estado_tomador: { primary: '[name="estado_tomador"]', label: 'Estado' },
  cep_tomador: { primary: '[name="cep_tomador"]', label: 'CEP' },
  local_prestacao: { primary: '[name="local_prestacao"]', label: 'Local de Prestação' },
  valor_servico: { primary: '[name="valor_servico"]', label: 'Valor' }
};

// ========== UTILITÁRIOS ==========

/**
 * Injeta valor em campo usando event simulation
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} value - Valor a injetar
 * @param {string} fieldName - Nome do campo (para logging)
 */
function setInputValue(element, value, fieldName) {
  if (!element) {
    console.warn(`[GAMA] Campo não encontrado: ${fieldName}`);
    return false;
  }

  try {
    // Usa Object.getOwnPropertyDescriptor para definir valor sem trigger
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    nativeInputValueSetter.call(element, value);

    // Simula eventos para ativar validações
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));

    console.log(`[GAMA] Campo injetado: ${fieldName} = "${value}"`);
    return true;
  } catch (error) {
    console.error(`[GAMA] Erro ao injetar ${fieldName}: ${error.message}`);
    return false;
  }
}

/**
 * Aguarda elemento estar disponível no DOM
 * @param {string} selector - Seletor CSS
 * @param {number} timeout - Timeout em ms
 * @returns {Promise<HTMLElement|null>}
 */
function waitForElement(selector, timeout = DOM_READY_TIMEOUT) {
  return new Promise((resolve) => {
    let timeoutId;

    // Verificação imediata
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    // MutationObserver para aguardar
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Timeout
    timeoutId = setTimeout(() => {
      observer.disconnect();
      console.warn(`[GAMA] Timeout aguardando seletor: ${selector}`);
      resolve(null);
    }, timeout);
  });
}

/**
 * Aguarda que todos os campos estejam disponíveis
 * @returns {Promise<boolean>}
 */
async function waitForAllFields() {
  console.log('[GAMA] Aguardando campos do portal...');

  const selectorArray = Object.entries(FIELD_SELECTORS).map(
    ([field, config]) => waitForElement(config.primary)
  );

  const results = await Promise.all(selectorArray);
  const allFound = results.every(el => el !== null);

  if (allFound) {
    console.log('[GAMA] Todos os campos encontrados!');
  } else {
    const missing = Object.entries(FIELD_SELECTORS)
      .filter(([_, config], idx) => !results[idx])
      .map(([_, config]) => config.label);
    console.warn(`[GAMA] Campos não encontrados: ${missing.join(', ')}`);
  }

  return allFound;
}

/**
 * Injeta todos os valores do payload
 * @param {Object} payload - Payload com dados a injetar
 * @returns {number} Quantidade de campos injetados com sucesso
 */
function injectAllValues(payload) {
  let injectedCount = 0;

  Object.entries(FIELD_SELECTORS).forEach(([field, config]) => {
    if (payload[field] === undefined) {
      console.warn(`[GAMA] Campo não está no payload: ${field}`);
      return;
    }

    const element = document.querySelector(config.primary);
    if (setInputValue(element, payload[field], config.label)) {
      injectedCount++;
    }
  });

  return injectedCount;
}

/**
 * Limpa payload do storage após injeção
 * @returns {Promise<void>}
 */
function cleanupStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.remove(STORAGE_KEY, () => {
      if (chrome.runtime.lastError) {
        console.warn(`[GAMA] Erro ao limpar storage: ${chrome.runtime.lastError.message}`);
      } else {
        console.log('[GAMA] Storage limpo (cleanup)');
      }
      resolve();
    });
  });
}

// ========== FLUXO PRINCIPAL ==========

/**
 * Executa fluxo completo de injeção
 */
async function executeInjectionFlow() {
  console.log('[GAMA] Content Script iniciado no portal');

  // 1. Lê payload do storage
  const storageData = await new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      resolve(result[STORAGE_KEY]);
    });
  });

  if (!storageData) {
    console.log('[GAMA] Nenhum payload em storage (esperado se nova abano)');
    return;
  }

  console.log('[GAMA] Payload lido do storage');
  console.log(`[GAMA] Timestamp do payload: ${storageData.timestamp}`);

  // 2. Aguarda campos do portal estarem prontos
  const fieldsReady = await waitForAllFields();
  if (!fieldsReady) {
    console.warn('[GAMA] Alguns campos não foram encontrados, injetando disponíveis...');
  }

  // 3. Injeta valores
  const injectedCount = injectAllValues(storageData);
  console.log(`[GAMA] ${injectedCount} campos injetados com sucesso`);

  // 4. Aguarda delay e limpa storage
  setTimeout(() => {
    cleanupStorage();
  }, CLEANUP_DELAY);

  // 5. Log final
  console.log('[GAMA] Fluxo de injeção completo');
}

// ========== INICIALIZAÇÃO ==========

// Inicia fluxo apenas se estamos no portal
if (window.location.href.includes('nfse.gov.br')) {
  // Aguarda documento estar carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeInjectionFlow);
  } else {
    executeInjectionFlow();
  }
}
