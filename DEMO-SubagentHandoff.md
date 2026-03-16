# Demo: Custom Agents with Subagent & Handoff Workflows

Demonstrates **subagent invocation** and **multi-agent handoff workflows** in VS Code using two patterns:
1. **Simple Workflow**: QuizBuilder (parallel handoffs)
2. **Sequential Workflow**: TeamLead → Developer → Tester → Reviewer (4-step process)

## Overview

### Pattern 1: Parallel Handoffs (QuizBuilder)
**Workflow**: Planning → Research (subagent) → User chooses path

**Flow**: QuizBuilder → Explore (subagent) → [Implementation OR Spec OR Preview]

### Pattern 2: Sequential Handoffs (TeamLead Workflow)
**Workflow**: Planning → Implementation → Testing → Review

**Flow**: TeamLead → Developer → Tester → Reviewer → Approve/Revise

**Key**: Each agent completes its phase, then hands off to next specialist

## Prerequisites

- `.github/agents/` folder with 5 agents:
  - `QuizBuilder.agent.md` (simple workflow)
  - `TeamLead.agent.md` (planner)
  - `Developer.agent.md` (implementer)
  - `Tester.agent.md` (test writer)
  - `Reviewer.agent.md` (quality checker)
- VS Code with GitHub Copilot Chat
- Project: kids-learning-app

---

## Demo 1: Simple Workflow (QuizBuilder)

**Best for**: Quick feature planning with multiple output options

### Steps

#### 1. Activate QuizBuilder
- Open Copilot Chat (`Cmd+Shift+I` / `Ctrl+Shift+I`)
- Select **QuizBuilder** from agent picker
- Verify `@QuizBuilder` shows in input

#### 2. Send Request
```
Create a Fruits quiz with 5 multiple-choice questions for kids
```

#### 3. Watch Subagent Invocation
- QuizBuilder calls **Explore** subagent automatically
- Explore reads `app.js`, views, CSS, JS files
- Findings returned to QuizBuilder

#### 4. Review Generated Plan
- Quiz design (questions, scoring, feedback)
- Implementation phases
- Files to create/modify
- Verification checklist
- Plan saved to `/memories/session/quiz-plan.md`

#### 5. Choose Handoff Path

**Three parallel options:**

1. **Start Implementation** → Build full feature
2. **Create Spec Document** → Generate documentation
3. **Preview Quiz Structure** → HTML mockup

**All use `send: true`** (auto-submit)

---

## Demo 2: Sequential Workflow (TeamLead → Developer → Tester → Reviewer)

**Best for**: Complete feature development with quality gates

### Steps

#### 1. Activate TeamLead Agent
- Open Copilot Chat
- Select **TeamLead** from agent picker

#### 2. Request Feature Planning
```
Plan a new "Planets" topic page for kids to learn about solar system
```

#### 3. Watch Planning Phase
- TeamLead invokes **Explore** subagent for research
- Creates comprehensive plan
- Saves to `/memories/session/feature-plan.md`
- Handoff button appears: **"Hand off to Developer"**

#### 4. Handoff to Developer (`send: false`)
- Click **"Hand off to Developer"**
- Prompt pre-filled, awaits user review
- Review prompt, then send
- **Developer agent** activates

#### 5. Watch Implementation Phase
- Developer reads plan from memory
- Creates files: `views/planets.ejs`, routes, CSS
- Updates existing files
- Saves implementation notes to memory
- Two handoff buttons appear:
  - **"Hand off to Tester"**
  - **"Hand off to Reviewer"** (skip testing)

#### 6. Handoff to Tester
- Click **"Hand off to Tester"**
- **Tester agent** activates
- Reads plan and implementation
- Writes test cases
- Executes manual/automated tests
- Documents results
- Handoff button: **"Hand off to Reviewer"**

#### 7. Handoff to Reviewer
- Click **"Hand off to Reviewer"**
- **Reviewer agent** activates
- Reviews code quality, security, best practices
- Checks test coverage
- Creates `/memories/session/review-feedback.md`
- Two final handoff options:
  - **"Request Changes from Developer"** (if issues found)
  - **"Approve and Complete"** (if all good)

#### 8. Complete or Iterate
- **If approved**: Workflow complete ✅
- **If changes needed**: Returns to Developer → Tester → Reviewer loop

---

## Quick Demo Script

### Simple Workflow (2 minutes)
**Minute 1**: QuizBuilder → Request → Subagent research → Plan  
**Minute 2**: Choose handoff path → Implementation/Spec/Preview

### Sequential Workflow (5 minutes)
**Minute 1**: TeamLead → Request → Planning → Handoff  
**Minute 2**: Developer → Implementation → Handoff  
**Minute 3**: Tester → Test creation → Handoff  
**Minute 4**: Reviewer → Quality check → Decision  
**Minute 5**: Approve or iterate

---

## Key Concepts

### Subagent Invocation
One agent calls another to perform specialized tasks. Both TeamLead and QuizBuilder call **Explore** subagent for codebase research before planning.

### Parallel vs Sequential Handoffs

**Parallel (QuizBuilder)**: User chooses one path from multiple options
- ✅ Fast decisions
- ✅ Flexible outcomes
- Use `send: true` for speed

**Sequential (TeamLead→Developer→Tester→Reviewer)**: Linear workflow with quality gates
- ✅ Enforced process
- ✅ Quality checkpoints
- ✅ Clear ownership
- Use `send: false` for review at each step

### Memory Persistence
Plans saved to `/memories/session/` ensure context survives agent transitions:
- `feature-plan.md` - Created by TeamLead, read by all agents
- `review-feedback.md` - Created by Reviewer
- Each agent updates with their findings

### Configuration Examples

**Simple Agent (QuizBuilder)**:
```yaml
name: QuizBuilder
tools: ['search', 'read', 'vscode/memory', 'agent']
agents: ['Explore']
handoffs:
  - label: "Start Implementation"
    agent: agent
    send: true  # Parallel, auto-submit
```

**Sequential Agent (Developer)**:
```yaml
name: Developer
tools: ['search', 'read', 'create_file', 'replace_string_in_file', ...]
handoffs:
  - label: "Hand off to Tester"
    agent: Tester
    send: false  # Sequential, needs review
  - label: "Hand off to Reviewer"
    agent: Reviewer
    send: false
```

**Handoff Parameters:**
- `label` - Button text
- `agent` - Target agent (`agent` = default, or specific name)
- `prompt` - Pre-filled message
- `send: true` - Auto-submit | `send: false` - Wait for user approval
- `showContinueOn: false` - Hide continue button (optional)

---

## Workflow Comparison

| Aspect | QuizBuilder (Parallel) | TeamLead Workflow (Sequential) |
|--------|----------------------|-------------------------------|
| **Agents** | 2 (QuizBuilder + Explore) | 5 (TeamLead + Explore + Developer + Tester + Reviewer) |
| **Handoffs** | 3 parallel options | 4 sequential steps |
| **Pattern** | Planning → User choice | Planning → Dev → Test → Review |
| **Auto-submit** | Yes (`send: true`) | No (`send: false`) |
| **Use case** | Quick features, prototypes | Production features, quality critical |
| **Duration** | 2-3 minutes | 5-10 minutes |
| **Control** | User decides path | Enforced workflow |

---

## Troubleshooting

- **No agent**: Check `.github/agents/*.agent.md` files exist, reload window
- **No buttons**: Verify `handoffs:` YAML frontmatter syntax
- **No memory**: Confirm `tools: ['vscode/memory']` in frontmatter
- **Wrong agent invoked**: Check `agent: AgentName` matches exact agent name
- **Auto-submit not working**: Verify `send: true` in handoff configuration

---

## Create Your Own Workflow

### Simple Pattern (Parallel Handoffs)
1. Create `.github/agents/your-planner.agent.md`
2. Define tools: `['search', 'read', 'vscode/memory', 'agent']`
3. Add multiple handoffs with `send: true`
4. User chooses path after planning

### Sequential Pattern (Multi-Agent Pipeline)
1. Create multiple specialized agents (Planner, Doer, Checker)
2. Each agent has handoff to next specialist
3. Use `send: false` for approval gates
4. Use memory to pass context between agents
5. Final agent approves or loops back

**Common Sequential Workflows:**
- **Plan → Implement → Review**: Standard feature development
- **Plan → Dev → Test → Review**: With testing phase
- **Write Tests → Implement → Review**: Test-first development (TDD)
- **Design → Implement → Refactor → Review**: Quality-focused

**Tips:**
- Keep agents focused (single responsibility)
- Use descriptive handoff labels
- Save context to memory at each step
- Use `send: false` for important transitions
- Test the full workflow end-to-end

---

## References

- [GitHub Copilot Agents Handoffs Guide](https://wearecommunity.io/communities/prodotnet/articles/7343) - Official guide
- [Example Workflow Repo](https://github.com/arturhaikou/spec-workflow) - Reference implementation
- **Project Agents**:
  - [QuizBuilder.agent.md](.github/agents/QuizBuilder.agent.md) - Simple parallel workflow
  - [TeamLead.agent.md](.github/agents/TeamLead.agent.md) - Planner
  - [Developer.agent.md](.github/agents/Developer.agent.md) - Implementer
  - [Tester.agent.md](.github/agents/Tester.agent.md) - Test writer
  - [Reviewer.agent.md](.github/agents/Reviewer.agent.md) - Quality checker
