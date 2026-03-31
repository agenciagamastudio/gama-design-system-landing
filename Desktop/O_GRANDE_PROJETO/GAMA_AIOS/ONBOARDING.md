# GAMA_AIOS — Onboarding Guide

> **Updated with TOKEN-ECONOMY optimizations** (2026-02-22)

---

## 🎯 What is GAMA_AIOS?

GAMA_AIOS is **Synkra AIOS** — an AI-Orchestrated System for Full Stack Development. It's an intelligent framework that orchestrates Claude agents to manage complex development workflows.

**In plain terms:** We use AI agents (@dev, @qa, @pm, etc.) to coordinate and execute development work, managed by the AIOS framework.

---

## 🚀 Quick Start (5 minutes)

### 1. Understand the Architecture

```
GAMA_AIOS/
├── .aios-core/              ← Framework core
│   ├── development/         ← Tasks, agents, scripts
│   ├── core-config.yaml     ← Central config (being optimized)
│   └── ...
├── docs/                    ← Documentation
├── instructions.md          ← Project instructions (READ THIS FIRST)
└── ...
```

### 2. Read Essential Docs

1. **`instructions.md`** — Your project rules (5 min)
2. **`QUICK-STATUS.txt`** — Current TOKEN-ECONOMY status (3 min)
3. **`README-TOKEN-ECONOMY.md`** — Token optimization initiative (5 min)

### 3. Know the Agents

| Agent | Name | Role |
|-------|------|------|
| @dev | Dex | Implements code (Phase 3 of Story Development Cycle) |
| @qa | (unnamed) | Quality assurance gate (Phase 4) |
| @pm | Morgan | Epic orchestration & requirements |
| @po | Pax | Story validation & prioritization |
| @sm | River | Story creation from epics |
| @architect | Aria | System design & technology selection |
| @analyst | Atlas | Research & complexity analysis |
| @devops | Gage | Git, CI/CD, release management |
| @aios-master | Orion | Framework governance & final authority |

### 4. Understand the Workflow

```
Story Development Cycle (SDC):
  Phase 1 — Create (@sm)
    ↓
  Phase 2 — Validate (@po)
    ↓
  Phase 3 — Implement (@dev) ← YOU ARE HERE
    ↓
  Phase 4 — QA Gate (@qa)
    ↓
  DONE (Push @devops)
```

**See:** `~/.claude/rules/sdc-lifecycle.md` for details.

---

## 🔋 TOKEN-ECONOMY: What's New (2026-02-22)

We just completed a major optimization initiative to reduce Claude API token consumption.

### Current Status
- **Phase 1:** ✅ COMPLETE (-3,700 tokens/session)
- **Phases 2-4:** ⏳ Pending (starting 2026-03-03)
- **Phase 5:** 🔄 In progress (Story 5.2 due 2026-02-24)

### What You Need to Know

When **creating new tasks** or **agents**:
1. Add `output_format` directive (e.g., `json`, `yaml`)
2. Specify `max_tokens` limit (prevents bloat)
3. Use `skeleton-first` for long documents

**See:** `instructions.md` (TOKEN-ECONOMY section) for rules.

### How to Monitor

```bash
@aios-master
*token-audit
```

**Available after:** 2026-02-24

**Reports:** `docs/qa/token-audit-reports/`

### Essential Docs for TOKEN-ECONOMY

| Document | Purpose |
|----------|---------|
| `README-TOKEN-ECONOMY.md` | What changed & why |
| `TOKEN-ECONOMY-STATUS.md` | Phase-by-phase details |
| `TOKEN-ECONOMY-INDEX.md` | Navigation guide |
| `docs/TOKEN-AUDIT-USAGE.md` | How to use auditing |

---

## 📋 Development Workflow

### Getting Started on a Story

```
1. Activate agent: @sm (story creation)
   → Create story from epic/PRD

2. Activate agent: @po (story validation)
   → Validate story meets 10-point checklist

3. Activate agent: @dev (implementation)
   → Develop feature, mark checkboxes, update File List

4. Activate agent: @qa (quality gate)
   → Review code, run tests, approve/reject

5. Activate agent: @devops (push to main)
   → Merge PR, create release if needed
```

### Key Files to Understand

| File | Purpose |
|------|---------|
| `docs/stories/` | All development stories (numbered) |
| `docs/prd/` | Product requirement documents |
| `.aios-core/development/tasks/` | Executable task workflows |
| `.aios-core/development/agents/` | Agent definitions |
| `.aios-core/core-config.yaml` | Central configuration |

### Story Template

Stories follow this structure:
```
# Story {NUM} — {TITLE}

## Objective
[What needs to be done?]

## Acceptance Criteria
- [ ] Criterion 1 (Given/When/Then format preferred)
- [ ] Criterion 2
- [ ] ...

## File List
| File | Status | Notes |
|------|--------|-------|
| src/... | Created | ... |

## Change Log
- 2026-02-22: Story created
- ...
```

---

## 🔧 Common Tasks

### Run Tests
```bash
npm test
npm run lint
npm run typecheck
```

### Create a Story
```bash
@sm
*draft
[Answer prompts]
```

### Validate a Story
```bash
@po
*validate-story-draft {story-id}
```

### Implement a Story
```bash
@dev
*develop {story-id}
```

### QA Review
```bash
@qa
*qa-gate {story-id}
```

### Push to Main
```bash
@devops
*push {story-id}
```

---

## 🎯 Guidelines

### Code Quality
- Write clean, self-documenting code
- Follow existing patterns
- Include comprehensive error handling
- Add unit tests for all new functionality
- Use TypeScript/JavaScript best practices
- Update `progress.txt` at each change

### Token Economy (NEW)
- Add `output_format` to tasks
- Specify `max_tokens` limits
- Use `skeleton-first` for documents
- Avoid duplicating content
- Check `*token-audit` weekly

### Commits
- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- Reference story ID: `feat: implement X [Story 2.1]`
- Keep commits atomic and focused

### Testing
- Run all tests before marking complete
- Ensure linting passes: `npm run lint`
- Verify type checking: `npm run typecheck`
- Test edge cases and error scenarios

---

## 🤝 Agent Activation

### How to Activate an Agent

**In chat, type:**
```
@agent-name
```

**Example:**
```
@dev
*develop story-42
```

### Agent Boundaries

Each agent has exclusive authority over certain operations:

| Agent | Exclusive Operations |
|-------|----------------------|
| @devops | `git push`, `gh pr create`, MCP management, CI/CD |
| @pm | `*execute-epic`, `*create-epic`, specs |
| @po | `*validate-story-draft`, backlog prioritization |
| @sm | `*draft` / `*create-story` |
| @dev | Code implementation, local git operations |
| @qa | Quality gate verdicts |
| @aios-master | Framework governance, final authority |

**See:** `~/.claude/rules/agent-authority.md` for details.

---

## 📊 Metrics & Tracking

### Token Economy Metrics (NEW)

Check weekly:
```bash
@aios-master
*token-audit
```

Track over time:
- Global context tokens
- Agent activation overhead
- Output token reduction
- Cache hit rate (Phase 4+)

**Goal:** -6,000 to -8,000 tokens (-56%-75% overhead)

### Story Progress

- Mark checkboxes as tasks complete: `[ ]` → `[x]`
- Maintain File List section
- Update Change Log
- Check status in Story Lifecycle

---

## 🆘 Common Issues

### "Command not found"
- Check agent is activated (@agent-name)
- Verify command is spelled correctly
- Check agent has authority for operation

### "Task not found"
- Verify task file exists in `.aios-core/development/tasks/`
- Check task name matches exactly
- Ensure task is not in a different project

### "Permission denied on git"
- Only @devops can push/merge
- Only @dev can commit locally
- Delegate to appropriate agent

### Token audit not available
- Waiting for Phase 5 Story 5.2 (due 2026-02-24)
- Check with @aios-master: `*token-audit`

---

## 📚 Documentation Map

### Getting Started
1. **This file** (you're reading it)
2. `instructions.md` — Project rules
3. `QUICK-STATUS.txt` — Current status

### TOKEN-ECONOMY (New Initiative)
1. `README-TOKEN-ECONOMY.md` — Executive summary
2. `TOKEN-ECONOMY-STATUS.md` — Detailed phases
3. `TOKEN-ECONOMY-INDEX.md` — Navigation guide
4. `docs/TOKEN-AUDIT-USAGE.md` — How to audit

### Framework Rules
1. `~/.claude/CLAUDE.md` — Global Claude Code config
2. `~/.claude/rules/sdc-lifecycle.md` — Story Development Cycle
3. `~/.claude/rules/agent-authority.md` — Agent permissions

### Project Structure
1. `.aios-core/development/` — Tasks and agents
2. `docs/stories/` — Active stories
3. `docs/prd/` — Product requirements

---

## ✅ Checklist: Ready to Work?

Before starting development, verify:

- [ ] You've read `instructions.md` (5 min)
- [ ] You've read `QUICK-STATUS.txt` (3 min)
- [ ] You understand the 5 agents (dev, qa, pm, po, sm)
- [ ] You know the Story Development Cycle (5 phases)
- [ ] You've activated an agent: `@dev`
- [ ] You understand TOKEN-ECONOMY guidelines (new)
- [ ] You can run tests: `npm test`
- [ ] You know how to update stories

---

## 🚀 Let's Go!

Ready to start? Pick a story:

```bash
@sm
*draft
[Answer prompts to create a story]
```

Or if a story exists:

```bash
@dev
*develop {story-id}
```

Good luck! 🎯

---

## 📞 Need Help?

| Topic | Reference |
|-------|-----------|
| Agent commands | `~/.claude/rules/agent-authority.md` |
| Story workflow | `~/.claude/rules/sdc-lifecycle.md` |
| Token economy | `README-TOKEN-ECONOMY.md` |
| Task execution | `.aios-core/development/tasks/` |
| General rules | `instructions.md` |

**Master help:** Activate @aios-master and ask!

---

**Last Updated:** 2026-02-22 (TOKEN-ECONOMY update)
**Version:** 2.0 (with optimization initiative)
**Status:** Ready for use ✅
