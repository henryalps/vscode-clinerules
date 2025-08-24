<h1 align="center">Cline Rules</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=ai-henryalps.clinerules" target="_blank">
    <img src="logo.png" alt="Cline Rules Logo" style="width: 10%;">
  </a>
</p>

这是一个帮助你快速配置 Cline / Roo AI 编程助手规则的 VSCode 插件。它支持在项目特定的 `.clinerules/` 或 `.roo/` 目录中管理规则，以及一个用于存放模板的中央“规则银行”。

[English Document](README.md)

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
- **灵活的规则管理**:
  - **项目规则**: 在项目的 `.clinerules/rules` 或 `.roo/rules` 目录中直接管理规则。
  - **规则银行**: 使用一个中央规则模板仓库，你可以将这些模板添加到任何项目中。
  - **创建和编辑**: 轻松创建新的项目特定规则或编辑现有规则。
- **简易设置**: 如果项目中不存在规则目录，插件将提示你创建一个。

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

### 管理项目规则

- **从规则银行添加规则**:
  - 在资源管理器中右键单击并选择 **Cline Rules: Add Project Rule from Bank**。
  - 或从命令面板运行该命令。
  - 这将显示一个来自你的规则银行的规则列表，可将其复制到项目的 `.clinerules/rules` 或 `.roo/rules` 目录中。
- **新建项目规则**:
  - 从命令面板运行 **Cline Rules: New Project Rule**，在你的项目中创建一个新的空规则文件。
- **编辑/删除项目规则**:
  - 运行 **Cline Rules: Edit Rule** 或 **Cline Rules: Delete Rule** 并选择“项目规则”来管理你的项目特定规则。

### 管理规则银行

- 打开命令面板 (`Ctrl/Cmd+Shift+P`) 并运行 **Cline Rules: Manage Rule Bank**。
- 这将打开一个面板，你可以在其中：
  - 将规则银行中的规则添加到当前项目。
  - 编辑规则模板。
  - 删除规则模板（仅限自定义规则）。

## 更新规则银行

官方的 Cline Rules 规则银行现在在一个独立的 Git 仓库中进行管理。要获取最新的更新，你可以从该仓库拉取。

在你的终端中运行以下命令来更新你的本地规则银行（默认位置 `~/.cline-rules`）：

```bash
git clone https://github.com/henryalps/cline-rules.git ~/.cline-rules-temp && cp -r ~/.cline-rules-temp/* ~/.cline-rules/ && rm -rf ~/.cline-rules-temp
```

如果你为规则银行配置了自定义路径，请将 `~/.cline-rules` 替换为你的自定义路径。

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

你可以在 VSCode 设置中通过 `clinerules.ruleBankPath` 来自定义你的“规则银行”路径。如果未设置，则默认为 `~/.cline-rules`。

```json
{
  "clinerules.ruleBankPath": "/path/to/your/custom/rules/bank"
}
```

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

### 0.0.6

- **优化**: 在没有规则配置的项目中创建规则时，插件现在会提示用户创建现代规则目录，并提供一个使用旧版单文件格式的选项。

### 0.0.5

- **修复**: 解决了“管理规则银行”命令在规则银行路径（特别是使用 `~` 的路径）不存在时执行失败的问题。插件现在会按需创建该目录。

### 0.0.4

- **优化**: 插件现在优先使用 `.clinerules/` 或 `.roo/` 目录来管理规则。根目录下的传统单个 `.clinerules` 文件现在作为向后兼容的备选方案。
- **新功能**: 引入“规则银行”概念，一个用于存储规则模板的中央位置。
- **新功能**: 更新了命令，以区分项目规则和规则银行。
- **新功能**: 添加了 `clinerules.ruleBankPath` 配置设置，以自定义规则银行的位置。
- **优化**: 改进了命令名称和 UI 文本，使其更清晰。

### 0.0.3

- 新增后端开发框架规则：Spring Boot、Django、Ruby on Rails、Laravel 和 Express.js。
- 新增 MCP 工具的规则分类，并包含一条规则以强制使用 `record_chat_history` 工具。
- 更新文档以反映新规则，并提供有关自定义 MCP 工具行为的示例。

### 0.0.2

- 发布到 vscode 和 open-vsx

### 0.0.1

- 初始版本发布

## 贡献指南

欢迎提交 Issue 和 Pull Requests 来帮助改进这个插件。

## 许可证

MIT
