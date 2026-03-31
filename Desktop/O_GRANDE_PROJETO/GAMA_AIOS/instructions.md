# GAMA_AIOS Development Instructions

## Core Principles

### Code Quality
- Always use programming best practices
- Update `progress.txt` at each change
- Follow existing patterns in the codebase
- Include comprehensive error handling

### Token Economy ⚡ (NEW)
**Synkra AIOS now includes TOKEN-ECONOMY optimization (Phases 1-5).**

#### Phase 1 ✅ — Context Cleanup (COMPLETE)
- Global context reduced by ~3,700 tokens/session
- See: `CHANGELOG-TOKEN-ECONOMY.md` for details
- New consolidated rules: `sdc-lifecycle.md`, `workflow-selection-guide.md`

#### Phases 2-4 🔄 — In Planning
- Agent slimming (-2,000 tokens/activation)
- Structured outputs (-40-60% output tokens)
- Prompt caching (-80% repeated context)
- See: `CHANGELOG-TOKEN-ECONOMY.md` for timeline

#### Phase 5 🔍 — Monitoring & Auditing
- Use `*token-audit` command (available after Story 5.2)
- Task: `.aios-core/development/tasks/token-audit.md`
- Reports saved to: `docs/qa/token-audit-reports/`

#### When Creating New Tasks/Agents
- Add `output_format` directive (e.g., `json`, `yaml`)
- Specify `max_tokens` limit (prevents bloat)
- Use `skeleton-first` for long documents (parallel expansion)
- Register in `.aios-core/core-config.yaml` if using token budgets

### Current Status
- **Phase 1 complete:** 3,700 tokens saved
- **Estimated total savings (all phases):** -6,000 to -8,000 tokens (-56%-75%)
- **Next step:** Phase 2 (Agent Slimming) — in 2-4 weeks
- **Monitoring:** Weekly `*token-audit` runs after Phase 5.2
