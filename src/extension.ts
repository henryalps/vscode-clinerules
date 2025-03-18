// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { RuleManager } from './ruleManager';
import { RulePanel } from './webview/rulePanel';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Cline Rules extension is now active!');

	// Create rule manager instance
	const ruleManager = new RuleManager(context);

	// Register commands
	let disposables = [
		// Command to refresh rule panel
		vscode.commands.registerCommand('clinerules.manageRule', async (rules?: any[]) => {
			const displayRules = rules || await ruleManager.getAllRules();
			RulePanel.show(context, displayRules);
		}),

		// Original add rules command
		vscode.commands.registerCommand('clinerules.addRules', async (uri?: vscode.Uri) => {
			try {
				// 1. Get target path
				let targetFolder: string;
				if (uri) {
					targetFolder = uri.fsPath;
				} else {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (!workspaceFolders) {
						vscode.window.showErrorMessage('Please open a workspace folder first!');
						return;
					}
					targetFolder = workspaceFolders[0].uri.fsPath;
				}

				// 2. Get all rules
				const rules = await ruleManager.getAllRules();
				
				// 3. Let user select rule
				const selectedRule = await vscode.window.showQuickPick(
					rules.map(rule => ({
						label: rule.name,
						folder: rule.id,
						description: rule.description,
						detail: 'Click to add rule',
						rule: rule
					})), {
						placeHolder: 'Select rule type to add',
					}
				);

				if (!selectedRule) {
					return;
				}

				// 4. Confirm to add
				const confirmed = await confirmAction(`Are you sure to add Cline rule of ${selectedRule.label}?`);
				if (!confirmed) {
					return;
				}

				// 5. Process rule file
				const targetPath = path.join(targetFolder, '.clinerules');
				const sourcePath = path.join(context.extensionPath, 'rules', selectedRule.folder, '.clinerules');

				if (fs.existsSync(targetPath)) {
					const action = await vscode.window.showWarningMessage(
						'Target directory already has .clinerules file, please select action:',
						'Overwrite',
						'Merge',
						'Cancel'
					);

					if (action === 'Cancel' || !action) {
						return;
					}

					if (action === 'Merge') {
						const sourceContent = fs.readFileSync(sourcePath, 'utf8');
						const targetContent = fs.readFileSync(targetPath, 'utf8');
						const mergedContent = `# Original rules\n${targetContent}\n\n# New rules\n${sourceContent}`;
						fs.writeFileSync(targetPath, mergedContent);
						vscode.window.showInformationMessage(`Successfully merged Cline rule of ${selectedRule.label}!`);
						return;
					}
				}

				fs.copyFileSync(sourcePath, targetPath);
				vscode.window.showInformationMessage(`Successfully added Cline rule of ${selectedRule.label}!`);

				RulePanel.show(context, rules);

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to add rule: ${error}`);
			}
		}),

		// Create new rule command
		vscode.commands.registerCommand('clinerules.createRule', async () => {
			try {
				const name = await vscode.window.showInputBox({
					prompt: 'Enter new rule type name',
					placeHolder: 'e.g.: Java development'
				});

				if (!name) {
					return;
				}

				const description = await vscode.window.showInputBox({
					prompt: 'Enter rule description',
					placeHolder: 'e.g.: Rules for Java backend development'
				});

				if (!description) {
					return;
				}

				await ruleManager.createRule(name, description);
				vscode.window.showInformationMessage(`Successfully created rule type: ${name}`);

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to create rule: ${error}`);
			}
		}),

		// Edit rule command
		vscode.commands.registerCommand('clinerules.editRule', async () => {
			try {
				const rules = await ruleManager.getAllRules();
				const selectedRule = await vscode.window.showQuickPick(
					rules.map(rule => ({
						label: rule.name,
						description: rule.description,
						detail: rule.isBuiltin ? 'Builtin Rule' : 'Custom Rule',
						rule: rule
					})), {
						placeHolder: 'Select rule to edit',
					}
				);

				if (!selectedRule) {
					return;
				}

				await ruleManager.editRule(selectedRule.rule.id);

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to edit rule: ${error}`);
			}
		}),

		// Delete rule command
		vscode.commands.registerCommand('clinerules.deleteRule', async () => {
			try {
				const rules = await ruleManager.getAllRules();
				const customRules = rules;

				if (customRules.length === 0) {
					vscode.window.showInformationMessage('No custom rules can be deleted');
					return;
				}

				const selectedRule = await vscode.window.showQuickPick(
					customRules.map(rule => ({
						label: rule.name,
						description: rule.description,
						detail: 'Click to delete rule',
						rule: rule
					})), {
						placeHolder: 'Select rule to delete',
					}
				);

				if (!selectedRule) {
					return;
				}

				const confirmed = await confirmAction(`Are you sure to delete rule ${selectedRule.label}? This operation cannot be recovered.`);
				if (!confirmed) {
					return;
				}

				await ruleManager.deleteRule(selectedRule.rule.id);
				vscode.window.showInformationMessage(`Successfully deleted rule: ${selectedRule.label}`);

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to delete rule: ${error}`);
			}
		})
	];

	context.subscriptions.push(...disposables);
}

// Get rule file description (read the first few lines of the file as description)
function getRuleDescription(rulePath: string): string {
	try {
		if (fs.existsSync(rulePath)) {
			const content = fs.readFileSync(rulePath, 'utf8');
			const firstLines = content.split('\n').slice(0, 2).join(' ').trim();
			return firstLines || 'No description';
		}
	} catch (error) {
		console.error('Failed to read rule description:', error);
	}
	return 'No description';
}

// Remove showRulePreview function, change to directly display confirmation dialog
async function confirmAction(message: string): Promise<boolean> {
	const result = await vscode.window.showInformationMessage(
		message,
		'Confirm',
		'Cancel'
	);
	return result === 'Confirm';
}

// This method is called when your extension is deactivated
export function deactivate() {
    try {
        const homedir = require('os').homedir();
        const userRulesPath = require('path').join(homedir, '.cline-rules');
        if (require('fs').existsSync(userRulesPath)) {
            require('fs').rmSync(userRulesPath, { recursive: true, force: true });
            console.log('Successfully cleaned up user rules directory');
        }
    } catch (error) {
        console.error('Failed to clean up user rules directory:', error);
    }
}
