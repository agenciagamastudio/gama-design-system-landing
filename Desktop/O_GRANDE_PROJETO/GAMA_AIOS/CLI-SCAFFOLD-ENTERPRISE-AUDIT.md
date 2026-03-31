# CLI Scaffold Enterprise Audit & Expansion Plan

**Data:** 2026-03-31  
**Status:** PLANNING  
**Owner:** Gama Studio + Claude Code  

---

## 📊 AUDIT FINDINGS

### 1. O_GRANDE_PROJETO Structure

**Total Directories:** 60+
**Size:** ~5-10GB (including node_modules)

#### Critical Directories (INCLUDE in CLI)
```
✅ .agent/              → Agent configs
✅ .aios/               → AIOS framework
✅ .aios-core/          → Core engine
✅ .codex/              → Codex configs
✅ .cursor/             → Cursor AI settings
✅ .gemini/             → Gemini configs
✅ .github/             → GitHub workflows + actions
✅ .vscode/             → VS Code settings
✅ agents/              → Custom agents
✅ aios-god-mode/       → AIOS God Mode skill
✅ aiox-squads-main/    → AIOX Squads
✅ GAMA_AIOS/           → Central documentation
✅ tasks/               → Task definitions
✅ templates/           → Project templates
✅ tools/               → Custom tools
✅ workflows/           → Workflow definitions
```

#### Secondary Directories (OPTIONAL in CLI)
```
⚠️  docs/               → Documentation (user-specific)
⚠️  backend/            → Project-specific
⚠️  frontend/           → Project-specific
```

#### GAMA Products (AS GLOBAL SYMLINKS)
```
🔗 GAMA_DESIGN_SYSTEM/gama-ds-platform/   → npm link (global)
🔗 GAMA_MONITOR/gama-monitor/             → npm link (global)
🔗 aios (npm package)                      → npm install -g
🔗 aiox (npm package)                      → npm install -g
```

#### DO NOT INCLUDE (Sensitive)
```
❌ .env                        → Secrets
❌ .env.local                  → Secrets
❌ mcp-servers/                → Local MCP setup
❌ node_modules/               → Let npm handle
❌ GAMA_GIT_SOURCE/            → Source repos
❌ GAMA_CONTRATOS/             → Legal/private
❌ session/                    → Session data
❌ inputs/, downloads/         → Temp files
```

---

## 🔐 SENSITIVE DATA AUDIT

### Found Issues
```
⚠️  /O_GRANDE_PROJETO/.env                  → CONTAINS: API keys, tokens
⚠️  /O_GRANDE_PROJETO/GAMA_AIOS/.env.local  → CONTAINS: Local overrides
⚠️  /O_GRANDE_PROJETO/GAMA_GIT_SOURCE/.env  → Git credentials
⚠️  Multiple .env files in GAMA_* projects  → Scattered secrets
```

### Remediation
```
✅ Create .env.example template
✅ Add to .npmignore (CLI won't publish secrets)
✅ Document in CLI setup: "Create .env from .env.example"
✅ Add to .gitignore: *.env, *.env.local
```

---

## 📦 GAMA_AIOS Documentation Gaps

### Current State
```
✅ AGENTS.md                           → Agent registry
✅ START-HERE.txt                      → Onboarding
✅ TOKEN-ECONOMY-*.md (5 files)        → Token system
✅ ONBOARDING.md                       → Setup guide
✅ README-TOKEN-ECONOMY.md             → Token docs
⚠️  MISSING: CLI-SCAFFOLD-SYSTEM.md    → THIS FILE (in progress)
⚠️  MISSING: DEPENDENCIES.md           → What gets installed
⚠️  MISSING: ARCHITECTURE.md           → System design
⚠️  MISSING: TROUBLESHOOTING.md        → Common issues
```

### What Needs to Be Added
```
1. CLI-SCAFFOLD-SYSTEM.md (PRIORITY 1)
   - What gama-aiox init installs
   - What gama-aiox setup configures
   - What gama-aiox audit validates
   - What gama-aiox update refreshes

2. DEPENDENCIES.md (PRIORITY 1)
   - npm packages: aios, aiox, gama-ds-platform, gama-monitor
   - Peer dependencies
   - Compatibility matrix
   - Version pinning strategy

3. ARCHITECTURE.md (PRIORITY 2)
   - System overview diagram
   - Component relationships
   - Data flow
   - Extension points

4. TROUBLESHOOTING.md (PRIORITY 2)
   - Common errors during scaffold
   - Setup issues
   - Symlink problems
   - Windows-specific issues

5. MAINTENANCE.md (PRIORITY 2)
   - Update procedures
   - Backup strategy
   - Health checks
   - Version management
```

---

## 🛠️ CLI EXPANSION PLAN

### Current State (v1.0.7)
```
$ npx gama-aiox init <project-name>
  ├─ Create directory
  ├─ Copy templates/default/
  ├─ Personalize package.json
  ├─ git init + commit
  └─ npm install
```

### Expanded State (v2.0.0+)

#### Command 1: `gama-aiox init` (ENHANCED)
```bash
npx gama-aiox init my-project [OPTIONS]

Options:
  --full              Include all GAMA customizations (default)
  --minimal           Only base template
  --include-monitor   Add GAMA Monitor integration
  --include-ds        Add Design System as dev dependency
  --skip-git
  --skip-install

Features:
  • Copy templates/
  • Copy tools/
  • Copy workflows/
  • Copy agents/
  • Copy tasks/
  • Setup .github/, .vscode/, .codex/, .cursor/, .gemini/
  • Create .env.example
```

#### Command 2: `gama-aiox setup` (NEW)
```bash
npx gama-aiox setup [OPTIONS]

Steps:
  1. Install npm packages:
     - npm install -g aios
     - npm install -g aiox
     - npm link gama-ds-platform (global)
     - npm link gama-monitor (global)
  
  2. Link GAMA projects:
     - Create symlinks in ~/Documents/gama-links/
     - Add to PATH environment variable
  
  3. Configure system:
     - Copy .github/workflows to local machine
     - Setup pre-commit hooks
     - Configure IDE integration
  
  4. Validate:
     - Run gama-aiox audit
     - Output: "✅ All systems ready"
```

#### Command 3: `gama-aiox audit` (NEW)
```bash
npx gama-aiox audit [PROJECT_PATH]

Checks:
  1. ✅ All required files present
  2. ✅ No sensitive data exposed (.env in git)
  3. ✅ npm packages installed correctly
  4. ✅ Design System accessible
  5. ✅ Monitor running
  6. ✅ Workflows executable
  7. ✅ Agents registered
  8. ✅ Git hooks configured
  
Output:
  GREEN:  All checks passed
  YELLOW: Warnings (optional fixes)
  RED:    Errors (must fix)
```

#### Command 4: `gama-aiox update` (NEW)
```bash
npx gama-aiox update [OPTIONS]

Actions:
  1. Sync from O_GRANDE_PROJETO:
     - Compare local vs remote checksums
     - Update only changed files
     - Preserve .env files
  
  2. Update npm packages:
     - npm update aios
     - npm update aiox
     - Check compatibility
  
  3. Refresh configurations:
     - Pull latest .github/ workflows
     - Update .vscode/ settings
     - Sync agents/ and tasks/
  
  4. Run audit:
     - Validate after update
     - Report any issues

Options:
  --dry-run           Show what would change
  --force             Force all updates
  --backup            Create backup before update
```

#### Command 5: `gama-aiox doctor` (BONUS)
```bash
gama-aiox doctor

Diagnoses:
  • npm version compatibility
  • Node version check
  • Required env vars
  • Disk space
  • Git configuration
  • SSH keys for GitHub
  • npm token status
  • Global packages status
```

---

## 🖥️ DESKTOP SHORTCUT

**Location:** `C:\Users\Usuario\Desktop\Gama Update`

**Content:** Windows batch script

```batch
@echo off
REM Gama Update Launcher
cd C:\Users\Usuario\Desktop\O_GRANDE_PROJETO
npx gama-aiox update --backup
pause
```

Or better: PowerShell script that:
1. Checks for updates
2. Shows what changed
3. Asks for confirmation
4. Runs update
5. Shows results
6. Optional: Open report in editor

---

## 📋 IMPLEMENTATION STEPS

### Phase 1: CLI Expansion (v2.0.0)
```
1. [ ] Expand init.js
   - Add --full, --minimal flags
   - Copy all custom directories
   - Create .env.example
   - Test with real scenarios

2. [ ] Create setup.js
   - npm install -g packages
   - Create symlinks
   - Validate installation

3. [ ] Create audit.js
   - 8-point validation checklist
   - Output colored report
   - Exit codes for CI/CD

4. [ ] Create update.js
   - Sync logic from O_GRANDE_PROJETO
   - Conflict resolution
   - Backup strategy

5. [ ] Create doctor.js
   - System diagnostics
   - Helpful error messages
   - Fix suggestions

6. [ ] Update bin/cli.js
   - Register 4 new commands
   - Update help text
   - Add version bump to 2.0.0
```

### Phase 2: Documentation (v2.0.0)
```
1. [ ] Write CLI-SCAFFOLD-SYSTEM.md (THIS FOLDER)
2. [ ] Write DEPENDENCIES.md
3. [ ] Write ARCHITECTURE.md
4. [ ] Write TROUBLESHOOTING.md
5. [ ] Write MAINTENANCE.md
6. [ ] Update README.md in gama-aiox
7. [ ] Create quick-start video/GIF (optional)
```

### Phase 3: Desktop Integration (v2.0.1)
```
1. [ ] Create PowerShell updater script
2. [ ] Create Windows shortcut
3. [ ] Add scheduled task (optional)
4. [ ] Test on clean Windows machine
```

### Phase 4: Testing & Release (v2.0.0)
```
1. [ ] Manual test: init --full on clean machine
2. [ ] Manual test: setup on fresh environment
3. [ ] Manual test: audit on existing project
4. [ ] Manual test: update with changes
5. [ ] Manual test: doctor on broken setup
6. [ ] Publish to npm
7. [ ] Create GitHub release notes
```

---

## 🔄 MAINTENANCE STRATEGY

### Weekly
```
• Check for npm package updates
• Validate Design System and Monitor versions
```

### Monthly
```
• Run audit on all developer machines
• Sync agents/ and tasks/ from O_GRANDE_PROJETO
• Review new workflows
```

### Quarterly
```
• Major version updates (requires testing)
• Architecture review
• Documentation audit
• Dependency tree cleanup
```

### As Needed
```
• Emergency hotfixes for security issues
• Critical bug patches
• New GAMA product integration
```

---

## 📊 SUCCESS METRICS

**Installation Success Rate:** Target 99%
```
✅ init completes without errors
✅ setup finds all packages
✅ audit passes all checks
✅ Developer can run "gama-monitor" immediately
```

**Developer Satisfaction:** Target 4.5/5
```
✅ Setup takes <5 minutes
✅ Clear error messages
✅ Good documentation
✅ Works cross-platform
```

**Maintenance Burden:** Minimal
```
✅ Auto-update checks
✅ Clear issue reports
✅ One-command sync
```

---

## 🚀 NEXT STEPS

1. **TODAY:** Create detailed implementation specs
2. **THIS WEEK:** Implement Phase 1 (CLI expansion)
3. **NEXT WEEK:** Implement Phase 2 (documentation)
4. **FOLLOWING WEEK:** Phase 3 & 4 (desktop + release)

---

**Status:** READY FOR IMPLEMENTATION  
**Owner:** @dev + @devops  
**Timeline:** 2-3 weeks  
**Priority:** HIGH (Enterprise readiness)  

