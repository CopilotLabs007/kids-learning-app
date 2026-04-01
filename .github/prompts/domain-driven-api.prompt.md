---
agent: 'agent'
model: GPT-4o
tools: ['codebase', 'editFiles']
description: 'Generate a C#.NET API to handle To-Do items creation using Domain-Driven Design with EF Core.'
---

Requirements:
* Use Domain-Driven Design principles.
* Implement EF Core for persistence.
* Define To-Do entity with properties: Id, Title, Description, Priority, Status, CreatedAt.
* Use DTOs for data transfer between layers.
* Create a command handler for To-Do creation.
* Use FluentValidation for input validation.
* Suggest folder structure for Domain, Application, Infrastructure, and API layers.
* Ensure proper separation of concerns.
* Provide example code for To-Do creation API.