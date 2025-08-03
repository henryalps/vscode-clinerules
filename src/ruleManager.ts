import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

interface RuleCategory {
    id: string;
    name: string;
    description: string;
    isBuiltin: boolean;
    isModified: boolean;
    lastModified: string;
}

interface ConfigFile {
    version: string;
    lastUpdate: string;
    categories: RuleCategory[];
}

export class RuleManager {
    private userRulesPath: string;
    private configPath: string;
    private config: ConfigFile = {
        version: "1.0.0",
        lastUpdate: new Date().toISOString(),
        categories: []
    };

    constructor(private context: vscode.ExtensionContext) {
        // 初始化用户规则目录
        this.userRulesPath = path.join(os.homedir(), '.cline-rules');
        this.configPath = path.join(this.userRulesPath, 'config.json');
        this.initializeUserRules();
    }

    private initializeUserRules() {
        // 创建用户规则目录（如果不存在）
        if (!fs.existsSync(this.userRulesPath)) {
            fs.mkdirSync(this.userRulesPath, { recursive: true });
            this.copyBuiltinRules();
        }

        // 加载或创建配置文件
        if (fs.existsSync(this.configPath)) {
            this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        } else {
            this.config = this.createInitialConfig();
            this.saveConfig();
        }
    }

    private copyBuiltinRules() {
        const builtinRulesPath = path.join(this.context.extensionPath, 'rules');
        if (fs.existsSync(builtinRulesPath)) {
            this.copyFolderRecursive(builtinRulesPath, this.userRulesPath);
        }
    }

    private copyFolderRecursive(src: string, dest: string) {
        if (!fs.existsSync(src)) {
            return;
        }

        const stats = fs.statSync(src);
        if (!stats) {
            return;
        }

        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(childItemName => {
                this.copyFolderRecursive(
                    path.join(src, childItemName),
                    path.join(dest, childItemName)
                );
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }

    private createInitialConfig(): ConfigFile {
        return {
            version: "1.0.0",
            lastUpdate: new Date().toISOString(),
            categories: [
                {
                    id: "app-reactnative",
                    name: "App Development - React Native",
                    description: "React Native cross-platform application development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "app-flutter",
                    name: "App Development - Flutter",
                    description: "Flutter cross-platform application development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "app-ios",
                    name: "App Development - iOS",
                    description: "iOS native application development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "app-android",
                    name: "App Development - Android",
                    description: "Android native application development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "web-html",
                    name: "Website - HTML",
                    description: "HTML/CSS/JavaScript website development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "web-react",
                    name: "Website - React",
                    description: "React website development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "web-vue",
                    name: "Website - Vue",
                    description: "Vue.js website development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "web-nextjs",
                    name: "Website - Nextjs",
                    description: "Next.js 14 full-stack development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "chrome-extension",
                    name: "Chrome Extension",
                    description: "Chrome browser extension development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "wechat-miniprogram",
                    name: "WeChat Mini Program",
                    description: "WeChat Mini Program development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "local-python",
                    name: "Local - Python",
                    description: "Python development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "backend-springboot",
                    name: "Backend - Spring Boot",
                    description: "Spring Boot application development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "backend-django",
                    name: "Backend - Django",
                    description: "Django web framework development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "backend-rails",
                    name: "Backend - Ruby on Rails",
                    description: "Ruby on Rails web application development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "backend-laravel",
                    name: "Backend - Laravel",
                    description: "Laravel PHP web framework development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "backend-express",
                    name: "Backend - Express.js",
                    description: "Express.js Node.js web framework development rules",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                },
                {
                    id: "general",
                    name: "General",
                    description: "General development rules, applicable to all projects",
                    isBuiltin: true,
                    isModified: false,
                    lastModified: new Date().toISOString()
                }
            ]
        };
    }

    private saveConfig() {
        fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 4));
    }

    // 获取所有规则
    async getAllRules(): Promise<RuleCategory[]> {
        return this.config.categories;
    }

    // 创建新规则
    async createRule(name: string, description: string): Promise<void> {
        const id = this.generateRuleId(name);
        const rulePath = path.join(this.userRulesPath, id);

        // 创建规则目录
        fs.mkdirSync(rulePath, { recursive: true });

        // 从预设模板创建规则文件
        const ruleFilePath = path.join(rulePath, '.clinerules');
        const templatePath = path.join(this.context.extensionPath, 'rules', 'Preset', '.clinerules-best-practices.md');
        if (fs.existsSync(templatePath)) {
            fs.copyFileSync(templatePath, ruleFilePath);
        } else {
            fs.writeFileSync(ruleFilePath, '# Role\n# Goal\n');
        }

        // 添加到配置
        this.config.categories.push({
            id,
            name,
            description,
            isBuiltin: false,
            isModified: true,
            lastModified: new Date().toISOString()
        });

        this.saveConfig();

        await vscode.commands.executeCommand('clinerules.editRule');
    }

    // 编辑规则
    async editRule(id: string): Promise<void> {
        const rule = this.config.categories.find(r => r.id === id);
        if (!rule) {
            throw new Error('Rule not found');
        }

        const rulePath = path.join(this.userRulesPath, rule.id, '.clinerules');
        const ruleDir = path.dirname(rulePath);

        // 确保规则目录存在
        if (!fs.existsSync(ruleDir)) {
            this.initializeUserRules();
        }
        
        // 如果是内置规则且未修改过，先复制到用户目录
        if (rule.isBuiltin && !rule.isModified) {
            const builtinPath = path.join(this.context.extensionPath, 'rules', rule.id, '.clinerules');
            if (fs.existsSync(builtinPath)) {
                fs.copyFileSync(builtinPath, rulePath);
            }
            rule.isModified = true;
            rule.lastModified = new Date().toISOString();
            this.saveConfig();
        }

        // 打开编辑器
        const doc = await vscode.workspace.openTextDocument(rulePath);
        await vscode.window.showTextDocument(doc);
    }

    // 删除规则
    async deleteRule(id: string): Promise<void> {
        const ruleIndex = this.config.categories.findIndex(r => r.id === id);
        if (ruleIndex === -1) {
            throw new Error('Rule not found');
        }

        const rule = this.config.categories[ruleIndex];
        const rulePath = path.join(this.userRulesPath, rule.id);

        // Delete rule directory
        if (fs.existsSync(rulePath)) {
            fs.rmSync(rulePath, { recursive: true });
        }

        // 从配置中移除
        this.config.categories.splice(ruleIndex, 1);
        this.saveConfig();

        // Refresh Rule Management panel
        const rules = await this.getAllRules();
        await vscode.commands.executeCommand('clinerules.manageRule', rules);
    }

    private generateRuleId(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
}