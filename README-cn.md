# Cline Rules

这是一个帮助你快速配置 Cline / Roo AI 编程助手规则的 VSCode 插件。通过这个插件，你可以轻松地将预设的 AI 助手规则文件添加到你的项目中。

[English Document](README-en.md)

## 功能特点

- 提供多种预设的 Cline AI 规则配置，包括：

  - 本地开发
    - python：Python 开发规则
  - 网站开发
    - HTML：HTML/CSS/JavaScript
    - React：React 开发规则
    - Vue：Vue.js 开发规则
  - 后端开发
    - Spring Boot: Spring Boot 应用开发规则
    - Django: Django web 框架开发规则
    - Ruby on Rails: Ruby on Rails web 应用开发规则
    - Laravel: Laravel PHP web 框架开发规则
    - Express.js: Express.js Node.js web 框架开发规则
  - MCP
    - MCP - Chat History Recorder: 强制要求使用 [`record_chat_history`](https://github.com/henryalps/chat-history-recorder-mcp) 工具。
  - 移动开发
    - App开发-iOS：iOS 应用开发
    - App开发-Android：Android 开发
  - 小程序开发
    - 微信小程序：小程序开发规则
  - 浏览器插件
    - Chrome插件：浏览器扩展开发
  - 通用规则
    - 通用：适用于所有项目的基础规则
- 便捷的规则管理：

  - 规则合并：支持与已有规则合并
  - 规则覆盖：可以选择覆盖已有规则

## 自定义 MCP 工具规则

您可以创建或修改 `.clinerules` 文件来为 MCP (Model Context Protocol) 工具定义特定行为。这使您可以在使用这些工具时强制执行某些操作或向 AI 助手提供特定指令。
例如，您可以使用内置的 `"mcp-chat-history"` 规则 (`MCP - Chat History Recorder`) 来确保 [`record_chat_history`](https://github.com/henryalps/chat-history-recorder-mcp) 工具总是在完成任务之前被调用。该规则包含以下逻辑：


```
# 执行协议

**激活条件:**
本协议仅在当前环境中 `record_chat_history` 工具可用时激活。

**主要指令: `record_chat_history` 工具在任何结束性操作之前都必须被调用。**
```

这有助于提醒 AI 助手执行必要的操作，从而提高可靠性和一致性。

## 使用方法

### 方式一：命令面板

1. 在 VSCode 中打开你的项目文件夹
2. 使用快捷键 `Ctrl+Shift+P`（Windows）或 `Cmd+Shift+P`（Mac）打开命令面板
3. 输入 "Cline" 或 "Roo"
4. 从列表中选择想要添加的规则类型
5. 确认添加规则

### 方式二：右键菜单

1. 在 VSCode 的资源管理器中
2. 右键点击任意文件夹
3. 选择 "Clinerules: Add Cline/Roo .clinerules file"
4. 选择规则类型并确认

如果目标位置已经存在 `.clinerules` 文件，插件会提供以下选项：

- 覆盖：用新规则替换现有规则
- 合并：将新规则与现有规则合并
- 取消：保持现有规则不变

## 规则说明

每种类型的规则都经过精心设计，以提供最佳的 AI 辅助编程体验：

### 本地开发规则

- **Python**: 符合 PEP 8 规范，包含最佳实践指南

### 网站开发规则

- **HTML/CSS/JavaScript**: 现代网站开发标准和最佳实践
- **React**: React 生态系统的开发规范和建议
- **Vue**: Vue.js 项目的开发规范和最佳实践
- **Next.js**: 服务端渲染和现代 React 开发指南

### 后端开发规则

- **Spring Boot**: 使用 Spring Boot 构建健壮的 Java 应用程序的最佳实践。
- **Django**: 使用 Django 框架开发 Web 应用程序的指南。
- **Ruby on Rails**: Rails 开发的约定和最佳实践。
- **Laravel**: 使用 Laravel 进行现代 PHP Web 开发的最佳实践。
- **Express.js**: 使用 Node.js 上的 Express.js 构建 API 和 Web 应用程序的指南。

### 移动开发规则

- **iOS**: Swift 和 SwiftUI 开发规范，符合 Apple 设计指南
- **Android**: Kotlin 开发规范和 Material Design 指南

### 小程序开发规则

- **微信小程序**: 符合微信小程序开发规范和最佳实践

### 浏览器插件规则

- **Chrome 插件**: Chrome 扩展开发规范和最佳实践

### 通用规则

- 适用于所有项目的基础开发规范和 AI 协作指南

## 安装要求

- VSCode 版本 1.93.0 或更高
- 需要在项目中使用 Cline 编辑器

## 插件设置

目前插件不需要特殊配置，安装后即可使用。

## 常见问题

1. **规则文件无法添加？**

   - 确保你已经打开了一个项目文件夹
   - 检查是否有文件写入权限
2. **规则预览显示失败？**

   - 尝试重新安装插件
   - 确保 VSCode 版本符合要求
3. **找不到添加规则的选项？**

   - 确保使用 `Cmd/Ctrl+Shift+P` 打开命令面板
   - 输入 "Cline" 快速查找命令
   - 或在文件夹上右键查找命令

## 更新日志

### 0.0.2

- 发布到 vscode 和 open-vsx

### 0.0.1

- 初始版本发布

## 贡献指南

欢迎提交 Issue 和 Pull Requests 来帮助改进这个插件。

## 许可证

MIT
