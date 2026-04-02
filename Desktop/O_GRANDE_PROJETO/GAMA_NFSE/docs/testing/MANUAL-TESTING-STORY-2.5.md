# Story 2.5 — Manual Testing & Extension Verification

**Story ID:** EPIC-GAMA-NFSE-002.5  
**Date:** 2026-04-01  
**Tester:** @dev (Dex)  
**Status:** READY FOR TESTING

---

## 📋 Pre-Testing Checklist

- [ ] Chrome 120+ instalado
- [ ] Extension carregada unpacked em `chrome://extensions/`
- [ ] Extension ID anotado e configurado em `.env.local` da Vercel App
- [ ] Vercel App em execução (localhost ou staging)
- [ ] DevTools aberta (F12)

---

## 🧪 Test 1: Extension Loads Without Errors

**Acceptance Criteria:**
- Extension appears in `chrome://extensions/`
- No permission warnings
- No security warnings
- Extension ID visible

**Steps:**

1. Abra `chrome://extensions/`
2. Procure "GAMA NFS-e AutoFill"
3. **Verificar:**
   - [ ] Extension listada com versão 1.0.0
   - [ ] Status: "Enabled"
   - [ ] 0 warnings
   - [ ] Extension ID visível (ex: `abcdefghijklmnopqrstuvwxyz123456`)

**Expected Result:** ✅ Extension pronta para uso

---

## 🧪 Test 2: Vercel App → Extension Communication (IMDI Client)

**Acceptance Criteria:**
- Message received in Service Worker
- DevTools logs show `[GAMA]` messages
- No errors in console

**Steps:**

1. Abra Vercel App: `http://localhost:3000/dashboard`
2. Login com password
3. Formulário pré-preenchido com dados:
   - **Cliente:** IMDI
   - **Competência:** 04/2026
   - **Valor:** 1800.00
   - (outros campos fixos)
4. Clique **"Preencher no Portal"**
5. **Verificar Service Worker logs:**
   - [ ] Abra `chrome://extensions/`
   - [ ] Clique "service worker" em "Details" da extension
   - [ ] Console deve mostrar:
     ```
     [GAMA] Mensagem recebida de: https://gama-nfse.vercel.app
     [GAMA] Campos no payload: ["competencia", "cnpj_tomador", ...]
     [GAMA] Payload validado com sucesso
     [GAMA] Payload salvo em storage com TTL...
     [GAMA] Abano do portal focada: 123
     [GAMA] Fluxo completo: payload salvo + portal aberto
     ```

**Expected Result:** ✅ Message received and logged

---

## 🧪 Test 3: Chrome Storage Accessibility

**Acceptance Criteria:**
- chrome.storage.local contains payload
- Payload structure is correct
- TTL timer starting

**Steps:**

1. Após Test 2 (message enviada)
2. DevTools > **Application** tab
3. Esquerda sidebar: **Storage** > **chrome.storage.local**
4. **Verificar:**
   - [ ] Chave presente: `nfse_auto_fill_payload`
   - [ ] Valor é JSON object com campos:
     ```json
     {
       "competencia": "04/2026",
       "cnpj_tomador": "05.360.125/0001-46",
       "nome_tomador": "IMDI — Instituto...",
       "endereco_tomador": "LUIZ ARGOLO, 116...",
       "municipio_tomador": "Santo Antônio de Jesus",
       "estado_tomador": "BA",
       "cep_tomador": "44440-364",
       "local_prestacao": "Santo Antônio de Jesus - BA",
       "valor_servico": "1800.00",
       "timestamp": 1712102400000
     }
     ```
   - [ ] Timestamp presente (Unix milliseconds)
5. **Aguarde 5+ minutos:**
   - [ ] Payload desaparece de chrome.storage.local
   - [ ] Service Worker console mostra: `[GAMA] Payload auto-removido do storage após TTL`

**Expected Result:** ✅ Payload stored with TTL working

---

## 🧪 Test 4: Portal Tab Opens/Focuses

**Acceptance Criteria:**
- Portal tab opens automatically
- URL correct
- Portal page responsive

**Steps:**

1. Após Test 2 (message enviada)
2. **Verificar:**
   - [ ] Nova abano abre automaticamente
   - [ ] URL is: `https://www.nfse.gov.br/EmissorNacional/DPS/Pessoas`
   - [ ] Página carrega (não é 404)
   - [ ] Abano está em foco (ativa)

3. Se abano já estava aberta:
   - [ ] Abano existente recebe foco (não abre nova)
   - [ ] Mesma URL

**Expected Result:** ✅ Portal tab opens/focuses correctly

---

## 🧪 Test 5: Content Script Logs

**Acceptance Criteria:**
- Content Script executa no portal
- Logs appear in console
- No injection errors

**Steps:**

1. Após Test 4 (portal abana já aberta)
2. Portal tab > **F12** para abrir DevTools
3. Tab **Console**
4. **Verificar logs:**
   - [ ] `[GAMA] Content Script iniciado no portal`
   - [ ] `[GAMA] Payload lido do storage`
   - [ ] `[GAMA] Aguardando campos do portal...`
   - [ ] `[GAMA] Todos os campos encontrados!` (ou warning se alguns não encontrados)
   - [ ] `[GAMA] Campo injetado: [field name] = "[value]"`... (9 vezes, 1 por campo)
   - [ ] `[GAMA] X campos injetados com sucesso` (X = 9 idealmente)
   - [ ] Após 2s: `[GAMA] Storage limpo (cleanup)`

**Expected Result:** ✅ Content Script executes and logs injection

---

## 🧪 Test 6: Fields Are Filled (Visual Verification)

**Acceptance Criteria:**
- All 8 portal fields contain injected values
- Values match what was sent

**Steps:**

1. Portal tab still open from Test 4-5
2. **Inspecione cada campo** (F12 > Console, ou visualmente):
   - [ ] **Competência:** contains "04/2026"
   - [ ] **CNPJ Tomador:** contains "05.360.125/0001-46"
   - [ ] **Nome Tomador:** contains "IMDI — Instituto..."
   - [ ] **Endereço:** contains "LUIZ ARGOLO, 116..."
   - [ ] **Município:** contains "Santo Antônio de Jesus"
   - [ ] **Estado:** contains "BA"
   - [ ] **CEP:** contains "44440-364"
   - [ ] **Local de Prestação:** contains "Santo Antônio de Jesus - BA"
   - [ ] **Valor Serviço:** contains "1800.00"

3. No console errors (vermelho) relating to fields

**Expected Result:** ✅ All fields filled correctly

---

## 🧪 Test 7: Repeat with OncoCenter Client

**Acceptance Criteria:**
- Extension communicates with new client data
- Previous payload overwritten
- Portal tab reuses (focuses) instead of opening new

**Steps:**

1. Return to Vercel App tab
2. **Change client:** Select "OncoCenter" from dropdown
3. **Verify data changes:**
   - [ ] CNPJ changes
   - [ ] Nome changes
   - [ ] Endereço changes
   - [ ] Etc.
4. Click **"Preencher no Portal"**
5. **Verificar:**
   - [ ] Service Worker logs show new message received
   - [ ] Storage now contains NEW cnpj_tomador, nome_tomador, etc.
   - [ ] Portal tab **reuses** (doesn't open new tab)
   - [ ] Content Script logs show new injection
   - [ ] Portal fields updated with new values
   - [ ] Old IMDI data is gone

**Expected Result:** ✅ Works with multiple clients

---

## 🧪 Test 8: Repeat with Santa Casa Client

**Acceptance Criteria:**
- Extension works with 3rd client
- All data flows correctly

**Steps:**

1. Return to Vercel App tab
2. **Change client:** Select "Santa Casa" from dropdown
3. Click **"Preencher no Portal"**
4. **Verificar:** (same as Test 7)
   - [ ] Message received
   - [ ] Storage updated
   - [ ] Tab reused
   - [ ] Fields updated

**Expected Result:** ✅ Works with all 3 test clients

---

## 🧪 Test 9: Error Handling — Missing Extension

**Acceptance Criteria:**
- Vercel App handles missing extension gracefully
- Error message displayed

**Steps:**

1. **Disable extension:** `chrome://extensions/` > Toggle OFF "GAMA NFS-e AutoFill"
2. Vercel App tab > "Preencher no Portal"
3. **Verificar:**
   - [ ] Error message appears (toast/modal)
   - [ ] Message like "Extension not found" or "Communication failed"
   - [ ] No JS console errors

4. **Re-enable extension:** Toggle back ON
5. "Preencher no Portal" > Should work again

**Expected Result:** ✅ Graceful error handling

---

## 🧪 Test 10: No Console Errors

**Acceptance Criteria:**
- No CRITICAL or HIGH severity errors
- Warnings acceptable (info only)

**Steps:**

1. Complete all Tests 1-9
2. Check both consoles for errors:
   - [ ] Service Worker console (extension logs)
   - [ ] Vercel App console (browser tab)
   - [ ] Portal console (portal page)

3. **Acceptable messages:**
   - `[GAMA]` info/debug logs ✅
   - Third-party library warnings (if any) ✅
   - CORS warnings about analytics ✅

4. **NOT acceptable:**
   - `Uncaught TypeError`
   - `Failed to fetch`
   - `undefined is not a function`
   - Anything in red (unless labeled [GAMA])

**Expected Result:** ✅ No critical errors

---

## 📊 Test Results Summary

| Test | Result | Notes |
|------|--------|-------|
| 1. Extension Loads | PASS/FAIL | Extension ID: `____________` |
| 2. Communication (IMDI) | PASS/FAIL | Logs observed: ____________ |
| 3. Storage | PASS/FAIL | TTL working: ____________ |
| 4. Portal Tab | PASS/FAIL | Tab ID: ____________ |
| 5. Content Script | PASS/FAIL | Fields injected: ____________ |
| 6. Visual Fields (IMDI) | PASS/FAIL | All 8 filled: ____________ |
| 7. OncoCenter | PASS/FAIL | Tab reused: ____________ |
| 8. Santa Casa | PASS/FAIL | All values updated: ____________ |
| 9. Error Handling | PASS/FAIL | Error message displayed: ____________ |
| 10. Console Errors | PASS/FAIL | No critical errors: ____________ |

---

## ✅ Story 2.5 Completion Checklist

- [ ] All 10 tests PASS
- [ ] Extension ID documented in `.env.local`
- [ ] Manual testing completed with all 3 clients
- [ ] DevTools logs reviewed (no critical errors)
- [ ] chrome.storage.local TTL verified (5+ min auto-clear)
- [ ] Portal fields visually confirmed filled
- [ ] Error handling tested (missing extension)
- [ ] README updated with test instructions
- [ ] Decision log created: `decision-log-story-2.5.md`
- [ ] Ready for @qa QA Gate

---

## 🐛 Issues Found During Testing

**Issue Template (if any):**

```
## Issue: [Title]

**Severity:** CRITICAL | HIGH | MEDIUM | LOW  
**Component:** Extension | Content Script | Portal | Vercel App

**Steps to Reproduce:**
1. ...
2. ...

**Expected:** ...  
**Actual:** ...

**Logs:**
[Console output]

**Fix:** [Proposed solution]
```

---

## 📝 Notes for QA

- Extension loads unpacked only (local testing)
- Must be installed before Vercel App is opened
- Portal URL is real government site (read-only testing safe)
- TTL cleanup happens silently (no user notification)
- Content Script only runs if portal page loads
- No server-side logging (all client-side)

---

**Tested by:** @dev (Dex)  
**Date:** ______ / ______ / 2026  
**Status:** ✅ READY FOR QA GATE (Story 2.5)
