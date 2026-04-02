/**
 * GAMA NFS-e AutoFill — Content Script
 * Runs on: https://www.nfse.gov.br/EmissorNacional/DPS/Pessoas
 *
 * Responsibilities:
 * 1. Load selectors from selectors-live.json
 * 2. Read payload from chrome.storage.local (sent by background.js)
 * 3. Detect when portal form fields render (MutationObserver)
 * 4. Inject form values into fields
 * 5. Simulate user events (input, change, blur)
 * 6. Clean up storage after injection
 * 7. Provide user feedback
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  STORAGE_KEY: 'nfse_auto_fill_payload',
  MUTATION_OBSERVER_TIMEOUT: 30000, // 30 seconds
  INJECTION_DELAY: 500, // ms between field injections
  CLEANUP_DELAY: 1000, // ms before clearing storage
  LOG_PREFIX: '[GAMA-NFSE-ContentScript]'
};

// Selectors mapping (inlined from selectors-live.json)
const SELECTORS = {
  competencia: {
    label: 'Competência da NFS-e',
    type: 'select',
    primary: "[name='competencia']",
    secondary: '#competencia',
    tertiary: "[aria-label*='Competência']"
  },
  cnpj_tomador: {
    label: 'CNPJ / CPF / NIF do Tomador',
    type: 'input',
    primary: "[name='cnpj_tomador']",
    secondary: '#cnpj_tomador',
    tertiary: "[placeholder*='CNPJ']"
  },
  nome_tomador: {
    label: 'Nome / Nome Empresarial do Tomador',
    type: 'input',
    primary: "[name='nome_tomador']",
    secondary: '#nome_tomador',
    tertiary: "[placeholder*='Nome']"
  },
  endereco_tomador: {
    label: 'Endereço do Tomador',
    type: 'input',
    primary: "[name='endereco_tomador']",
    secondary: '#endereco_tomador',
    tertiary: "[placeholder*='Endereço']"
  },
  municipio_tomador: {
    label: 'Município do Tomador',
    type: 'input',
    primary: "[name='municipio_tomador']",
    secondary: '#municipio_tomador',
    tertiary: "[placeholder*='Município']"
  },
  cep_tomador: {
    label: 'CEP do Tomador',
    type: 'input',
    primary: "[name='cep_tomador']",
    secondary: '#cep_tomador',
    tertiary: "[placeholder*='CEP']"
  },
  local_prestacao: {
    label: 'Local da Prestação',
    type: 'input',
    primary: "[name='local_prestacao']",
    secondary: '#local_prestacao',
    tertiary: "[placeholder*='Local']"
  },
  valor_servico: {
    label: 'Valor do Serviço',
    type: 'input',
    primary: "[name='valor_servico']",
    secondary: '#valor_servico',
    tertiary: "[placeholder*='Valor']"
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Log with consistent prefix
 */
function log(message, data = null) {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  if (data) {
    console.log(`${CONFIG.LOG_PREFIX} [${timestamp}] ${message}`, data);
  } else {
    console.log(`${CONFIG.LOG_PREFIX} [${timestamp}] ${message}`);
  }
}

/**
 * Find element using selector hierarchy
 */
function findElement(fieldName) {
  const selector = SELECTORS[fieldName];
  if (!selector) {
    log(`⚠️ Selector not found for field: ${fieldName}`);
    return null;
  }

  // Try primary selector
  let el = document.querySelector(selector.primary);
  if (el) {
    log(`✅ Found ${fieldName} via primary selector`);
    return el;
  }

  // Try secondary selector
  el = document.querySelector(selector.secondary);
  if (el) {
    log(`✅ Found ${fieldName} via secondary selector`);
    return el;
  }

  // Try tertiary selector
  el = document.querySelector(selector.tertiary);
  if (el) {
    log(`✅ Found ${fieldName} via tertiary selector`);
    return el;
  }

  // Try fallback: find by label text
  el = findByLabelText(selector.label);
  if (el) {
    log(`✅ Found ${fieldName} via label text fallback`);
    return el;
  }

  log(`❌ Field not found: ${fieldName}`);
  return null;
}

/**
 * Find element by associated label text
 */
function findByLabelText(labelText) {
  // Find all labels
  const labels = document.querySelectorAll('label');
  for (const label of labels) {
    if (label.textContent.includes(labelText)) {
      // Try htmlFor attribute
      if (label.htmlFor) {
        const el = document.getElementById(label.htmlFor);
        if (el) return el;
      }

      // Try finding input in parent
      const container = label.closest('form, div, fieldset');
      if (container) {
        const el = container.querySelector('input, select');
        if (el) return el;
      }
    }
  }
  return null;
}

/**
 * Check if all required field elements are present in DOM
 */
function areAllFieldsPresent() {
  const requiredFields = Object.keys(SELECTORS);
  for (const fieldName of requiredFields) {
    const el = findElement(fieldName);
    if (!el) {
      log(`⏳ Waiting for field: ${fieldName}`);
      return false;
    }
  }
  return true;
}

/**
 * Validate payload structure
 */
function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    log('❌ Invalid payload: not an object');
    return false;
  }

  const requiredFields = [
    'competencia',
    'cnpj_tomador',
    'nome_tomador',
    'endereco_tomador',
    'municipio_tomador',
    'cep_tomador',
    'local_prestacao',
    'valor_servico'
  ];

  for (const field of requiredFields) {
    if (!payload[field]) {
      log(`❌ Missing field in payload: ${field}`);
      return false;
    }
  }

  return true;
}

/**
 * Inject value into form field with event simulation
 */
function injectValue(fieldName, value) {
  const el = findElement(fieldName);
  if (!el) {
    log(`❌ Cannot inject ${fieldName}: element not found`);
    return false;
  }

  try {
    // Get the value setter from HTMLInputElement or HTMLSelectElement
    const descriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(el),
      'value'
    );

    if (!descriptor || !descriptor.set) {
      log(`❌ Cannot inject ${fieldName}: no value setter found`);
      return false;
    }

    // Set value using the descriptor
    descriptor.set.call(el, value);
    log(`✅ Injected value into ${fieldName}: ${value}`);

    // Dispatch events to trigger React/Angular validation
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));

    return true;
  } catch (error) {
    log(`❌ Error injecting ${fieldName}: ${error.message}`, error);
    return false;
  }
}

/**
 * Display notification to user
 */
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  if (type === 'success') {
    notification.style.backgroundColor = '#10B981';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#EF4444';
    notification.style.color = 'white';
  } else {
    notification.style.backgroundColor = '#3B82F6';
    notification.style.color = 'white';
  }

  notification.textContent = message;
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => notification.remove(), 5000);
}

// ============================================================================
// MAIN FLOW
// ============================================================================

/**
 * Main initialization function
 */
async function initialize() {
  log('Content Script initialized on NFS-e portal');

  // Step 1: Read payload from chrome.storage.local
  let payload;
  try {
    const stored = await chrome.storage.local.get(CONFIG.STORAGE_KEY);
    payload = stored[CONFIG.STORAGE_KEY];

    if (!payload) {
      log('ℹ️ No payload found in storage (first load or no request yet)');
      // Don't exit - wait for future message or MutationObserver
    } else {
      log('✅ Payload retrieved from storage', payload);
    }
  } catch (error) {
    log(`❌ Error reading storage: ${error.message}`, error);
    showNotification('Erro ao acessar storage', 'error');
    return;
  }

  // Step 2: Start MutationObserver to detect when form renders
  setupMutationObserver(payload);

  // Step 3: If payload exists and fields are ready, inject immediately
  if (payload && validatePayload(payload)) {
    if (areAllFieldsPresent()) {
      log('🎯 All fields present, starting injection');
      await injectPayload(payload);
    } else {
      log('⏳ Payload loaded but fields not ready yet, waiting...');
    }
  }
}

/**
 * Set up MutationObserver to detect when form fields render
 */
function setupMutationObserver(initialPayload) {
  let timeout;
  let observerStartTime = Date.now();

  const observer = new MutationObserver(() => {
    const elapsed = Date.now() - observerStartTime;

    // Check if fields are now present
    if (areAllFieldsPresent()) {
      log('🎯 MutationObserver detected all fields present');
      observer.disconnect();
      clearTimeout(timeout);

      // Use initial payload if available, otherwise wait for new message
      if (initialPayload && validatePayload(initialPayload)) {
        injectPayload(initialPayload);
      }
    }

    // Log progress every 5 seconds
    if (elapsed % 5000 < 100) {
      log(`⏳ MutationObserver monitoring... (${elapsed / 1000}s elapsed)`);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Timeout: stop observing after 30s
  timeout = setTimeout(() => {
    observer.disconnect();
    log(`⚠️ MutationObserver timeout after ${CONFIG.MUTATION_OBSERVER_TIMEOUT}ms`);
  }, CONFIG.MUTATION_OBSERVER_TIMEOUT);

  log('🔍 MutationObserver started');
}

/**
 * Inject payload into all form fields
 */
async function injectPayload(payload) {
  log('🚀 Starting payload injection');

  const fieldNames = Object.keys(SELECTORS);
  let successCount = 0;
  let failureCount = 0;

  // Inject each field with delay
  for (const fieldName of fieldNames) {
    const value = payload[fieldName];
    if (value !== undefined) {
      const success = injectValue(fieldName, value);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }

      // Delay between injections
      await new Promise(resolve => setTimeout(resolve, CONFIG.INJECTION_DELAY));
    }
  }

  log(`✅ Injection complete: ${successCount} success, ${failureCount} failures`);

  // Step 3: Cleanup storage after injection
  cleanupStorage();

  // Step 4: Show user feedback
  if (failureCount === 0) {
    showNotification(
      '✅ Campos preenchidos com sucesso! Clique em "Emitir" para finalizar.',
      'success'
    );
  } else {
    showNotification(
      `⚠️ ${failureCount} campos não foram preenchidos. Verifique manualmente.`,
      'error'
    );
  }
}

/**
 * Clear payload from storage after injection
 */
async function cleanupStorage() {
  // Wait before cleanup
  await new Promise(resolve => setTimeout(resolve, CONFIG.CLEANUP_DELAY));

  try {
    await chrome.storage.local.remove(CONFIG.STORAGE_KEY);
    log('✅ Storage cleaned up (payload removed)');
  } catch (error) {
    log(`⚠️ Error cleaning up storage: ${error.message}`);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Run initialize when content script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Log when script is ready
log('Content Script loaded and ready');
