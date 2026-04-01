# Getting Started with GitHub Copilot CLI
- Welcome to the GitHub Copilot CLI guide! This document will help you set up and start using the GitHub Copilot CLI extension to enhance your command-line experience.
[GitHub Copilot CLI for Beginners](https://github.com/github/copilot-cli-for-beginners)

Install the GitHub Copilot CLI
To install the GitHub Copilot CLI, follow these steps:
1. Open your terminal.
2. Run the following command to install the extension:
```bash
npm install -g @github/copilot-cli
```
3. After installation, you can verify that the extension is installed by running:
```bash
copilot --version
```
Authenticate with GitHub
Before you can start using the GitHub Copilot CLI, you need to authenticate with your Git
Hub account. Run the following command to authenticate:
```bash
copilot auth login
```
This will open a browser window where you can log in to your GitHub account and authorize the
Copilot CLI extension.

```bash
copilot tell me about the lyout of this project
```
- /update
- what process is using port 8080
- /model claude-sonnet-4.5 - to change model
- /agent - to change the agent
- @ ./github/...md ask to explain about that file
- /mcp
- /mcp add

- To get help with a specific command, you can use the `copilot help` command
```bash
copilot help git
```
- You can also use the `copilot explain` command to get explanations for commands or concepts
```bash
copilot explain git rebase
```
- For more advanced usage, you can explore the various options and features of the Copilot CLI by running:
```bash
copilot --help
```
This will provide you with a list of available commands and options to customize your experience.

**Conclusion**
The GitHub Copilot CLI is a powerful tool that brings AI assistance to your command-line workflow. By following the steps outlined in this guide, you can quickly set up and start using the extension
to enhance your productivity and get help with your command-line tasks. Happy coding!



