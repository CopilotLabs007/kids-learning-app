# Plan Mode - From Prompting To Structured Engineering

## Purpose

Show how Plan Mode helps developers move from a simple prompt to a structured implementation plan before code is changed.

## What Is Plan Mode?

Plan Mode helps developers:

- Break down requirements before coding.
- Generate a structured implementation plan.
- Reduce ambiguity and rework.
- Align AI output with intent and architecture.
- Move from code generation to engineering guidance.

## Why Plan Mode Matters

Traditional prompting often gives:

- Immediate code.
- Inconsistent structure.
- Missing edge cases.
- Limited governance.

Plan Mode introduces:

- Clarity.
- Intent.
- Specifications.
- Source of truth.
- Traceability.
- Structured execution.

## Demo Scenario

Use a simple feature request:

```text
Add approval for generated quiz questions.
```

This request sounds simple, but it hides important decisions:

- Who approves the questions?
- What states should a question have?
- What should learners see?
- What happens when a question is rejected?
- What needs to be tested?

## Demo Steps

### Step 1: Start In Plan Mode

Open GitHub Copilot Chat and select **Plan Mode**.

Explain:

> We are asking Copilot to plan before it edits code.

### Step 2: Enter The Request

Use this prompt:

```text
Plan a small implementation for a quiz question approval workflow in this kids learning app.

Include:
- Question states: draft, pending review, approved, rejected
- Review actions: approve and reject
- Learners should only see approved questions
- Likely files to change
- Validation checks

Do not edit files yet. First create a plan I can review.
```

### Step 3: Review The Plan

Check whether the plan clearly explains:

- What will be changed.
- Which files are involved.
- How the workflow will behave.
- Which edge cases are covered.
- How the implementation will be validated.

### Step 4: Start Implementation

If the plan looks correct, click **Start Implementation**.

Explain:

> The AI is now implementing from a reviewed plan, not guessing from a vague prompt.

### Step 5: Validate The Result

Confirm these outcomes:

| Check | Expected Result |
|-------|-----------------|
| Pending question | Hidden from learners |
| Approved question | Visible to learners |
| Rejected question | Hidden from learners |
| Approve action | Changes status to approved |
| Reject action | Changes status to rejected |

## Key Message

Plan Mode changes the workflow from:

```text
Prompt -> Code
```

to:

```text
Prompt -> Plan -> Review -> Implement -> Validate
```

## Closing Line

> Plan Mode helps AI-assisted development feel less like code generation and more like structured engineering.