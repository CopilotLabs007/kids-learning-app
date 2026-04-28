## Skills vs Instructions (Audience Version)

### One-Line Difference
Agent Skills define what the agent can do. Copilot Instructions define how the agent must do it.

### Quick Comparison


| Dimension | Agent Skills             | Copilot Instructions           |
| --------- | ------------------------ | ------------------------------ |
| Core Idea | Capability               | Control                        |
| Answers   | *What can the agent do?* | *How should the agent behave?* |
| Type      | Functional assets        | Behavioral rules               |
| Layer     | Execution                | Governance                     |
| Goal      | Efficiency & expertise   | Accuracy & discipline          |
| Nature | Reusable logic, tools, workflows | Rules, constraints, preferences |
| Purpose | Speed and domain expertise | Consistency, safety, compliance |


### Smart Cleaning Robot Analogy
Think of a smart cleaning robot.

![Smart Cleaning Robot](octocat-robot.png)

- The robot's built-in and add-on capabilities (vacuuming, mopping, object detection) are like Agent Skills.
- The user-defined rules (no-go zones, cleaning schedule, carpet restrictions) are like Copilot Instructions.

Even if the robot can mop everywhere, it will not mop carpets when instructed not to.

| Aspect         | Agent Skills                | Copilot Instructions         |
| -------------- | --------------------------- | ---------------------------- |
| In Robot Terms | Cleaning abilities          | Cleaning rules               |
| Purpose        | Enable actions              | Control behavior             |
| Example        | Vacuum, mop, detect objects | Avoid rooms, follow schedule |

### Why This Analogy Works
1. It clearly separates what vs how.
2. It is easy for any audience to relate to.
3. It shows consequences:
   - No skills: the robot cannot perform tasks.
   - No instructions: the robot performs tasks the wrong way.

### Precision Upgrades For Demo
1. Skills are not just "hardware".
   - They are structured strategies, tools, and workflows.
2. Skills are modular.
   - New capabilities can be plugged in (example: stain detection).
3. Instructions are enforceable constraints.
   - The system can refuse unsafe or out-of-policy actions.

### Speaker Script (30-45 Seconds)
"Here is the simplest way to think about it: Agent Skills are capabilities, and Copilot Instructions are controls. A smart cleaning robot can vacuum and mop because it has those capabilities, just like an agent has skills. But whether, when, and where it cleans depends on rules like no-go zones or carpet restrictions. That is exactly what instructions do: they constrain behavior. So in practice, skills give power, instructions give discipline, and we need both for reliable AI outcomes."

### Final Takeaway
Strong analogy, now refined for clarity, modularity, and enforcement.

---

## Skills vs Custom Agents (Audience Version)

### One-Line Difference
Agent Skills are reusable capabilities a single agent loads on demand. Custom Agents are purpose-built personas that combine multiple skills, instructions, and workflows into a specialized role.

### Quick Comparison

| Dimension | Agent Skills                  | Custom Agents                        |
| --------- | ----------------------------- | ------------------------------------ |
| Core Idea | Capability                    | Persona                              |
| Answers   | *What can the agent do?*      | *Who is doing the work?*             |
| Type      | Modular tool/workflow         | Orchestrated role                    |
| Layer     | Task execution                | Role coordination                    |
| Goal      | Reusability & expertise       | Specialization & autonomy            |
| Nature    | Single-purpose recipe cards   | Multi-skill orchestrators            |
| Purpose   | Solve one type of problem     | Own an entire workflow end-to-end    |

### Smart Cleaning Robot Analogy
Think of a smart cleaning robot — the same one from Skills vs Instructions.

![Smart Cleaning Robot](octocat-robot.png)

- The robot's **add-on modules** (vacuuming attachment, mopping pad, stain detector) are like Agent Skills. Each module does one job well and can be swapped in or out.
- A **specialized robot** (a dedicated kitchen-cleaning robot, a garden robot, a pool-cleaning robot) is like a Custom Agent. It comes pre-loaded with the right modules, knows its territory, and operates autonomously.

A kitchen-cleaning robot does not just vacuum. It knows to mop tile floors, avoid the gas stove, wipe countertops, and handle grease — combining multiple capabilities under one specialized identity.

Even if all the same modules exist, a general robot needs you to tell it what to do step by step. A specialized robot already knows its job.

| Aspect          | Agent Skills                        | Custom Agents                          |
| --------------- | ----------------------------------- | -------------------------------------- |
| In Robot Terms  | Attachments & modules               | Specialized robots                     |
| Purpose         | Add one capability                  | Own an entire zone or workflow         |
| Example         | Vacuum module, mop pad, UV scanner  | Kitchen robot, garden robot, pool bot  |
| Who decides?    | You tell the robot which module     | The robot decides which modules to use |
| Autonomy        | Follows your command                | Plans and executes independently       |

### Why This Analogy Works
1. It clearly separates module vs machine.
2. It builds on the familiar robot from the Instructions section.
3. It shows consequences:
   - No skills (modules): the robot has no capabilities to perform tasks.
   - No custom agents (specialized robots): every task needs you to manually pick modules, set zones, and supervise step by step.

### Restaurant Kitchen Analogy
Think of a restaurant kitchen.

- A **recipe card** (how to make pasta, how to plate a dessert) is like an Agent Skill. Any chef can pick it up and follow it.
- A **specialized chef** (pastry chef, sushi chef, grill master) is like a Custom Agent. They know which recipes to use, in what order, and bring their own judgment and standards.

A pastry chef does not just follow one recipe. They decide which desserts to make, combine multiple recipes, adapt to available ingredients, and ensure quality across the entire dessert menu.

| Aspect          | Agent Skills              | Custom Agents                    |
| --------------- | ------------------------- | -------------------------------- |
| In Kitchen Terms | Recipe cards             | Specialized chefs                |
| Purpose         | Standardize one task      | Own an entire station            |
| Example         | "How to make pasta sauce" | "Pastry chef runs all desserts"  |

### Why Both Analogies Work
1. **Robot analogy** — connects directly to the Skills vs Instructions section, showing a progression.
2. **Kitchen analogy** — adds a human/team dimension for audiences who relate better to people.
3. Both show consequences:
   - No skills: no proven capabilities or recipes to follow.
   - No custom agents: every task needs manual orchestration and context-switching.

### Key Differences in Practice

| Feature             | Agent Skills                        | Custom Agents                              |
| ------------------- | ----------------------------------- | ------------------------------------------ |
| Invocation          | `/skill-name` or auto-loaded        | `@agent-name` or agent handoff             |
| Scope               | One task type                       | Entire workflow or domain                  |
| State               | Stateless (load, execute, done)     | Can maintain context across steps          |
| Composition         | Used individually                   | Combines multiple skills + instructions    |
| Decision-making     | Follows predefined steps            | Makes judgment calls, plans, delegates     |
| Example             | `/code-refactoring modernize file`  | `@TeamLead plan new feature`               |

### When to Use Which

| Scenario                                     | Use             |
| -------------------------------------------- | --------------- |
| Standardize a single repeatable task         | Agent Skill     |
| Need consistent formatting across files      | Agent Skill     |
| Plan and implement a multi-step feature      | Custom Agent    |
| Coordinate across plan → build → test → review | Custom Agent  |
| Share a tested workflow with the team         | Agent Skill     |
| Assign an autonomous role with judgment       | Custom Agent    |

### Precision Upgrades For Demo
1. Skills are building blocks.
   - Custom agents consume skills, they do not replace them.
2. Custom agents have identity.
   - They carry a name, a description, and a defined responsibility boundary.
3. Custom agents enable handoffs.
   - TeamLead plans, Developer builds, Tester validates — each is a custom agent passing work forward.

### Speaker Script (30-45 Seconds)
"Think of it this way: Agent Skills are recipe cards, and Custom Agents are specialized chefs. A recipe card standardizes how to make pasta sauce — any chef can use it. But a pastry chef does not just follow one recipe. They own the entire dessert station, decide which recipes to combine, and ensure quality across the board. That is exactly what custom agents do: they bring identity, judgment, and orchestration. Skills give you consistency on individual tasks; custom agents give you specialization across entire workflows."

### Final Takeaway
Skills are the what. Custom Agents are the who. Use skills to standardize tasks, use custom agents to own domains.


