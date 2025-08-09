import * as vscode from 'vscode';

export class RulePanel {
    public static currentPanel: RulePanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, rules: any[], isBank: boolean) {
        this._panel = panel;
        this._panel.webview.html = this._getWebviewContent(rules, isBank);

        this._panel.webview.onDidReceiveMessage(
            async message => {
                const { command, ruleId } = message;
                if (isBank) {
                    switch (command) {
                        case 'addRule':
                            await vscode.commands.executeCommand('clinerules.addRuleFromBank', ruleId);
                            break;
                        case 'editRule':
                            await vscode.commands.executeCommand('clinerules.editRule', { id: ruleId, fromBank: true });
                            break;
                        case 'deleteRule':
                            await vscode.commands.executeCommand('clinerules.deleteRule', { id: ruleId, fromBank: true });
                            break;
                        case 'openBank':
                            await vscode.commands.executeCommand('clinerules.openRuleBankDirectory');
                            break;
                        case 'refreshBank':
                            this.dispose();
                            await vscode.commands.executeCommand('clinerules.manageRuleBank');
                            break;
                    }
                } else {
                    switch (command) {
                        case 'editRule':
                            await vscode.commands.executeCommand('clinerules.editRule', { id: ruleId, fromBank: false });
                            break;
                        case 'deleteRule':
                            await vscode.commands.executeCommand('clinerules.deleteRule', { id: ruleId, fromBank: false });
                            break;
                    }
                }
            },
            undefined,
            this._disposables
        );

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static show(context: vscode.ExtensionContext, rules: any[], isBank: boolean = false) {
        const title = isBank ? 'Rule Bank Management' : 'Project Rules Management';
        if (RulePanel.currentPanel) {
            RulePanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
            return;
        }

        const panel = vscode.window.createWebviewPanel('clinerules', title, vscode.ViewColumn.One, {
            enableScripts: true,
        });

        RulePanel.currentPanel = new RulePanel(panel, rules, isBank);
    }

    private _getWebviewContent(rules: any[], isBank: boolean) {
        const title = isBank ? 'Rule Bank' : 'Project Rules';
        const bankButtons = isBank ? `
            <div class="bank-actions">
                <button onclick="postMessage('openBank')">Open Directory</button>
                <button onclick="postMessage('refreshBank')">Refresh</button>
            </div>
        ` : '';

        const ruleCards = rules.map(rule => {
            const buttons = isBank
                ? `<button class="add-btn" onclick="postMessage('addRule', '${rule.id}')">Add to Project</button>
                   <button class="edit-btn" onclick="postMessage('editRule', '${rule.id}')">Edit Template</button>
                   <button class="delete-btn" onclick="postMessage('deleteRule', '${rule.id}')">Delete Template</button>`
                : `<button class="edit-btn" onclick="postMessage('editRule', '${rule.id}')">Edit Rule</button>
                   <button class="delete-btn" onclick="postMessage('deleteRule', '${rule.id}')">Delete Rule</button>`;
            return `
                <div class="rule-card">
                    <div class="rule-info">
                        <h3>${rule.name}</h3>
                        <p>${rule.description}</p>
                    </div>
                    <div class="rule-actions">${buttons}</div>
                </div>`;
        }).join('');

        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                /* styles */
                body { padding: 20px; font-family: sans-serif; }
                .bank-actions { margin-bottom: 20px; display: flex; gap: 10px; }
                .rule-card { border: 1px solid #ccc; margin: 10px 0; padding: 15px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; }
                .rule-info { flex: 1; }
                .rule-actions { display: flex; gap: 10px; }
                button { padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; }
                .add-btn { background: #007acc; color: white; }
                .edit-btn { background: #4CAF50; color: white; }
                .delete-btn { background: #f44336; color: white; }
            </style>
        </head>
        <body>
            <h2>${title}</h2>
            ${bankButtons}
            <div id="rules-container">${ruleCards}</div>
            <script>
                const vscode = acquireVsCodeApi();
                function postMessage(command, ruleId) {
                    vscode.postMessage({ command, ruleId });
                }
            </script>
        </body>
        </html>`;
    }

    public dispose() {
        RulePanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}