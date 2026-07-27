# Agent Execution Flow

## Overview
This flow excludes:
- TeamLead.agent.md
- Developer.agent.md
- Tester.agent.md
- Reviewer.agent.md
- QuizBuilder.agent.md

Included agents:
- ba
- research
- functional-requirements-reviewer
- team-lead
- tasks-reviewer
- dev-manager
- dev
- architect (optional side-entry)

## Recommended Sequence
1. ba
2. research (called by ba)
3. functional-requirements-reviewer
4. team-lead
5. research (called by team-lead)
6. tasks-reviewer
7. dev-manager
8. dev (loop until checklist complete)

## Flow Diagram

```mermaid
flowchart TD
    A[Start] --> B{Need architecture or project overview first?}
    B -- Yes --> C[architect]
    C --> D[ba]
    B -- No --> D[ba]

    D --> E[research]
    E --> F[ba: FR decomposition]
    F --> G[functional-requirements-reviewer]

    G --> H{FR approved?}
    H -- No --> D
    H -- Yes --> I[team-lead]

    I --> J[research]
    J --> K[team-lead: task files + checklist]
    K --> L[tasks-reviewer]

    L --> M{Tasks approved?}
    M -- No --> I
    M -- Yes --> N[dev-manager]

    N --> O[dev: implement next task]
    O --> P[Update checklist]
    P --> Q{Any pending tasks?}
    Q -- Yes --> N
    Q -- No --> R[Requirement complete]