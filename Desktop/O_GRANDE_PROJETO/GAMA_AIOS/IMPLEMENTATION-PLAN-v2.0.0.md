# Gama AIOS Kit v2.0.0 — Implementation Plan

**Status:** READY TO START  
**Timeline:** 2-3 weeks  
**Owner:** @dev + @devops  
**Release Date Target:** April 14, 2026  

---

## 🎯 Deliverables

### v2.0.0 (Enterprise Edition)
```
✅ 5 new CLI commands
✅ Full documentation (4 new files)
✅ Enterprise-grade setup
✅ npm publish ready
```

---

## 📋 PHASE 1: CLI EXPANSION (8 days)

### Week 1: Core Commands (Mon-Fri)

#### Day 1: Setup init.js expansion
```
File: src/commands/init.js
Task:
  [ ] Add --full flag handling
  [ ] Add --minimal flag handling  
  [ ] Create templates/full/ directory structure
  [ ] Copy logic for 16 custom directories
  [ ] Create .env.example template
  [ ] Document parameter options
  [ ] Add validation for flags
  [ ] Test with real scenarios

Checklist:
  [ ] init my-project --full works
  [ ] init my-project --minimal works
  [ ] init my-project (default = --full)
  [ ] All directories copied correctly
  [ ] .env.example created
  [ ] git init still works
  [ ] npm install still works

Estimated Time: 6 hours
```

#### Day 2-3: Create setup.js
```
File: src/commands/setup.js
Task:
  [ ] Check Node.js version
  [ ] Check npm version
  [ ] Validate git installed
  [ ] Install npm -g packages:
        - npm install -g aios (when published)
        - npm install -g aiox (when published)
        - Check already have gama-aiox
  [ ] Create global symlinks:
        - npm link gama-ds-platform
        - npm link gama-monitor
  [ ] Add to PATH (Windows detection)
  [ ] Create symlink directories
  [ ] Guide user through .env setup
  [ ] Validate installation
  [ ] Success report

Checklist:
  [ ] All packages install without errors
  [ ] Symlinks resolve globally
  [ ] PATH updated correctly
  [ ] Windows compatibility tested
  [ ] Mac compatibility tested
  [ ] Error messages are helpful
  [ ] Rollback option available

Estimated Time: 8 hours
```

#### Day 4: Create audit.js
```
File: src/commands/audit.js
Task:
  [ ] Implement 8-point validation:
      1. All required files present
      2. No .env in git history
      3. npm packages installed
      4. Design System accessible
      5. Monitor running (optional check)
      6. Workflows valid JSON
      7. Agents registered
      8. Git hooks configured
  [ ] Color-coded output:
      ✅ GREEN (passed)
      ⚠️  YELLOW (warning)
      ❌ RED (error)
  [ ] Generate detailed report
  [ ] Exit codes: 0 (pass), 1 (fail)
  [ ] Implement --verbose flag
  [ ] Create report.json output option

Checklist:
  [ ] All 8 checks working
  [ ] Colors render correctly
  [ ] Exit codes correct
  [ ] Report file generates
  [ ] Works on Windows/Mac/Linux
  [ ] Helpful error messages

Estimated Time: 6 hours
```

#### Day 5: Create update.js
```
File: src/commands/update.js
Task:
  [ ] Implement sync logic:
      - Connect to O_GRANDE_PROJETO source
      - Compare file checksums (md5)
      - Download only changed files
      - Preserve .env files
      - Handle conflicts (manual)
  [ ] Create backup:
      - tar -czf backup-$(date).tar.gz .
      - Save in .backups/
      - List previous backups
  [ ] Update npm packages:
      - npm update aios
      - npm update aiox
      - npm audit fix (optional)
  [ ] Merge changes:
      - agents/ (merge)
      - tasks/ (merge)
      - workflows/ (merge)
      - .github/ (replace)
  [ ] Validation post-update
  [ ] Rollback capability

Flags:
  --dry-run       (show what would change)
  --force         (force all updates)
  --backup        (create backup, default true)
  --no-backup     (skip backup, use with caution)

Checklist:
  [ ] Dry-run shows changes correctly
  [ ] Backup creates successfully
  [ ] Files update correctly
  [ ] Merge strategy works
  [ ] Rollback restores state
  [ ] Works with relative + absolute paths
  [ ] Handles network issues gracefully

Estimated Time: 10 hours
```

### Week 2: Bonus Commands + Testing (Mon-Wed)

#### Day 6-7: Create doctor.js
```
File: src/commands/doctor.js
Task:
  [ ] System diagnostics:
      - Node.js version
      - npm version
      - git version
      - npm auth token status
      - Global packages:
          - aios installed?
          - aiox installed?
          - gama-aiox installed?
      - Symlinks resolved?
      - Disk space available
      - Memory sufficient
  [ ] .env status:
      - .env.example exists
      - .env exists (hidden, don't show content)
      - Required vars set
  [ ] Project status:
      - package.json valid
      - node_modules present
      - git repo initialized
      - origin set
  [ ] Suggestions:
      - "Run: npm install -g aios"
      - "Run: npm link gama-ds-platform"
      - "Free up disk: npm cache clean"
  [ ] Color-coded health:
      🟢 Healthy (no issues)
      🟡 Warning (some optional fixes)
      🔴 Critical (must fix)

Checklist:
  [ ] All diagnostics working
  [ ] Suggestions are helpful
  [ ] No security issues (don't expose secrets)
  [ ] Output is actionable
  [ ] Works offline where possible

Estimated Time: 5 hours
```

#### Day 8: Testing + Bug Fixes
```
Test Scenarios:
  [ ] Fresh Windows machine:
      - Install Node
      - npm install -g gama-aiox
      - gama-aiox init test-project --full
      - gama-aiox setup
      - gama-aiox audit
      - gama-aiox doctor
      - Verify all works end-to-end

  [ ] Mac/Linux test (if possible)
      - Same flow
      - Check symlinks
      - Verify PATH

  [ ] Error handling:
      - Missing Node
      - Missing git
      - Network timeout during update
      - Insufficient disk space
      - Conflict during merge

  [ ] Edge cases:
      - Project already exists
      - .env already present
      - Corrupted backup
      - Partial symlink

Estimated Time: 4 hours
```

---

## 📚 PHASE 2: DOCUMENTATION (4 days)

### Files to Create/Update

#### 1. CLI-SCAFFOLD-SYSTEM.md ✅ (DONE)
```
Status: Completed in audit phase
Location: GAMA_AIOS/CLI-SCAFFOLD-ENTERPRISE-AUDIT.md
Content: System overview + expansion details
Action: Already created, move forward
```

#### 2. DEPENDENCIES.md ✅ (DONE)
```
Status: Completed
Location: GAMA_AIOS/DEPENDENCIES.md
Content: Package matrix, versions, requirements
Action: Already created, move forward
```

#### 3. ARCHITECTURE.md ✅ (DONE)
```
Status: Completed
Location: GAMA_AIOS/ARCHITECTURE.md
Content: System design, data flows, integration
Action: Already created, move forward
```

#### 4. TROUBLESHOOTING.md (NEW)
```
File: GAMA_AIOS/TROUBLESHOOTING.md
Content:
  • Common init errors → solutions
  • setup.js issues → debugging
  • update failures → recovery
  • Windows-specific problems
  • Mac/Linux issues
  • Network problems
  • Disk space issues
  • Permission errors
  • Git conflicts
  
Estimated Time: 4 hours
```

#### 5. UPDATE gama-aiox README.md
```
File: gama-aiox/README.md
Update:
  [ ] Add new commands to help
  [ ] Update feature list
  [ ] Add installation steps
  [ ] Add quick-start guide
  [ ] Link to full docs
  [ ] Add examples for each command
  [ ] Contribute section

Estimated Time: 2 hours
```

#### 6. CREATE QUICK-START.md
```
File: GAMA_AIOS/QUICK-START.md
Content:
  1. Prerequisites (Node, npm, git)
  2. Setup in 5 steps
  3. Verify installation
  4. Run first project
  5. Common commands

Estimated Time: 1 hour
```

---

## 🔄 PHASE 3: DESKTOP INTEGRATION (2 days)

### Update Desktop Shortcut

#### Create PowerShell Update Script
```
File: C:\Users\Usuario\Desktop\Gama Update
Type: PowerShell .ps1 script

Script:
  1. Check for updates available
  2. Show summary of changes
  3. Ask user confirmation
  4. Create backup
  5. Run update
  6. Show results
  7. Ask to open report

Estimated Time: 2 hours
```

#### Create Batch Wrapper
```
File: C:\Users\Usuario\Desktop\Gama Update.bat
Purpose: Launch PowerShell script

Content:
  @echo off
  powershell -ExecutionPolicy Bypass ^
    -File "C:\path\to\gama-update.ps1"
  pause

Estimated Time: 30 min
```

#### Test on Clean Machine
```
Test scenarios:
  [ ] Fresh Windows 10
  [ ] Fresh Windows 11
  [ ] With admin privileges
  [ ] Without admin privileges
  [ ] Network available
  [ ] Network unavailable
  
Estimated Time: 2 hours
```

---

## ✅ PHASE 4: TESTING & RELEASE (3 days)

### Comprehensive Testing

#### Integration Tests
```
Test Suite:
  [ ] init → setup → audit chain
  [ ] init --full copies all dirs
  [ ] init --minimal creates only base
  [ ] setup installs all packages
  [ ] update syncs correctly
  [ ] audit detects issues
  [ ] doctor gives helpful output
  
Run: npm test (when test suite created)
Estimated Time: 3 hours
```

#### Manual Validation
```
Scenarios:
  [ ] Existing developer:
      - gama-aiox update --dry-run
      - gama-aiox update --backup
      - gama-aiox audit (should pass)
  
  [ ] New developer:
      - gama-aiox init my-project --full
      - gama-aiox setup
      - gama-aiox audit (should pass)
      - gama-aiox doctor (should pass)
  
  [ ] Troubleshoot:
      - Simulate missing Node
      - Simulate network timeout
      - Simulate disk full
      - Check error messages
  
Estimated Time: 4 hours
```

#### Release Preparation
```
Steps:
  [ ] Update version in package.json → 2.0.0
  [ ] Update CHANGELOG.md
  [ ] Tag git commit: v2.0.0
  [ ] Create GitHub release notes
  [ ] Test npm publish with beta version
  [ ] Verify npm package contents
  [ ] npm publish (final)
  
Estimated Time: 1 hour
```

---

## 📦 Version Control

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/cli-v2.0.0

# During development: commit regularly
git add src/commands/init.js
git commit -m "feat: expand init with --full flag"

# When phase 1 complete
git add bin/cli.js src/commands/
git commit -m "feat: add setup, audit, update, doctor commands"

# When phase 2 complete
git add GAMA_AIOS/
git commit -m "docs: add complete v2.0.0 documentation"

# Final: merge + tag
git checkout main
git merge feature/cli-v2.0.0
git tag -a v2.0.0 -m "Release v2.0.0: Enterprise CLI"
git push origin main v2.0.0
npm publish
```

---

## 📊 Progress Tracking

### Checklist by Phase

#### Phase 1: CLI Expansion (40 hours)
- [ ] init.js expanded (6h)
- [ ] setup.js created (8h)
- [ ] audit.js created (6h)
- [ ] update.js created (10h)
- [ ] doctor.js created (5h)
- [ ] Testing + fixes (4h)
- [ ] Total: ~40 hours

#### Phase 2: Documentation (7 hours)
- [ ] TROUBLESHOOTING.md (4h)
- [ ] Update README.md (2h)
- [ ] QUICK-START.md (1h)
- [ ] Total: ~7 hours

#### Phase 3: Desktop (4 hours)
- [ ] PowerShell script (2h)
- [ ] Batch wrapper (0.5h)
- [ ] Testing (1.5h)
- [ ] Total: ~4 hours

#### Phase 4: Release (5 hours)
- [ ] Integration tests (3h)
- [ ] Manual validation (4h)
- [ ] Release prep (1h)
- [ ] Total: ~8 hours

**TOTAL: ~60 hours = ~2 weeks (1 dev) or ~1 week (2 devs)**

---

## 🎯 Success Criteria

### Code Quality
```
✅ All functions have JSDoc comments
✅ Error handling in every function
✅ No console.logs (use chalk for output)
✅ Consistent code style (prettier)
✅ No hardcoded paths (use path module)
```

### Functionality
```
✅ All 5 commands work without errors
✅ Help text complete for all commands
✅ Error messages are helpful
✅ Works on Windows/Mac/Linux
✅ Handles edge cases gracefully
```

### Documentation
```
✅ Each command documented in README
✅ TROUBLESHOOTING covers 90% of issues
✅ QUICK-START follows 5-step formula
✅ ARCHITECTURE diagrams clear
✅ DEPENDENCIES matrix complete
```

### Testing
```
✅ Fresh machine test passes
✅ Update test passes
✅ Error handling tested
✅ Desktop shortcut works
✅ npm publish succeeds
```

---

## 🚀 Go/No-Go Decision Points

### After Phase 1: Code Complete
```
CHECKLIST:
  [ ] All 5 commands coded + tested
  [ ] No critical bugs
  [ ] Windows/Mac verified
  
DECISION:
  ✅ GO → Continue to Phase 2
  ❌ NO-GO → Fix issues, retry
```

### After Phase 2: Documentation Complete
```
CHECKLIST:
  [ ] All docs written + reviewed
  [ ] Links working
  [ ] Examples tested
  
DECISION:
  ✅ GO → Continue to Phase 3
  ❌ NO-GO → Revise docs
```

### After Phase 3: Integration Complete
```
CHECKLIST:
  [ ] Desktop shortcut works
  [ ] PowerShell tested
  [ ] Cross-platform verified
  
DECISION:
  ✅ GO → Continue to Phase 4
  ❌ NO-GO → Fix integration issues
```

### After Phase 4: Ready for Release
```
CHECKLIST:
  [ ] All tests passing
  [ ] npm publish succeeds
  [ ] GitHub release created
  [ ] Team notified
  
DECISION:
  ✅ RELEASE → Publish v2.0.0
  ❌ HOLD → Fix blocking issues
```

---

## 📞 Team Assignments

### Code Implementation
```
@dev (Dex):
  • init.js expansion
  • setup.js
  • audit.js
  • update.js
  • doctor.js
  • Testing
```

### DevOps
```
@devops (Gage):
  • Version management
  • npm publish process
  • GitHub releases
  • CI/CD integration (if applicable)
```

### Documentation
```
@writer (or @dev):
  • TROUBLESHOOTING.md
  • QUICK-START.md
  • README.md updates
  • Code comments
```

### QA/Verification
```
@qa (Quinn) - Optional:
  • Test plan review
  • Cross-platform testing
  • Edge case validation
```

---

## 🗓️ Timeline

### Week 1: Implementation
- Mon-Fri: Phase 1 (CLI expansion)
  - Estimated: 40 hours
  - If 2 devs: 20 hours = <1 week

### Week 2: Documentation + Integration
- Mon-Tue: Phase 2 (Documentation) = 7 hours
- Wed-Thu: Phase 3 (Desktop) = 4 hours
- Fri: Phase 4 start (Testing) = 2 hours

### Week 3: Release
- Mon-Tue: Phase 4 complete (Testing) = 6 hours
- Wed: Release prep + publish
- Thu: Monitor for issues
- Fri: Retrospective + documentation

**TARGET RELEASE: April 14, 2026** ✅

---

## 📝 Notes

### Dependencies Before Starting

**aios and aiox must be publishable to npm first**
```
Status: Pending
Impact: setup.js will fail if these aren't on npm

Options:
  1. Wait for aios/aiox npm publish
  2. Use local paths: npm install ../aios
  3. Create placeholder packages
  
DECISION: Implement with npm fallback, test with local paths first
```

### Testing with Local Packages

```bash
# During development, use local paths:
npm install --save ../aiox-squads-main
npm install --save ../aios-core

# This allows testing setup.js without published packages
# Switch to npm publish URLs after packages ready
```

### Desktop Shortcut Maintenance

```
Update PowerShell script when:
  • New commands added
  • Update logic changes
  • New documentation available
  
Schedule: Check quarterly, update as needed
```

---

## ✨ Future Considerations (v2.1+)

```
- [ ] Web UI for gama-aiox commands (Optional)
- [ ] Auto-update mechanism (Background service)
- [ ] Docker support (gama-aiox init --docker)
- [ ] GitHub Actions integration
- [ ] Figma design system sync
- [ ] AI-powered setup wizard
- [ ] Community templates
- [ ] Multi-language support
```

---

**Status:** READY FOR IMPLEMENTATION  
**Start Date:** Monday, April 1, 2026  
**Target Release:** April 14, 2026 (2 weeks)  
**Owner:** @dev + @devops  

