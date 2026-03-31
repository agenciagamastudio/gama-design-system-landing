# Gama AIOS Kit — System Architecture

**Version:** 2.0.0 (Planning)  
**Last Updated:** 2026-03-31  
**Scope:** Enterprise scaffolding + orchestration  

---

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      GAMA ECOSYSTEM                             │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              CLI SCAFFOLDING LAYER                     │   │
│  │  gama-aiox (v2.0.0)                                    │   │
│  │  ├─ init       → Project scaffold                      │   │
│  │  ├─ setup      → Global config                         │   │
│  │  ├─ audit      → Validation                            │   │
│  │  ├─ update     → Sync from O_GRANDE_PROJETO            │   │
│  │  └─ doctor     → Diagnostics                           │   │
│  └────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │           ORCHESTRATION LAYER                          │   │
│  │  aios (core)    aiox (squads)                           │   │
│  │  ├─ Agents      ├─ Chiefs                              │   │
│  │  ├─ Tasks       ├─ Teams                               │   │
│  │  ├─ Workflows   ├─ Collaboration                       │   │
│  │  └─ QA Gates    └─ Performance                         │   │
│  └────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            PRODUCT LAYER                               │   │
│  │                                                        │   │
│  │  Design System   Monitor   Custom Projects             │   │
│  │  (gama-ds)      (gama-monitor)  (user repos)           │   │
│  │  ├─ Components  ├─ Metrics      ├─ App 1              │   │
│  │  ├─ Tokens      ├─ Alerts       ├─ App 2              │   │
│  │  └─ Docs        └─ Dashboard    └─ ...                │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            CONFIGURATION LAYER                         │   │
│  │  .agent .aios .aios-core .vscode .github              │   │
│  │  agents/ tasks/ workflows/ templates/ tools/           │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Relationships

### gama-aiox (CLI)
```
┌─────────────────────────────────────────┐
│      gama-aiox v2.0.0                   │
│  (npm publish ready)                    │
├─────────────────────────────────────────┤
│ bin/cli.js                              │
│  └─ Uses Commander.js                  │
│                                         │
│ src/commands/                           │
│  ├─ init.js (expand with --full)        │
│  ├─ setup.js (NEW - install packages)   │
│  ├─ audit.js (NEW - validate)           │
│  ├─ update.js (NEW - sync)              │
│  └─ doctor.js (NEW - diagnose)          │
│                                         │
│ templates/default/                      │
│  ├─ package.json (template)             │
│  ├─ README.md                           │
│  └─ .gitignore                          │
│                                         │
│ templates/full/ (NEW - for --full)      │
│  ├─ .agent/                             │
│  ├─ .aios/                              │
│  ├─ .github/                            │
│  ├─ agents/                             │
│  ├─ tasks/                              │
│  ├─ workflows/                          │
│  └─ .env.example                        │
└─────────────────────────────────────────┘
```

### aios (Core)
```
┌────────────────────────────────┐
│      aios (npm package)         │
│  Core orchestration engine      │
├────────────────────────────────┤
│                                │
│ • Agent system                 │
│ • Task execution               │
│ • Workflow engine              │
│ • Story lifecycle              │
│ • Quality gates                │
│ • Deployment pipeline          │
│                                │
│ Exports:                       │
│  - @aios/agents                │
│  - @aios/tasks                 │
│  - @aios/workflows             │
│  - @aios/quality               │
│  - @aios/deploy                │
│                                │
└────────────────────────────────┘
```

### aiox (Squads)
```
┌────────────────────────────────┐
│      aiox (npm package)         │
│  Multi-agent squad system       │
├────────────────────────────────┤
│                                │
│ Depends on: aios               │
│                                │
│ • Chief agents                 │
│ • Team orchestration           │
│ • Collaborative workflows      │
│ • Performance monitoring       │
│ • Squad management             │
│                                │
│ Exports:                       │
│  - @aiox/chiefs                │
│  - @aiox/squads                │
│  - @aiox/collab                │
│  - @aiox/monitor               │
│                                │
└────────────────────────────────┘
```

### gama-ds-platform (Design System)
```
┌────────────────────────────────┐
│   gama-ds-platform (LOCAL)      │
│   React 18 component library    │
├────────────────────────────────┤
│                                │
│ Tech Stack:                    │
│  • Next.js 14                  │
│  • React 18                    │
│  • Tailwind CSS 3              │
│  • TypeScript                  │
│  • Storybook (optional)        │
│                                │
│ Provides:                      │
│  • Design tokens               │
│  • Component library           │
│  • Design guidelines           │
│  • CSS modules                 │
│  • Icon system                 │
│                                │
│ Global access:                 │
│  npm link gama-ds-platform     │
│                                │
│ Or as dev dependency:          │
│  "gama-ds-platform": "^1.0.0"  │
│                                │
└────────────────────────────────┘
```

### gama-monitor (Monitoring)
```
┌────────────────────────────────┐
│   gama-monitor (LOCAL)          │
│   System monitoring dashboard   │
├────────────────────────────────┤
│                                │
│ Tech Stack:                    │
│  • React 18                    │
│  • TypeScript                  │
│  • Socket.io (real-time)       │
│  • Node.js backend             │
│                                │
│ Features:                      │
│  • Real-time metrics           │
│  • Agent performance           │
│  • Task execution tracking     │
│  • Error alerting              │
│  • Log aggregation             │
│  • Health dashboard            │
│                                │
│ Access:                        │
│  http://localhost:3000         │
│  npm link gama-monitor         │
│                                │
└────────────────────────────────┘
```

---

## 🔄 Data Flow

### Init Flow
```
User Command
    ↓
gama-aiox init my-project --full
    ↓
init.js
├─ Create target directory
├─ Copy templates/default/
│  └─ Personalize package.json
├─ Copy templates/full/ (if --full)
│  ├─ .agent/, .aios/, .aios-core/
│  ├─ agents/, tasks/, workflows/
│  ├─ .github/, .vscode/, .codex/
│  └─ .env.example
├─ Create git repo
│  ├─ git init
│  ├─ git add .
│  └─ git commit -m "initial"
├─ Install dependencies
│  └─ npm install
└─ Output success message
    ↓
Developer ready to code
```

### Setup Flow
```
gama-aiox setup
    ↓
setup.js
├─ Check prerequisites
│  ├─ Node version
│  ├─ npm version
│  └─ git installed
├─ Install global packages
│  ├─ npm install -g aios
│  ├─ npm install -g aiox
│  └─ (gama-aiox already installed)
├─ Create global symlinks
│  ├─ npm link gama-ds-platform
│  └─ npm link gama-monitor
├─ Configure system
│  ├─ Add to PATH
│  ├─ Setup .env
│  └─ Create directories
└─ Run audit
    ↓
System ready
```

### Audit Flow
```
gama-aiox audit [project]
    ↓
audit.js (8-point validation)
├─ Check 1: Files exist
├─ Check 2: No .env in git
├─ Check 3: Dependencies installed
├─ Check 4: npm packages accessible
├─ Check 5: Design System available
├─ Check 6: Monitor running (optional)
├─ Check 7: Workflows valid
└─ Check 8: Git hooks configured
    ↓
Output report
├─ GREEN: All passed
├─ YELLOW: Warnings
└─ RED: Errors
    ↓
Exit code: 0 (success) or 1 (failure)
```

### Update Flow
```
gama-aiox update --backup
    ↓
update.js
├─ Backup current project
│  └─ tar -czf backup-$(date).tar.gz .
├─ Sync from O_GRANDE_PROJETO
│  ├─ Compare checksums
│  ├─ Download changed files
│  ├─ Preserve .env files
│  └─ Merge conflicts (manual)
├─ Update packages
│  ├─ npm update aios
│  ├─ npm update aiox
│  └─ npm update (dev dependencies)
├─ Refresh configs
│  ├─ Pull latest .github/
│  ├─ Sync agents/
│  └─ Update tasks/
└─ Run audit
    ↓
Update complete with report
```

---

## 🔐 Security Architecture

### Secrets Management
```
❌ NEVER COMMIT:
  • .env files
  • .env.local
  • Private keys
  • API credentials
  • Database passwords

✅ USE INSTEAD:
  • .env.example (template only)
  • Environment variables
  • Secret manager (HashiCorp Vault, AWS Secrets, etc)
  • .gitignore (enforce with pre-commit hooks)

Implementation:
  • gama-aiox init creates .env.example
  • setup.js guides user to populate .env
  • audit.js checks .env not in git
```

### Access Control
```
File Permission Model:
  • 0644: .env.example (readable)
  • 0600: .env (private - user only)
  • 0755: bin/cli.js (executable)

Git Protection:
  • .env in .gitignore
  • Pre-commit hook: prevent .env commit
  • GitHub branch protection: code review required
```

### Package Integrity
```
Validation:
  • npm uses package-lock.json
  • Checksums verified during install
  • gama-aiox audit validates versions
  
Cleanup:
  • audit.js checks for outdated packages
  • doctor.js suggests updates
  • update.js refreshes dependencies
```

---

## 🌍 Multi-Platform Support

### Windows (Primary)
```
✅ Path: C:\Users\<user>\Desktop\O_GRANDE_PROJETO
✅ CMD: Works with PowerShell
✅ Git: Git Bash recommended
✅ Symlinks: Use npm link (not mklink)
✅ Tested: Windows 10 Pro, Windows 11 Pro
```

### macOS (Secondary)
```
✅ Path: /Users/<user>/Projects/O_GRANDE_PROJETO
✅ Shell: zsh, bash
✅ Git: Native git (brew install git)
✅ Symlinks: npm link (uses POSIX symlinks)
✅ Tested: macOS 12+
```

### Linux (Secondary)
```
✅ Path: ~/projects/O_GRANDE_PROJETO
✅ Shell: bash, zsh
✅ Git: apt install git
✅ Symlinks: npm link (native support)
✅ Tested: Ubuntu 20.04+
```

---

## 🔌 Extension Points

### Custom Agents
```
Location: agents/ (copied during init)
Add custom agent definitions
Register in AIOS framework
Integrated with aiox squads
```

### Custom Tasks
```
Location: tasks/ (copied during init)
Define project-specific tasks
Chain with workflows
Integrated with story system
```

### Custom Workflows
```
Location: workflows/ (copied during init)
Define multi-step processes
Integrate agents and tasks
Register with orchestration
```

### Custom Templates
```
Location: templates/ (copied during init)
Create new project templates
Share across team
Version control in GAMA_AIOS
```

### Design System Customization
```
Location: gama-ds-platform/src
Extend component library
Add custom tokens
Publish to Figma
Export to Storybook
```

---

## 📊 Integration Matrix

```
┌────────────────────┬──────────┬──────────┬──────────┐
│ Component          │ aios     │ aiox     │ Projects │
├────────────────────┼──────────┼──────────┼──────────┤
│ gama-aiox (CLI)    │ Calls    │ Calls    │ Manages  │
│ aios (core)        │ Runs     │ Depends  │ Uses     │
│ aiox (squads)      │ Extends  │ Runs     │ Uses     │
│ gama-ds-platform   │ -        │ -        │ Imports  │
│ gama-monitor       │ Monitors │ Monitors │ Monitors │
│ Custom agents      │ Executed │ Coordin. │ Defined  │
│ Custom tasks       │ Executed │ Executes │ Defined  │
│ .github/ workflows │ -        │ -        │ CI/CD    │
│ .vscode/ settings  │ -        │ -        │ IDE      │
└────────────────────┴──────────┴──────────┴──────────┘
```

---

## 🚀 Deployment Architecture

### Local Development
```
Developer Machine:
  ├─ gama-aiox (cli)           [npm -g]
  ├─ aios (core)               [npm -g]
  ├─ aiox (squads)             [npm -g]
  ├─ gama-ds-platform          [npm link]
  ├─ gama-monitor              [npm link]
  └─ Projects:
     └─ my-project/
        ├─ node_modules/
        ├─ src/
        ├─ agents/
        ├─ tasks/
        └─ package.json
```

### Team Collaboration
```
O_GRANDE_PROJETO (Central):
  ├─ gama-aiox-kit             [GitHub source]
  ├─ aios-squads-main          [GitHub source]
  ├─ GAMA_DESIGN_SYSTEM/       [Local reference]
  ├─ GAMA_MONITOR/             [Local reference]
  ├─ agents/                   [Shared]
  ├─ tasks/                    [Shared]
  ├─ workflows/                [Shared]
  └─ .github/workflows/        [CI/CD pipeline]

Developer 1 Machine:
  └─ my-project/               [git clone + npm install]

Developer 2 Machine:
  └─ another-project/          [git clone + npm install]

GitHub:
  ├─ gama-aiox-kit             [Public/Private]
  ├─ aios-squads-main          [Public/Private]
  └─ Project repos             [Private]
```

### Production Deployment
```
(When ready)
  ├─ npm publish aios
  ├─ npm publish aiox
  ├─ npm publish gama-ds-platform
  ├─ npm publish gama-monitor
  └─ gama-aiox already published (v1.0.7+)

Teams can then:
  1. npm install -g gama-aiox
  2. gama-aiox init my-project --full
  3. cd my-project && npm install
  4. npm run dev
```

---

## 📈 Scalability Considerations

### For Small Teams (1-5 devs)
```
✅ Local O_GRANDE_PROJETO works
✅ npm link for DS + Monitor
✅ Manual updates acceptable
✅ One monitor instance sufficient
```

### For Medium Teams (5-20 devs)
```
✅ gama-aiox update --backup (automated)
✅ npm publish to private registry (optional)
✅ Shared monitor instance (Docker)
✅ Weekly sync scheduled task
```

### For Large Teams (20+ devs)
```
✅ Enterprise npm registry (Artifactory, Nexus)
✅ gama-aiox auto-update mechanism
✅ Distributed monitors (load balanced)
✅ Audit automation (CI/CD integrated)
✅ Update validation in CI before rolling out
```

---

## 🔄 Lifecycle Management

```
Version 1.0.7 (Current)
    ↓
[Implement Phase 1: CLI v2.0.0 commands]
    ↓
Version 2.0.0 (Target: 2 weeks)
  - init --full
  - setup
  - audit
  - update
  - doctor
    ↓
[Implement Phase 2: Documentation]
    ↓
Version 2.0.1 (Desktop shortcut + maintenance)
    ↓
Ongoing:
  - Publish aios, aiox to npm
  - Publish gama-ds-platform to npm
  - Publish gama-monitor to npm
  - Enterprise registry (Artifactory)
  - Auto-update mechanisms
```

---

## 📞 Architecture Decisions (ADR)

### ADR-001: CLI-First Scaffolding
```
Decision: gama-aiox init is the primary entry point
Rationale: Faster onboarding, consistent setup, reduces errors
Impact: All developers use same baseline
```

### ADR-002: npm link for Global Packages
```
Decision: Use npm link for DS + Monitor (development)
Rationale: Easy updates, no registry needed yet
Impact: Works for small-medium teams
Migration: Will move to npm registry for enterprise
```

### ADR-003: Backup Before Update
```
Decision: gama-aiox update creates automatic backups
Rationale: Safety, rollback capability, confidence
Impact: Uses ~5-10% extra disk space
```

### ADR-004: .env.example Pattern
```
Decision: Template .env.example, actual .env in .gitignore
Rationale: Security, flexibility, no secrets in git
Impact: Developers must populate .env locally
```

---

**Status:** READY FOR IMPLEMENTATION  
**Next Review:** After v2.0.0 release  

