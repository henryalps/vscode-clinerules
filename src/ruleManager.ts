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
    private ruleBankPath: string;
    private configPath: string;
    private config: ConfigFile = {
        version: "1.0.0",
        lastUpdate: new Date().toISOString(),
        categories: []
    };

    constructor(private context: vscode.ExtensionContext) {
        this.ruleBankPath = ''; // Initialize with empty string
        this.configPath = '';
        this.refreshFromConfig();
    }

    public refreshFromConfig() {
        const config = vscode.workspace.getConfiguration('clinerules');
        const configPathSetting = config.get('ruleBankPath') as string | undefined;

        const newRuleBankPath = (configPathSetting || path.join(os.homedir(), '.cline-rules')).replace(/^~/, os.homedir());

        if (this.ruleBankPath !== newRuleBankPath || !fs.existsSync(newRuleBankPath)) {
            this.ruleBankPath = newRuleBankPath;
            this.configPath = path.join(this.ruleBankPath, 'config.json');
            this.initializeRuleBank();
        }
    }

    private initializeRuleBank() {
        if (!fs.existsSync(this.ruleBankPath)) {
            fs.mkdirSync(this.ruleBankPath, { recursive: true });
            this.copyBuiltinRules();
        }

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
            this.copyFolderRecursive(builtinRulesPath, this.ruleBankPath);
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
                },
                {
                    id: "mcp-chat-history",
                    name: "MCP - Chat History Recorder",
                    description: "Enforces the mandatory use of the `record_chat_history` tool before completing any task to ensure all interactions are logged.",
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

    private scanAndSyncRules(dir: string, baseDir: string): boolean {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        let configUpdated = false;

        for (const entry of entries) {
            const entryPath = path.join(dir, entry.name);
            if (entry.name === 'config.json' || entry.name.startsWith('.')) continue;

            if (entry.isDirectory()) {
                // It's a directory, check for a .clinerules file inside (old format)
                const ruleFilePath = path.join(entryPath, '.clinerules');
                if (fs.existsSync(ruleFilePath)) {
                    const id = path.relative(baseDir, entryPath);
                    if (!this.config.categories.some(c => c.id === id)) {
                        this.config.categories.push({
                            id: id, name: id, description: '', isBuiltin: false, isModified: true,
                            lastModified: new Date().toISOString()
                        });
                        configUpdated = true;
                    }
                } else {
                    // Otherwise, recurse into the directory
                    configUpdated = this.scanAndSyncRules(entryPath, baseDir) || configUpdated;
                }
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                // It's a markdown file (new format)
                const id = path.relative(baseDir, entryPath).replace(/\.md$/, '');
                 if (!this.config.categories.some(c => c.id === id)) {
                    this.config.categories.push({
                        id: id, name: id, description: '', isBuiltin: false, isModified: true,
                        lastModified: new Date().toISOString()
                    });
                    configUpdated = true;
                }
            }
        }
        return configUpdated;
    }

    async getAllRules(fromBank: boolean = false): Promise<RuleCategory[]> {
        if (fromBank) {
            const configUpdated = this.scanAndSyncRules(this.ruleBankPath, this.ruleBankPath);
            if (configUpdated) {
                this.saveConfig();
            }
            return this.config.categories;
        }
        
        const projectConfig = this.getProjectRuleConfig();
        if (projectConfig.type === 'dir') {
            const rulesDir = path.join(projectConfig.path, 'rules');
            if (!fs.existsSync(rulesDir)) {
                return [];
            }
            const ruleFiles = fs.readdirSync(rulesDir).filter(file => file.endsWith('.md'));
            return ruleFiles.map(file => {
                const ruleName = path.basename(file, '.md');
                return {
                    id: ruleName,
                    name: ruleName,
                    description: `Project Rule: ${ruleName}`,
                    isBuiltin: false,
                    isModified: false,
                    lastModified: new Date().toISOString()
                };
            });
        } else if (projectConfig.type === 'file') {
            return [{
                id: 'legacy_rule',
                name: '.clinerules file',
                description: 'Legacy single rule file.',
                isBuiltin: false,
                isModified: false,
                lastModified: new Date().toISOString()
            }];
        }
        return [];
    }

    async createRule(name: string, description: string, inBank: boolean = false): Promise<void> {
        const id = this.generateRuleId(name);
        let ruleFilePath;

        if (inBank) {
            const rulePath = path.join(this.ruleBankPath, id);
            fs.mkdirSync(rulePath, { recursive: true });
            ruleFilePath = path.join(rulePath, '.clinerules');
            
            this.config.categories.push({
                id, name, description, isBuiltin: false, isModified: true,
                lastModified: new Date().toISOString()
            });
            this.saveConfig();
            
            const templatePath = path.join(this.context.extensionPath, 'rules', 'Preset', '.clinerules-best-practices.md');
            if (fs.existsSync(templatePath)) {
                fs.copyFileSync(templatePath, ruleFilePath);
            } else {
                fs.writeFileSync(ruleFilePath, `# Role\n# Goal\n`);
            }
        } else {
            const projectConfig = this.getProjectRuleConfig();
            if (projectConfig.type === 'dir') {
                const rulePath = path.join(projectConfig.path, 'rules');
                if (!fs.existsSync(rulePath)) fs.mkdirSync(rulePath, { recursive: true });
                ruleFilePath = path.join(rulePath, `${name}.md`);

                const templatePath = path.join(this.context.extensionPath, 'rules', 'Preset', '.clinerules-best-practices.md');
                 if (fs.existsSync(templatePath)) {
                    fs.copyFileSync(templatePath, ruleFilePath);
                } else {
                    fs.writeFileSync(ruleFilePath, `# Role\n# Goal\n`);
                }
            } else { // Handles 'file' and 'none' cases
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (!workspaceFolders) {
                    vscode.window.showErrorMessage("No workspace folder open.");
                    return;
                }
                ruleFilePath = path.join(workspaceFolders[0].uri.fsPath, '.clinerules');
                const newRuleContent = `\n\n# Rule: ${name}\n# Description: ${description}\n\n# Role\n\n# Goal\n\n---`;
                
                if (fs.existsSync(ruleFilePath)) {
                    fs.appendFileSync(ruleFilePath, newRuleContent);
                } else {
                    fs.writeFileSync(ruleFilePath, newRuleContent.trim());
                }
            }
        }

        vscode.window.showInformationMessage(`Successfully created rule: ${name}`);
        const doc = await vscode.workspace.openTextDocument(ruleFilePath);
        await vscode.window.showTextDocument(doc);
    }

    public getProjectRuleConfig(): { type: 'dir' | 'file' | 'none', path: string } {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return { type: 'none', path: '' };
        }
        const workspacePath = workspaceFolders[0].uri.fsPath;
        
        const rooPath = path.join(workspacePath, '.roo');
        const clinePath = path.join(workspacePath, '.clinerules');

        if (fs.existsSync(clinePath) && fs.statSync(clinePath).isDirectory()) {
            return { type: 'dir', path: clinePath };
        }
        if (fs.existsSync(rooPath) && fs.statSync(rooPath).isDirectory()) {
            return { type: 'dir', path: rooPath };
        }

        const legacyFilePath = path.join(workspacePath, '.clinerules');
        if (fs.existsSync(legacyFilePath) && fs.statSync(legacyFilePath).isFile()) {
            return { type: 'file', path: legacyFilePath };
        }

        return { type: 'none', path: workspacePath };
    }

    async editRule(id: string, fromBank: boolean = false): Promise<void> {
        let rulePath;

        if (fromBank) {
            const rule = this.config.categories.find(r => r.id === id);
            if (!rule) throw new Error('Rule not found');
            const potentialDirPath = path.join(this.ruleBankPath, rule.id, '.clinerules');
            const potentialFilePath = path.join(this.ruleBankPath, `${rule.id}.md`);
            if (fs.existsSync(potentialDirPath)) {
                rulePath = potentialDirPath;
            } else if (fs.existsSync(potentialFilePath)) {
                rulePath = potentialFilePath;
            } else {
                 vscode.window.showErrorMessage('Rule file not found in bank.');
                 return;
            }
        } else {
            const projectConfig = this.getProjectRuleConfig();
            if (projectConfig.type === 'dir') {
                rulePath = path.join(projectConfig.path, 'rules', `${id}.md`);
            } else if (projectConfig.type === 'file') {
                rulePath = projectConfig.path;
            } else {
                vscode.window.showErrorMessage('No project rule found to edit.');
                return;
            }
        }

        if (!fs.existsSync(rulePath) && fromBank) {
            const rule = this.config.categories.find(r => r.id === id);
            if (rule && rule.isBuiltin && !rule.isModified) {
                const builtinPath = path.join(this.context.extensionPath, 'rules', rule.id, '.clinerules');
                if (fs.existsSync(builtinPath)) {
                    fs.copyFileSync(builtinPath, rulePath);
                }
                rule.isModified = true;
                rule.lastModified = new Date().toISOString();
                this.saveConfig();
            } else {
                vscode.window.showErrorMessage('Rule file not found.');
                return;
            }
        } else if (!fs.existsSync(rulePath)) {
            vscode.window.showErrorMessage('Rule file not found.');
            return;
        }

        const doc = await vscode.workspace.openTextDocument(rulePath);
        await vscode.window.showTextDocument(doc);
    }

    async deleteRule(id: string, fromBank: boolean = false): Promise<void> {
        if (fromBank) {
            const ruleIndex = this.config.categories.findIndex(r => r.id === id);
            if (ruleIndex === -1) {
                vscode.window.showErrorMessage("Rule not found in config.");
                return;
            };
            const rule = this.config.categories[ruleIndex];
            const rulePath = path.join(this.ruleBankPath, rule.id);
            if (fs.existsSync(rulePath)) {
                fs.rmSync(rulePath, { recursive: true });
            }
            this.config.categories.splice(ruleIndex, 1);
            this.saveConfig();
        } else {
            const projectConfig = this.getProjectRuleConfig();
             if (projectConfig.type === 'dir') {
                const ruleFilePath = path.join(projectConfig.path, 'rules', `${id}.md`);
                if (fs.existsSync(ruleFilePath)) {
                    fs.unlinkSync(ruleFilePath);
                } else {
                    vscode.window.showErrorMessage(`Rule "${id}" not found.`);
                    return;
                }
            } else if (projectConfig.type === 'file') {
                 vscode.window.showErrorMessage('Cannot delete the legacy .clinerules file via this command.');
                 return;
            } else {
                vscode.window.showErrorMessage('No project rule found to delete.');
                return;
            }
        }
        vscode.window.showInformationMessage(`Successfully deleted rule: ${id}`);
    }

    private generateRuleId(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    public getRuleBankPath(): string {
        return this.ruleBankPath;
    }
}