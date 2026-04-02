/**
 * GAMA NFS-e AutoFill — Background Service Worker (Manifest V3)
 * Responsibilities:
 * 1. Listen for messages from Vercel app (via chrome.runtime.onMessageExternal)
 * 2. Validate message and sender origin
 * 3. Store payload in chrome.storage.local
 * 4. Open or focus the NFS-e portal tab
 * 5. Return response to Vercel app
 */

const CONFIG = {
  STORAGE_KEY: 'nfse_auto_fill_payload',
  PORTAL_URL: 'https://www.nfse.gov.br/EmissorNacional/DPS/Pessoas',
  ALLOWED_ORIGINS: [
    'https://gama-nfse.vercel.app',
    'http://localhost:3000' // For local development
  ],
  LOG_PREFIX: '[GAMA-NFSE-Background]'
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function log(message, data = null) {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  if (data) {
    console.log(`${CONFIG.LOG_PREFIX} [${timestamp}] ${message}`, data);
  } else {
    console.log(`${CONFIG.LOG_PREFIX} [${timestamp}] ${message}`);
  }
}

/**
 * Validate that message origin is allowed
 */
function isOriginAllowed(origin) {
  return CONFIG.ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

/**
 * Validate payload structure
 */
function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Payload is not an object' };
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
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  return { valid: true };
}

/**
 * Find or create the portal tab
 */
async function findOrCreatePortalTab() {
  try {
    // Try to find existing portal tab
    const tabs = await chrome.tabs.query({
      url: CONFIG.PORTAL_URL + '*'
    });

    if (tabs.length > 0) {
      // Focus the existing tab
      const tab = tabs[0];
      await chrome.tabs.update(tab.id, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
      log(`✅ Focused existing portal tab (ID: ${tab.id})`);
      return tab.id;
    }
  } catch (error) {
    log(`⚠️ Error finding existing tab: ${error.message}`);
  }

  // Create new tab
  try {
    const tab = await chrome.tabs.create({
      url: CONFIG.PORTAL_URL,
      active: true
    });
    log(`✅ Created new portal tab (ID: ${tab.id})`);
    return tab.id;
  } catch (error) {
    log(`❌ Error creating portal tab: ${error.message}`, error);
    throw error;
  }
}

/**
 * Store payload in chrome.storage.local
 */
async function storePayload(payload) {
  try {
    const storageData = {
      [CONFIG.STORAGE_KEY]: {
        ...payload,
        timestamp: Date.now()
      }
    };
    await chrome.storage.local.set(storageData);
    log('✅ Payload stored in chrome.storage.local');
  } catch (error) {
    log(`❌ Error storing payload: ${error.message}`, error);
    throw error;
  }
}

/**
 * Send message to content script
 */
async function notifyContentScript(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, {
      type: 'PAYLOAD_READY',
      message: 'Content script should read payload from storage'
    });
    log(`✅ Notified content script on tab ${tabId}`);
  } catch (error) {
    // Content script may not be loaded yet (normal)
    log(`ℹ️ Could not notify content script (may not be ready): ${error.message}`);
  }
}

// ============================================================================
// MESSAGE HANDLER
// ============================================================================

/**
 * Handle messages from external apps (Vercel app)
 */
chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    log('📨 Message received from external app', {
      origin: sender.origin,
      tab: sender.tab?.url
    });

    // Step 1: Validate sender origin
    if (!isOriginAllowed(sender.origin)) {
      log(`❌ Origin not allowed: ${sender.origin}`);
      sendResponse({
        success: false,
        error: 'Origin not allowed'
      });
      return true; // Will send response asynchronously
    }

    log('✅ Origin validated');

    // Step 2: Validate payload structure
    const validation = validatePayload(message);
    if (!validation.valid) {
      log(`❌ Invalid payload: ${validation.error}`);
      sendResponse({
        success: false,
        error: validation.error
      });
      return true;
    }

    log('✅ Payload validated');

    // Step 3: Handle the message asynchronously
    (async () => {
      try {
        // Store payload
        await storePayload(message);

        // Open/focus portal tab
        const tabId = await findOrCreatePortalTab();

        // Notify content script (if already loaded)
        await notifyContentScript(tabId);

        // Send success response
        log('✅ All steps completed successfully');
        sendResponse({
          success: true,
          tabId: tabId,
          message: 'Payload stored and portal tab opened'
        });
      } catch (error) {
        log(`❌ Error processing message: ${error.message}`, error);
        sendResponse({
          success: false,
          error: error.message
        });
      }
    })();

    // Return true to indicate we'll send response asynchronously
    return true;
  }
);

// ============================================================================
// INITIALIZATION
// ============================================================================

log('Background Service Worker initialized');
log(`Allowed origins: ${CONFIG.ALLOWED_ORIGINS.join(', ')}`);
log(`Portal URL: ${CONFIG.PORTAL_URL}`);

// Listen for install/update events
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    log('🎉 Extension installed');
  } else if (details.reason === 'update') {
    log('🔄 Extension updated');
  }
});
