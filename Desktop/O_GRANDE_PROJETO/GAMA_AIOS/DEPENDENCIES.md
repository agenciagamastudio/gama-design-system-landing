# Gama AIOS Kit — Dependencies & Packages

**Version:** 2.0.0 (Planning)  
**Last Updated:** 2026-03-31  
**Maintained By:** Gama Studio  

---

## 📦 Core Packages

### 1. `aios` — AIOS Core Framework
```yaml
Package: aios
Status: npm publish pending
Purpose: Core AIOS orchestration engine
Source: C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\aiox-squads-main (likely)
Install: npm install -g aios
Provides:
  • Agent system
  • Task orchestration
  • Workflow engine
  • Story management
  • Quality gates
  • Deployment pipeline
```

### 2. `aiox` — AIOX Squads Extension
```yaml
Package: aiox
Status: npm publish pending
Purpose: Multi-agent squad system
Source: C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\aiox-squads-main
Install: npm install -g aiox
Provides:
  • Squad creation
  • Chief agent orchestration
  • Multi-team workflows
  • Collaborative execution
  • Performance monitoring
```

### 3. `gama-aiox` — CLI Scaffolding Tool
```yaml
Package: gama-aiox
Version: 1.0.7 (current) → 2.0.0 (planned)
Status: ✅ Published on npm
Install: npx gama-aiox init <project-name>
Provides:
  • Project scaffold
  • Template copying
  • Package installation
  • Git initialization
  • (v2.0+) Full GAMA setup
  • (v2.0+) Audit & update
```

### 4. `gama-ds-platform` — Design System
```yaml
Package: gama-ds-platform
Status: Local (no npm yet)
Source: C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_DESIGN_SYSTEM\gama-ds-platform
Type: Next.js 14 + Component Library
Stack:
  • React 18
  • Tailwind CSS 3
  • Poppins + JetBrains Mono fonts
  • Material Symbols icons
  • 13 pages (docs + components)
Install: npm link (global symlink)
Provides:
  • Design tokens (colors, spacing, typography)
  • Component library (buttons, cards, inputs, etc)
  • Design guidelines
  • Figma-to-code integration (planned)
  • A11y standards
```

### 5. `gama-monitor` — System Monitor
```yaml
Package: gama-monitor
Status: Local (no npm yet)
Source: C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_MONITOR\gama-monitor
Type: Monitoring dashboard
Stack: React 18 + TypeScript
Install: npm link (global symlink)
Provides:
  • Real-time system metrics
  • Agent performance tracking
  • Task execution monitoring
  • Error alerting
  • Log aggregation (planned)
  • Health checks
```

---

## 🔗 Local Development Dependencies

These are **copied during init**, not installed:

### Configuration Directories
```
.agent/                → Agent configuration templates
.aios/                 → AIOS framework settings
.aios-core/            → Core AIOS engine
.codex/                → Codex AI integration
.cursor/               → Cursor IDE settings
.gemini/               → Google Gemini configs
.github/               → GitHub Actions workflows
.vscode/               → VS Code workspace settings
```

### Custom Definitions
```
agents/                → Custom agent definitions
tasks/                 → Task library
workflows/             → Workflow definitions
templates/             → Project templates (Gama standard)
tools/                 → Custom utility tools
```

### Documentation
```
docs/                  → Project documentation (user-specific)
GAMA_AIOS/             → Central documentation (shared)
```

---

## 📋 NPM Installation Order

When `gama-aiox setup` runs:

```bash
# Step 1: Global packages
npm install -g aios            # Core engine
npm install -g aiox            # Squads extension
npm install -g gama-aiox       # Our CLI (already done)

# Step 2: Global symlinks (npm link)
cd C:\...\GAMA_DESIGN_SYSTEM\gama-ds-platform
npm link                        # Makes "gama-ds-platform" global
cd C:\...\GAMA_MONITOR\gama-monitor
npm link                        # Makes "gama-monitor" global

# Step 3: Project dependencies (user runs npm install)
npm install                     # In their new project
```

---

## 🔄 Version Management Strategy

### aios & aiox
```
Current: Not yet on npm
Plan: 
  • v1.0.0 → Initial release
  • v1.1.0 → Squad improvements
  • v2.0.0 → Full integration

Compatibility:
  • Must work with gama-aiox v2.0.0+
  • Peer dependency: gama-aiox@^2.0.0
```

### gama-aiox (CLI)
```
Current: v1.0.7
Timeline:
  • v1.0.7 → Basic init (current)
  • v1.1.0 → Minor bug fixes (if needed)
  • v2.0.0 → Full enterprise features (next release)
    ├─ setup command
    ├─ audit command
    ├─ update command
    ├─ doctor command
    └─ Enhanced init --full

Semver:
  • MAJOR: Breaking changes (CLI args, output format)
  • MINOR: New commands, new features
  • PATCH: Bug fixes, docs
```

### gama-ds-platform
```
Current: Local only (v1.0.0 expected)
Plan:
  • Publish to npm when stable
  • Semantic versioning

Dev dependency in projects:
  "gama-ds-platform": "^1.0.0"

Or global link for shared teams:
  npm link gama-ds-platform
```

### gama-monitor
```
Current: Local only (v1.0.0 expected)
Plan:
  • Publish to npm
  • Global link as default

Install:
  npm link gama-monitor  # Global
  OR
  npm install gama-monitor  # Local
```

---

## 🖥️ System Requirements

### Node.js
```
Version: 18.0.0+  (or 20.0.0+ recommended)
LTS: v20.10.0 (stable)
Status: aios/aiox/gama-* tested on v18, v20

Check: node --version
Update: https://nodejs.org/
```

### npm
```
Version: 9.0.0+
(comes with Node 18+)

Check: npm --version
Update: npm install -g npm@latest
```

### Git
```
Version: 2.30.0+
Required for: git init, git commit, git push
Status: Windows, Mac, Linux all supported

Check: git --version
Install: https://git-scm.com/
```

### OS Support
```
✅ Windows 10/11 (recommended: Windows 11 22H2+)
✅ macOS 11+ (Intel & Apple Silicon)
✅ Linux (Ubuntu 20.04+, others)

Status: Tested on Windows 10/11 Pro
```

### Disk Space
```
Minimum: 2GB free
Recommended: 5GB free
  • Node modules: ~1-2GB
  • Projects: ~1-2GB
  • Cache/temp: ~500MB
```

### Memory
```
Minimum: 4GB RAM
Recommended: 8GB+ RAM
  • aios orchestration: 200-400MB
  • Design System dev: 300-500MB
  • Monitor dashboard: 100-200MB
  • IDE + tools: 1-2GB
```

---

## 🔐 Environment Variables

### Template: `.env.example`
```bash
# Framework
AIOS_API_KEY=
AIOX_SQUAD_TOKEN=

# Design System
GAMA_DS_THEME=light        # or dark
GAMA_DS_BRAND=gama-studio  # or custom

# Monitor
GAMA_MONITOR_PORT=3000
GAMA_MONITOR_HOST=localhost

# Development
NODE_ENV=development       # or production
DEBUG=gama:*
LOG_LEVEL=info            # or debug, warn, error

# Optional: IDE Integration
CURSOR_API_KEY=
GEMINI_API_KEY=
CODEX_API_KEY=
```

### What NOT to commit
```
❌ .env                  (use .env.example as template)
❌ .env.local            (personal overrides)
❌ *.env.*.local         (environment-specific secrets)
❌ node_modules/         (npm handles this)
❌ .npmrc                (contains auth tokens)
```

---

## 📦 Transitive Dependencies

When you install aios/aiox/gama-*, you also get:

### Common Dependencies (Expected)
```
• commander            (CLI argument parsing)
• chalk               (Terminal colors)
• fs-extra            (File operations)
• express             (HTTP server, if included)
• react               (UI, if included)
• typescript          (Type safety, if included)
• prettier            (Code formatting, if included)
• eslint              (Linting, if included)
```

### Dev Dependencies
```
• @types/*            (TypeScript definitions)
• jest                (Testing)
• webpack             (Bundling, if included)
• babel               (Transpiling, if included)
```

---

## 🚀 Installation Checklist

When setting up a NEW developer machine:

```bash
# 1. Prerequisites
[ ] Node 18+ installed
[ ] npm 9+ installed
[ ] Git installed

# 2. Global packages
[ ] npm install -g aios
[ ] npm install -g aiox
[ ] npm install -g gama-aiox

# 3. Global symlinks
[ ] npm link gama-ds-platform (from source)
[ ] npm link gama-monitor (from source)

# 4. New project
[ ] npx gama-aiox init my-project --full
[ ] cd my-project
[ ] npm install

# 5. Validation
[ ] gama-aiox audit
[ ] gama-monitor --check    (or visit http://localhost:3000)
[ ] npm run dev              (if project has dev script)

# 6. IDE Setup
[ ] Copy .vscode/ settings
[ ] Copy .cursor/ settings (if using Cursor)
[ ] Import design tokens

# 7. First Run
[ ] Create .env from .env.example
[ ] Test agent execution: aios --help
[ ] Test squad system: aiox --help
```

---

## 🔄 Keeping Dependencies Updated

### Weekly
```bash
npm outdated                  # Check for updates
npm audit                     # Security check
gama-aiox audit              # Project audit
```

### Monthly
```bash
npm update                    # Minor version updates
npm run test                  # Validate after update
gama-aiox audit              # Verify nothing broke
```

### As Needed
```bash
npm install package@latest   # Major version bump
npm audit fix               # Security patches
gama-aiox update --force    # Force sync from source
```

---

## 🐛 Troubleshooting

### "npm install -g gama-aiox" fails
```
Solution 1: Check npm permission
  npm config get prefix     # Should be /usr/local or %APPDATA%/npm
  
Solution 2: Use sudo (Linux/Mac only)
  sudo npm install -g gama-aiox
  
Solution 3: Fix npm permissions
  https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
```

### "npm link" doesn't work
```
Symptoms:
  - Can't find gama-ds-platform globally
  - "Cannot find module 'gama-ds-platform'"

Solution:
  1. Verify source exists: ls C:\path\to\gama-ds-platform
  2. Check package.json name: cat C:\path\package.json | grep "name"
  3. Re-link: npm link C:\full\path\to\gama-ds-platform
  4. Verify: npm link --global --list
```

### "gama-aiox" command not found
```
Check if global:
  npm list -g gama-aiox
  
Reinstall:
  npm install -g gama-aiox
  
Or use npx:
  npx gama-aiox --version
```

### aios/aiox not found after install
```
Wait for npm to finish:
  npm install -g aios
  # (wait 30-60 seconds)
  aios --version
  
Or check PATH:
  echo $PATH  (Mac/Linux)
  echo %PATH% (Windows)
  
Should include:
  /usr/local/bin (Mac)
  /usr/bin (Linux)
  %APPDATA%\npm (Windows)
```

---

## 📞 Support

**Docs:** https://github.com/agenciagamastudio/gama-aios-kit  
**Issues:** GitHub Issues on gama-aios-kit  
**Team:** @devops for infrastructure, @dev for packages  

