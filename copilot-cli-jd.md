# GitHub Copilot CLI - JD Complete Guide

## 🎯 Overview

GitHub Copilot CLI brings AI-powered coding assistance directly to your command line, enabling you to build, debug, and understand code through natural language conversations. It's powered by the same agentic harness as GitHub's Copilot coding agent and provides intelligent assistance while staying deeply integrated with your GitHub workflow.

## 🚀 Key Features

### **Terminal-Native Development**
- Work with Copilot coding agent directly in your command line
- No context switching required between IDE and terminal
- Full terminal integration with your existing workflow

### **GitHub Integration**
- Access repositories, issues, and pull requests using natural language
- Authenticated with your existing GitHub account
- Seamless GitHub workflow integration

### **Agentic Capabilities**
- Build, edit, debug, and refactor code with AI collaboration
- Plan and execute complex tasks autonomously
- Multi-step problem solving with context awareness

### **MCP-Powered Extensibility**
- Ships with GitHub's MCP server by default
- Support for custom MCP servers to extend capabilities
- Modular architecture for enhanced functionality

### **Full Control & Preview**
- Preview every action before execution
- Nothing happens without your explicit approval
- Transparent operations with clear feedback

## 📦 Installation Guide

### **Prerequisites**
- Active Copilot subscription ([View Plans](https://github.com/features/copilot/plans))
- PowerShell v6+ (Windows users)
- Organization/enterprise permissions (if applicable)

### **Installation Methods**

#### **1. Install Script (macOS & Linux)**
```bash
# Standard installation
curl -fsSL https://gh.io/copilot-install | bash

# Alternative with wget
wget -qO- https://gh.io/copilot-install | bash

# Root installation (installs to /usr/local/bin)
curl -fsSL https://gh.io/copilot-install | sudo bash

# Custom directory installation
curl -fsSL https://gh.io/copilot-install | VERSION="v0.0.369" PREFIX="$HOME/custom" bash
```

#### **2. Homebrew (macOS & Linux)**
```bash
# Stable version
brew install copilot-cli

# Prerelease version
brew install copilot-cli@prerelease
```

#### **3. WinGet (Windows)**
```bash
# Stable version
winget install GitHub.Copilot

# Prerelease version
winget install GitHub.Copilot.Prerelease
```

#### **4. npm (All Platforms)**
```bash
# Stable version
npm install -g @github/copilot

# Prerelease version
npm install -g @github/copilot@prerelease
```

## 🎮 Getting Started

### **First Launch**
```bash
copilot
```

### **Authentication**
1. If not logged in, use `/login` command
2. Follow on-screen instructions to authenticate
3. Alternative: Use Personal Access Token (PAT)

#### **PAT Authentication**
1. Create fine-grained PAT at https://github.com/settings/personal-access-tokens/new
2. Add "Copilot Requests" permission
3. Set environment variable: `GH_TOKEN` or `GITHUB_TOKEN`

### **Basic Usage**
- Launch `copilot` in your project directory
- Default model: Claude Sonnet 4.5
- Use `/model` to switch between available models (Claude Sonnet 4, GPT-5)

## 🔧 Essential Commands Reference

### **Global Shortcuts**
| Shortcut | Action |
|----------|--------|
| `@` | Mention files, include contents in context |
| `Ctrl+S` | Run command while preserving input |
| `Shift+Tab` | Cycle modes (interactive → plan → autopilot*) |
| `Ctrl+T` | Toggle model reasoning display |
| `Ctrl+O` | Expand recent timeline (when no input) |
| `Ctrl+E` | Expand all timeline (when no input) |
| `↑ ↓` | Navigate command history |
| `Ctrl+C` | Cancel/clear input/copy selection |
| `Ctrl+C ×2` | Exit from CLI |
| `!` | Execute command in local shell (bypass Copilot) |
| `Esc` | Cancel current operation |
| `Ctrl+D` | Shutdown |
| `Ctrl+L` | Clear screen |

### **Editing Shortcuts**
| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Move to beginning of line |
| `Ctrl+E` | Move to end of line |
| `Ctrl+H` | Delete previous character |
| `Ctrl+W` | Delete previous word |
| `Ctrl+U` | Delete from cursor to beginning |
| `Ctrl+K` | Delete from cursor to end |
| `Meta+← →` | Move cursor by word |
| `Ctrl+G` | Edit prompt in external editor |

### **Slash Commands**

#### **Agent & Environment**
- `/init` - Initialize Copilot instructions for repository
- `/agent` - Browse and select available agents
- `/skills` - Manage skills for enhanced capabilities
- `/mcp` - Manage MCP server configuration
- `/plugin` - Manage plugins and plugin marketplaces

#### **Models & Subagents**
- `/model` - Select AI model to use
- `/delegate` - Send session to GitHub for PR creation
- `/fleet` - Enable fleet mode for parallel subagent execution
- `/tasks` - View and manage background tasks

#### **Code Operations**
- `/ide` - Connect to IDE workspace
- `/diff` - Review changes in current directory
- `/pr` - Operate on pull requests for current branch
- `/review` - Run code review agent
- `/lsp` - Manage language server configuration
- `/terminal-setup` - Configure terminal for multiline input

#### **Permissions**
- `/allow-all` - Enable all permissions
- `/add-dir` - Add directory to allowed list
- `/list-dirs` - Display allowed directories
- `/cwd` - Change/show working directory
- `/reset-allowed-tools` - Reset allowed tools list

#### **Session Management**
- `/resume` - Switch to different session
- `/rename` - Rename current session
- `/context` - Show context window usage
- `/usage` - Display session usage metrics
- `/session` - View and manage sessions
- `/compact` - Summarize conversation history
- `/share` - Share session to markdown/HTML/gist
- `/copy` - Copy last response to clipboard
- `/rewind` - Rewind last turn and revert changes

#### **Help & Feedback**
- `/help` - Show help for commands
- `/changelog` - Display changelog
- `/feedback` - Provide feedback
- `/theme` - View/set color mode
- `/update` - Update CLI to latest version
- `/version` - Display version information
- `/experimental` - Manage experimental features
- `/clear` - Start fresh session
- `/instructions` - View/toggle custom instruction files

## ⚙️ Advanced Configuration

### **LSP Server Setup**
GitHub Copilot CLI supports Language Server Protocol for enhanced code intelligence.

#### **Installing Language Servers**
```bash
# TypeScript
npm install -g typescript-language-server

# Python
pip install python-lsp-server

# Go
go install golang.org/x/tools/gopls@latest
```

#### **Configuration Files**
**User-level:** `~/.copilot/lsp-config.json`
**Repository-level:** `.github/lsp.json`

#### **Example LSP Configuration**
```json
{
  "lspServers": {
    "typescript": {
      "command": "typescript-language-server",
      "args": ["--stdio"],
      "fileExtensions": {
        ".ts": "typescript",
        ".tsx": "typescript"
      }
    },
    "python": {
      "command": "pylsp",
      "args": [],
      "fileExtensions": {
        ".py": "python"
      }
    }
  }
}
```

#### **Check LSP Status**
Use `/lsp` command in interactive session to view configured servers.

### **Custom Instructions**
Copilot respects instructions from these locations:
- `CLAUDE.md`
- `GEMINI.md` 
- `AGENTS.md` (in git root & cwd)
- `.github/instructions/**/*.instructions.md`
- `.github/copilot-instructions.md`
- `$HOME/.copilot/copilot-instructions.md`
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` (env var for additional directories)

## 🧪 Experimental Features

### **Enabling Experimental Mode**
```bash
# Launch with flag
copilot --experimental

# Or use command after launch
/experimental
```

### **Autopilot Mode**
- New mode accessible via `Shift+Tab`
- Encourages agent to continue working until task completion
- Autonomous operation with minimal user intervention

## 💡 Best Practices

### **Effective Usage Patterns**
1. **Start in project directory** - Launch Copilot where your code lives
2. **Use @ mentions** - Include relevant files in context
3. **Be specific** - Clear, detailed requests get better results
4. **Preview before execution** - Always review proposed changes
5. **Leverage slash commands** - Use built-in functionality efficiently

### **Workflow Integration**
1. **Code Review Workflow**
   ```bash
   /diff          # Review changes
   /review        # Run code review agent
   /pr            # Create/manage pull request
   ```

2. **Development Workflow**
   ```bash
   /plan          # Create implementation plan
   @file.js       # Include context files
   # Implement features
   /tasks         # Manage background processes
   ```

3. **Debugging Workflow**
   ```bash
   /ide           # Connect IDE for enhanced debugging
   /lsp           # Ensure language servers are configured
   # Use natural language to describe issues
   ```

### **Performance Tips**
- Use `/compact` to reduce context window usage
- Leverage `/fleet` for parallel operations
- Configure LSP servers for better code intelligence
- Use specific file mentions (@) rather than broad directory scans

## 🔒 Security & Permissions

### **Permission Model**
- Explicit approval required for all actions
- Granular directory and tool permissions
- Reset capabilities for security concerns

### **Enterprise Considerations**
- Organization/enterprise administrators can disable CLI access
- Respects existing GitHub security policies
- Audit trail through session management

## 📊 Usage & Monitoring

### **Quota Management**
- Each prompt reduces monthly premium request quota by one
- Monitor usage via `/usage` command
- Plan accordingly for team usage

### **Session Management**
- Sessions persist across CLI restarts
- Use `/resume` to switch between sessions
- Share sessions via `/share` for collaboration

## 🆘 Troubleshooting

### **Common Issues**
1. **Authentication Problems**
   - Use `/login` to re-authenticate
   - Verify PAT permissions if using token auth
   - Check organization/enterprise settings

2. **LSP Server Issues**
   - Verify server installation: `which typescript-language-server`
   - Check configuration syntax in LSP config files
   - Use `/lsp` to diagnose server status

3. **Performance Issues**
   - Use `/compact` to reduce context size
   - Restart with `/restart` if CLI becomes unresponsive
   - Check `/usage` for quota limitations

### **Getting Help**
- Use `/help` for command reference
- Submit feedback via `/feedback`
- Check changelog with `/changelog`
- Visit [official documentation](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)

## 🔄 Updates & Maintenance

### **Staying Current**
- Use `/update` to check for and install updates
- Enable experimental mode for early access to features
- Follow changelog for feature announcements

### **Version Information**
```bash
/version          # Check current version
/changelog        # View recent changes
/experimental     # Access cutting-edge features
```

## 🎯 Use Cases & Examples

### **Code Generation**
```
Generate a REST API endpoint for user authentication with JWT tokens
```

### **Debugging**
```
@app.js Help me debug why the Express server isn't starting
```

### **Code Review**
```
/diff
/review
Analyze these changes for potential security issues
```

### **Project Setup**
```
Set up a new Node.js project with Express, TypeScript, and Jest testing
```

### **Refactoring**
```
@utils.js Refactor this utility module to use modern ES6+ syntax
```

## 📚 Additional Resources

- [Official Documentation](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)
- [GitHub Copilot Plans](https://github.com/features/copilot/plans)
- [Community Discussions](https://github.com/github/copilot-cli/discussions)
- [Issue Tracker](https://github.com/github/copilot-cli/issues)

---

*Happy coding with GitHub Copilot CLI! 🚀*