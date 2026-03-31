# 🤖 GitHub Copilot SDK Demo Guide

## 🎤 Opening Statement

GitHub Copilot SDK lets you build applications powered by GitHub Copilot in your preferred programming language.

In simple terms: it gives you the building blocks to embed an intelligent assistant into your own app.

---

## 📖 Core Definition

A Copilot SDK (Software Development Kit) is a set of:

- APIs
- Libraries
- Tools
- Documentation

that helps developers integrate AI assistants into software products.

---

## 🧭 Demo Flow At A Glance

1. What Copilot SDK is
2. How it differs from Chatbots
3. SDK vs CLI
4. SDK vs MCP
5. Real-world use cases
6. Official quickstart path

---

## 💬 Chatbot vs Copilot

| Feature         | Chatbot          | Copilot                           |
| --------------- | ---------------- | --------------------------------- |
| Purpose         | Answer questions | Assist + act                      |
| Intelligence    | Limited          | Advanced (LLM-based)              |
| Context memory  | Minimal          | Strong (multi-turn understanding) |
| Actions         | Usually no       | Yes                               |
| Integration     | Basic            | Deep (DB, APIs, tools)            |
| Personalization | Low              | High                              |

Key message: a chatbot mostly responds, while a copilot can understand context and take useful actions.

---

## 🔗 SDK vs CLI

| Aspect      | CLI (Command-Line Interface)                     | SDK (Software Development Kit)                     |
| ----------- | ------------------------------------------------ | -------------------------------------------------- |
| Purpose     | Interactive tool for end users                   | Programmable layer for developers                  |
| Audience    | Developers using it in terminal                  | Developers building apps and workflows             |
| Usage       | Complete out-of-the-box experience               | Building blocks for custom experiences             |
| Example     | copilot chat "explain this code"                 | client.createSession(...), session.sendAndWait(...) |
| Relationship| Often built on top of SDK capabilities           | Foundation layer powering clients and integrations |

Key message: CLI is what you use directly, SDK is what you build with.

---

## 🧠 Copilot SDK vs MCP

### What is MCP?

MCP (Model Context Protocol) is a standard way to connect AI models to external data and tools.

It defines:

- How AI requests data
- How tools respond
- How context is passed

### What is Copilot SDK?

Copilot SDK is the full toolkit used to build an assistant experience, including UI, conversation flow, and actions.

### Simple Analogy

- Copilot SDK = building the house
- MCP = wiring and plumbing inside the house

Key message: SDK builds the assistant experience, MCP standardizes how it connects to tools and data.

---

## 🎯 Simple Analogies For Audience

### Smart Kitchen Assistant

- You = chef
- Copilot = assistant that suggests recipes, prepares steps, and reminds next actions

Takeaway: Copilot SDK gives you tools to build this assistant inside your app.

### Power Tools Kit

- Without tools: slow and hard
- With tools: faster and easier

Takeaway: SDK avoids building everything from scratch.

### Adding A Brain To Your App

- Without copilot: buttons and forms
- With copilot: can talk, understand, and act

Takeaway: SDK adds intelligence and actionability.

---

## 🔥 Selected Real-World Use Cases

### 1. Developer Copilot (Internal Tools)

- Explains internal APIs
- Generates boilerplate code
- Answers internal architecture questions

### 2. HR / Employee Copilot

- Answers leave balance and policy questions
- Automates common HR requests

### 3. Learning / Education Copilot

- Explains concepts
- Generates quizzes
- Tracks student progress

### 4. Document Copilot

- Summarizes PDFs
- Extracts key points
- Drafts reports

---

## 🧩 Common Pattern Across Use Cases

1. User asks in natural language
2. Copilot understands intent
3. Copilot connects to data and tools
4. Copilot responds with insight or action

Mental model:

- Users struggle with complex systems
- Copilot provides a just ask experience

---

## 📘 Official Getting Started Summary

Source: [Getting started with Copilot SDK](https://docs.github.com/en/copilot/how-tos/copilot-sdk/sdk-getting-started)

### Guide Highlights

- Available with all Copilot plans
- Currently in technical preview
- Guide demonstrates npm install, first message, and streaming responses

### Prerequisites

- Node.js 18 or later
- Copilot CLI installed and authenticated
- Verify with: copilot --version

### Quick Setup

```bash
mkdir copilot-demo && cd copilot-demo
npm init -y --init-type module
npm install @github/copilot-sdk tsx
```

### Minimal Run Command

```bash
npx tsx index.ts
```

### Core Runtime Flow

- Create CopilotClient
- Create session with model such as gpt-4.1
- Send prompt with sendAndWait
- Stop client cleanly

### Streaming Essentials

- Enable streaming: true in session config
- Consume assistant.message_delta for incremental output
- Use session.idle to detect completion

---

## 🎤 Closing Pitch For Demo

GitHub Copilot SDK takes you from hello prompt to real-time, tool-augmented assistant experiences inside your own application.
