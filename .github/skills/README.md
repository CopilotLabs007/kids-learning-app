# GitHub Copilot Skills for kids-learning-app

This directory contains custom skills that provide domain-specific knowledge and coding guidelines for the kids-learning-app project.

## Available Skills

### 1. **code-refactoring**
**Purpose**: Modernize JavaScript code to ES6+ standards

**Use when**: 
- Refactoring old code
- Modernizing syntax patterns
- Converting var to const/let
- Implementing arrow functions

**Invoke with**: "Refactor this code" or "Modernize this syntax"

**File**: [code-refactoring/SKILL.md](code-refactoring/SKILL.md) (58 lines)

---

### 2. **api-standardization**
**Purpose**: Ensure consistent API call structure and error handling

**Use when**:
- Creating new Express routes
- Making client-side fetch calls
- Implementing error handling
- Standardizing response formats

**Invoke with**: "Standardize this API call" or "Create a new route"

**File**: [api-standardization/SKILL.md](api-standardization/SKILL.md) (83 lines)

---

### 3. **linting-formatting**
**Purpose**: Enforce project-specific style guidelines

**Use when**:
- Formatting code (JavaScript, CSS, EJS)
- Checking code style compliance
- Organizing file structure
- Reviewing code before commit

**Invoke with**: "Format this code" or "Check style"

**File**: [linting-formatting/SKILL.md](linting-formatting/SKILL.md) (116 lines)

---

### 4. **doc-generation**
**Purpose**: Create standard documentation templates

**Use when**:
- Documenting functions (JSDoc)
- Documenting Express routes
- Creating component documentation
- Writing README sections

**Invoke with**: "Document this function" or "Add documentation"

**File**: [doc-generation/SKILL.md](doc-generation/SKILL.md) (164 lines)

---

### 5. **security-practices**
**Purpose**: Enforce security best practices and prevent vulnerabilities

**Use when**:
- Validating user input
- Preventing XSS attacks
- Reviewing security of new features
- Adding routes that handle parameters

**Invoke with**: "Check security" or "Secure this code"

**File**: [security-practices/SKILL.md](security-practices/SKILL.md) (191 lines)

---

### 6. **debugging-help**
**Purpose**: Systematic debugging procedures for common issues

**Use when**:
- Troubleshooting errors
- Route returns 404
- JavaScript not working
- TTS not speaking
- Styles not applying

**Invoke with**: "Help debug this" or "Why isn't this working?"

**File**: [debugging-help/SKILL.md](debugging-help/SKILL.md) (303 lines)

---

### 7. **environment-setup**
**Purpose**: Automated setup guide for new team members

**Use when**:
- Onboarding new developers
- Setting up development environment
- Installing dependencies
- Configuring VS Code

**Invoke with**: "Set up my environment" or "Help me get started"

**File**: [environment-setup/SKILL.md](environment-setup/SKILL.md) (308 lines)

---

### 8. **straighten-quotes**
**Purpose**: Clean HTML text formatting for CMS compatibility

**Use when**:
- Cleaning pasted content
- Fixing quote marks
- Preparing content for CMS

**Invoke with**: "Clean this article" or "Fix formatting"

**File**: [straighten-quotes/SKILL.md](straighten-quotes/SKILL.md) (12 lines)

---

## How Skills Work

Skills are automatically loaded by GitHub Copilot when:
1. The skill name matches your request
2. You explicitly mention the skill topic
3. The context suggests the skill is relevant

## Skill File Structure

Each skill follows this structure:

```markdown
---
name: skill-name
description: Brief description of what the skill does
---

# Instructions

When I ask you to [trigger phrase], perform these steps:

1. Step one
2. Step two
...

## Project-Specific Rules

[Custom rules for kids-learning-app]

## Examples

[Code examples]
```

## Creating New Skills

To add a new skill:

1. Create directory: `.github/skills/your-skill-name/`
2. Create file: `SKILL.md`
3. Add YAML frontmatter with `name` and `description`
4. Write clear instructions with examples
5. Include project-specific rules
6. Test with relevant prompts

## Best Practices

- **Keep skills focused**: One skill per concern
- **Use clear trigger phrases**: Make it obvious when to invoke
- **Provide examples**: Show before/after code
- **Document edge cases**: When NOT to apply the skill
- **Update regularly**: Keep skills current with project changes

## Skill Invocation Tips

**Explicit invocation**:
- "Use the debugging-help skill to fix this error"
- "Apply code-refactoring to this function"

**Implicit invocation** (natural language):
- "Refactor this to modern JavaScript" → triggers code-refactoring
- "How do I debug this 404?" → triggers debugging-help
- "Document this function" → triggers doc-generation

## Project Context

All skills are tailored for **kids-learning-app**, an educational web application for children (ages 3-7) built with:
- Node.js + Express 5
- EJS templates
- Vanilla JavaScript
- Web Speech API for TTS
- No database (static content)

## Maintenance

Skills should be reviewed and updated when:
- Project dependencies change
- New patterns are established
- Team feedback suggests improvements
- New team members have questions not covered

---

**Total Skills**: 8  
**Total Lines**: 1,235  
**Last Updated**: March 16, 2026

For questions or suggestions about skills, create an issue or ask in team chat.
