# Cline Rules

This is a VSCode plugin to help you quickly configure rules for the Cline / Roo AI programming assistant. It supports managing rules in a project-specific `.clinerules/` or `.roo/` directory, as well as a central "Rule Bank" for templates.

[中文文档](README-cn.md)

## Features

- Provides a variety of preset Cline AI rule configurations, including:

  - Local Development
    - python: Python development rules
  - Website Development
    - HTML: HTML/CSS/JavaScript
    - React: React development rules
    - Vue: Vue.js development rules
  - Backend Development
    - Spring Boot: Spring Boot application development rules
    - Django: Django web framework development rules
    - Ruby on Rails: Ruby on Rails web application development rules
    - Laravel: Laravel PHP web framework development rules
    - Express.js: Express.js Node.js web framework development rules
  - MCP
    - MCP - Chat History Recorder: Enforces the mandatory use of the [`record_chat_history`](https://github.com/henryalps/chat-history-recorder-mcp) tool.
  - Mobile Development
    - App Development - iOS: iOS application development
    - App Development - Android: Android development
  - Mini Program Development
    - WeChat Mini Program: Mini program development rules
  - Browser Extension
    - Chrome Extension: Browser extension development
  - General Rules
    - General: Basic rules applicable to all projects
- **Flexible Rule Management**:
  - **Project Rules**: Manage rules directly within your project in a `.clinerules/rules` or `.roo/rules` directory.
  - **Rule Bank**: Use a central repository of rule templates that you can add to any project.
  - **Create and Edit**: Easily create new project-specific rules or edit existing ones.
- **Easy Setup**: If no rule directory exists, the extension will offer to create one for you.

## Customizing Rules for MCP Tools

You can create or modify `.clinerules` files to define specific behaviors for MCP (Model Context Protocol) tools. This allows you to enforce certain actions or provide specific instructions to the AI assistant when using these tools.
For example, you can use the built-in `"mcp-chat-history"` rule (`MCP - Chat History Recorder`) to ensure the [`record_chat_history`](https://github.com/henryalps/chat-history-recorder-mcp) tool is always called before completing a task. The rule contains the following logic:


```
# Execution Protocol

**ACTIVATION CONDITION:**
This protocol is only active if the `record_chat_history` tool is available in the current environment.

**PRIMARY DIRECTIVE: The `record_chat_history` tool is MANDATORY before any concluding action.**
```

This helps in reminding the AI assistant to perform necessary actions, improving reliability and consistency.

## Usage

### Managing Project Rules

- **Add Rule from Bank**:
  - Right-click in the Explorer and select **Cline Rules: Add Project Rule from Bank**.
  - Or run the command from the Command Palette.
  - This will present a list of rules from your Rule Bank to copy into your project's `.clinerules/rules` or `.roo/rules` directory.
- **New Project Rule**:
  - Run **Cline Rules: New Project Rule** from the Command Palette to create a new, empty rule file in your project.
- **Edit/Delete Project Rule**:
  - Run **Cline Rules: Edit Rule** or **Cline Rules: Delete Rule** and select "Project Rule" to manage your project-specific rules.

### Managing the Rule Bank

- Open the Command Palette (`Ctrl/Cmd+Shift+P`) and run **Cline Rules: Manage Rule Bank**.
- This will open a panel where you can:
  - Add a rule from the bank to your current project.
  - Edit a rule template.
  - Delete a rule template (custom rules only).

## Rule Descriptions

Each type of rule is carefully designed to provide the best AI-assisted programming experience:

### Local Development Rules

- **Python**: Complies with PEP 8 specifications and includes best practice guidelines

### Website Development Rules

- **HTML/CSS/JavaScript**: Modern website development standards and best practices
- **React**: Development specifications and recommendations for the React ecosystem
- **Vue**: Development specifications and best practices for Vue.js projects
- **Next.js**: Server-side rendering and modern React development guidelines

### Backend Development Rules

- **Spring Boot**: Best practices for building robust Java applications with Spring Boot.
- **Django**: Guidelines for developing web applications with the Django framework.
- **Ruby on Rails**: Conventions and best practices for Rails development.
- **Laravel**: Best practices for modern PHP web development with Laravel.
- **Express.js**: Guidelines for building APIs and web applications with Express.js on Node.js.

### Mobile Development Rules

- **iOS**: Swift and SwiftUI development specifications, compliant with Apple Design Guidelines
- **Android**: Kotlin development specifications and Material Design guidelines

### Mini Program Development Rules

- **WeChat Mini Program**: Complies with WeChat Mini Program development specifications and best practices

### Browser Extension Rules

- **Chrome Extension**: Chrome extension development specifications and best practices

### General Rules

- Basic development specifications and AI collaboration guidelines applicable to all projects

## Installation Requirements

- VSCode version 1.93.0 or higher
- Cline editor needs to be used in the project

## Plugin Settings

You can customize the path to your "Rule Bank" by setting the `clinerules.ruleBankPath` in your VSCode settings. If not set, it defaults to `~/.cline-rules`.

```json
{
  "clinerules.ruleBankPath": "/path/to/your/custom/rules/bank"
}
```

## Common Issues

1. **Rule file cannot be added?**

   - Make sure you have opened a project folder
   - Check if you have file write permissions
2. **Rule preview failed to display?**

   - Try reinstalling the plugin
   - Ensure your VSCode version meets the requirements
3. **Cannot find the option to add rules?**

   - Make sure to open the command palette using `Cmd/Ctrl+Shift+P`
   - Enter "Cline" to quickly find commands
   - Or find commands by right-clicking on a folder

## Changelog

### 0.0.4

- **Enhancement**: The extension now prioritizes a `.clinerules/` or `.roo/` directory for managing rules. The traditional single `.clinerules` file in the root is now used as a fallback for backward compatibility.
- **Feature**: Introduced the "Rule Bank" concept, a central location for storing rule templates.
- **Feature**: Commands are updated to distinguish between project rules and the rule bank.
- **Feature**: Added a configuration setting `clinerules.ruleBankPath` to customize the rule bank location.
- **Enhancement**: Improved command names and UI text for better clarity.

### 0.0.3

- Added new rules for backend frameworks: Spring Boot, Django, Ruby on Rails, Laravel, and Express.js.
- Added a new rule category for MCP tools, including a rule to enforce the use of the `record_chat_history` tool.
- Updated documentation to reflect the new rules and provide examples for customizing MCP tool behavior.

### 0.0.2

- Published to vscode and open-vsx

### 0.0.1

- Initial version released

## Contribution Guide

Welcome to submit Issues and Pull Requests to help improve this plugin.

## License

MIT
