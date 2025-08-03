# Cline Rules

This is a VSCode plugin to help you quickly configure rules for the Cline / Roo AI programming assistant. With this plugin, you can easily add preset AI assistant rule files to your projects.

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
- Convenient rule management:

  - Rule Merging: Supports merging with existing rules
  - Rule Overwriting: Option to overwrite existing rules

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

### Method 1: Command Palette

1. Open your project folder in VSCode
2. Open the command palette using `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Enter "Cline" or "Roo"
4. Select the desired rule type from the list
5. Confirm adding the rule

### Method 2: Right-Click Menu

1. In the VSCode Explorer
2. Right-click on any folder
3. Select "Clinerules: Add Cline/Roo .clinerules file"
4. Select the rule type and confirm

If a `.clinerules` file already exists at the target location, the plugin will provide the following options:

- Overwrite: Replace existing rules with new rules
- Merge: Merge new rules with existing rules
- Cancel: Keep existing rules unchanged

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

Currently, the plugin does not require special configuration and can be used after installation.

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
