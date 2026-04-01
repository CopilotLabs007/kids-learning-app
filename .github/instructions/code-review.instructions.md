---
applyTo: "**/*.py, **/*.js, **/*.ts, **/*.cs, **/*.tf, **/*.java"
---

# Code Review Instructions

When reviewing code in this project, apply these guidelines and categorize feedback by severity.

## Security

- Flag hardcoded secrets, credentials, API keys, or connection strings
- Flag SQL injection, XSS, command injection, and SSRF vulnerabilities
- Ensure user inputs are validated and sanitized at system boundaries
- Flag use of insecure functions (e.g., `eval`, `exec`, `innerHTML`)
- Verify sensitive data is not logged or exposed in error messages

## Error Handling

- Ensure functions handle errors at system boundaries (I/O, network, user input)
- Flag empty catch/except blocks — errors must be logged or re-raised
- Flag swallowed exceptions that hide failures silently

## Code Quality

- Flag functions longer than 50 lines — suggest splitting
- Flag deeply nested conditionals (more than 3 levels) — suggest refactoring
- Flag cyclomatic complexity above 10 — suggest decomposition
- Flag duplicated code blocks — suggest extracting shared logic
- Flag dead code, unused imports, and unreachable branches
- Never print inside functions — always return values

## Naming & Readability

- Variable and function names must be descriptive and self-documenting
- Avoid single-letter variable names outside of loop counters
- Follow language-specific naming conventions (snake_case for Python, camelCase for JS/TS, PascalCase for C#)

## Python-Specific

- Enforce PEP8 formatting
- Require docstrings on all public functions and classes
- Require type hints on function signatures
- Use `pandas` for CSV handling — never the `csv` module
- Prefer list comprehensions over manual for-loop appends
- Prefer dataclasses or typed structures over raw dicts for structured data

## JavaScript / TypeScript-Specific

- Enforce ES6+ conventions: `const`/`let` over `var`, arrow functions, template literals
- Flag `var` declarations
- Ensure async/await error handling with try/catch
- Flag missing input validation in route handlers

## C# / .NET-Specific

- Follow .NET naming conventions: PascalCase for public members, camelCase for locals
- Flag missing null checks and nullable reference handling
- Ensure `IDisposable` resources use `using` statements

## Terraform-Specific

- Flag hardcoded values that should be variables
- Flag missing `description` on variables and outputs
- Never hardcode secrets — reference Key Vault or secure storage
- Prefer `for_each` over `count` for multiple similar resources

## Review Comment Format

Categorize each finding:
- **Critical**: Security vulnerabilities, data exposure, broken error handling
- **Warning**: Convention violations, missing types/docstrings, complexity
- **Suggestion**: Style improvements, refactoring opportunities
