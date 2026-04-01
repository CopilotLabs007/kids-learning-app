# Kids Learning App — Guided Lab

## Overview
A Node.js + Express web app that helps kids learn the alphabet, numbers, colors, shapes, and animals with text-to-speech support.
---
## Prerequisites
- Node.js (v18+)
- npm
- A modern web browser
---
## Step 1: Clone the Repository
```bash
git clone https://github.com/CopilotLabs007/kids-learning-app.git
cd kids-learning-app
```
---
## Step 2: Install Dependencies
```bash
npm install
```
---
## Step 3: Run the App
```bash
npm start
```
Open your browser at **http://localhost:3000**
---

## Plan Mode
- open the chat window in Plan Mode 
- Enter the following prompt:

- Add a new 'Fruits' topic page following the same pattern as the existing animals and colors pages, with cards for 10 common fruits including name, emoji, and text-to-speech on click.

- Let it proceed and If the plan looks right, click on Start Implementation to let it generate the code for you.

![alt text](/GuidedLab/PlanMode-1.png)

## Skills
- /create-skill - to create a new skill for the app
- /use like reusable prompts
- /linting-formatting format code in shapes.ejs
- /code-refactoring - convert all the JavaScript syntax to modern ES6+ standards by using skills
- `convert all the JavaScript syntax to modern ES6+ standards by using skills`
- click on gear symbol and click Show Agent Logs. You can see the skills being invoked in the logs.

## Sub Agents & HandOffs
- Subagents are specialized agents that can be invoked by the main agent to perform specific tasks, such as research, code generation, or testing.
- Handoffs allow you to transfer the output of one agent to another for further processing or implementation.

## Demo 1: Parallel Handoff Options (QuizBuilder Agent)
- Open Copilot Chat and select **QuizBuilder** from the agent picker
- Enter the prompt: `Create a Fruits quiz with 5 multiple-choice questions for kids`    
- Watch the QuizBuilder agent automatically invoke the Explore subagent to research existing quiz patterns in the codebase
- Review the generated quiz plan, which is saved to memory at `/memories/session/quiz-plan.md`
- Choose one of the three parallel handoff options:
1. **Start Implementation** → Build the full quiz feature
2. **Create Spec Document** → Generate detailed documentation for the quiz
3. **Preview Quiz Structure** → Generate a sample HTML/EJS template showing the quiz structure
- All options use `send: true` for auto-submission, allowing you to seamlessly transition to the next phase without manual copying or pasting of prompts

## Demo 2: Sequential Workflow (TeamLead → Developer → Tester → Reviewer)
- Open Copilot Chat and select **TeamLead** from the agent picker
- Enter the prompt: `Plan a new "Planets" topic page for kids to learn about solar system`
- Watch the TeamLead agent invoke the Explore subagent for research, create a comprehensive feature plan, and save it to memory at `/memories/session/feature-plan.md`
- Click the **"Hand off to Developer"** button (with `send: false`) to review the prompt before sending it to the Developer agent
- After sending, the Developer agent activates, reads the plan from memory, and begins implementation by creating necessary files and updating existing ones
- Once implementation is complete, the Developer agent saves implementation notes to memory and presents two handoff options for testing and review, allowing you to continue the workflow seamlessly without manual intervention.

## Awesome Copilot Labs provides a powerful platform for building intelligent agents that can assist with software development tasks. By leveraging subagents and handoffs, you can create complex workflows that automate planning, implementation, testing, and review processes, all while maintaining control and oversight over each step. This guided lab demonstrates how to use these features effectively to enhance your development experience and streamline your workflow.

- Install Awesome copilot extension and then import the required agents on to the current workspace..

- Open the chat window in Plan Mode to get started with the guided lab. Follow the prompts and explore the capabilities of subagents and handoffs to see how they can enhance your development process.

- For more information on how to create and use agents, subagents, and handoffs, refer to the documentation provided in the Awesome Copilot Labs repository.
