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
		vscode.commands.registerCommand('clinerules.manageRuleBank', async () => {
			const rules = await ruleManager.getAllRules(true);
			RulePanel.show(context, rules, true);
		}),

		vscode.commands.registerCommand('clinerules.addRuleFromBank', async (ruleId?: string) => {
			try {
				const projectConfig = ruleManager.getProjectRuleConfig();

				let selectedRuleId = ruleId;
				if (!selectedRuleId) {
					const rules = await ruleManager.getAllRules(true);
					const selectedRule = await vscode.window.showQuickPick(
						rules.map(rule => ({
							label: rule.name,
							description: rule.description,
							id: rule.id
						})), {
							placeHolder: 'Select a rule from the bank to add to the project',
						}
					);
					if (!selectedRule) return;
					selectedRuleId = selectedRule.id;
				}
				
				const rule = (await ruleManager.getAllRules(true)).find(r => r.id === selectedRuleId);
				if (!rule) {
					vscode.window.showErrorMessage(`Rule with id ${selectedRuleId} not found in bank.`);
					return;
				}

				const bankPath = ruleManager.getRuleBankPath();
				const sourcePathMd = path.join(bankPath, `${selectedRuleId}.md`);
				const sourcePathDir = path.join(bankPath, selectedRuleId, '.clinerules');
				
				let sourceRulePath;
				if (fs.existsSync(sourcePathMd)) {
					sourceRulePath = sourcePathMd;
				} else if (fs.existsSync(sourcePathDir)) {
					sourceRulePath = sourcePathDir;
				} else {
					// Fallback for built-in rules from the extension's own 'rules' dir
					const builtinPath = path.join(context.extensionPath, 'rules', selectedRuleId, '.clinerules');
					if (fs.existsSync(builtinPath)) {
						sourceRulePath = builtinPath;
					} else {
						vscode.window.showErrorMessage(`Could not find rule file for "${rule.name}" in the rule bank.`);
						return;
					}
				}
				
				if (projectConfig.type === 'dir') {
					const targetRulesDir = path.join(projectConfig.path, 'rules');
					if (!fs.existsSync(targetRulesDir)) {
						fs.mkdirSync(targetRulesDir, { recursive: true });
					}
					const targetRulePath = path.join(targetRulesDir, `${path.basename(rule.name)}.md`);
	
					if(fs.existsSync(targetRulePath)) {
						vscode.window.showErrorMessage(`Rule "${rule.name}" already exists in the project.`);
						return;
					}
	
					fs.copyFileSync(sourceRulePath, targetRulePath);
					vscode.window.showInformationMessage(`Successfully added rule "${rule.name}" to the project.`);
				} else { // Handles 'file' and 'none'
					const targetPath = projectConfig.type === 'file' ? projectConfig.path : path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, '.clinerules');
					const sourceContent = fs.readFileSync(sourceRulePath, 'utf8');

					if (fs.existsSync(targetPath)) {
						const targetContent = fs.readFileSync(targetPath, 'utf8');
						const mergedContent = `${targetContent}\n\n# From Rule Bank: ${rule.name}\n\n${sourceContent}`;
						fs.writeFileSync(targetPath, mergedContent);
						vscode.window.showInformationMessage(`Successfully merged rule "${rule.name}" into .clinerules file.`);
					} else {
						fs.writeFileSync(targetPath, sourceContent);
						vscode.window.showInformationMessage(`Successfully created .clinerules file with rule "${rule.name}".`);
					}
				}

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to add rule from bank: ${error}`);
			}
		}),

		vscode.commands.registerCommand('clinerules.createRule', async () => {
			try {
				const name = await vscode.window.showInputBox({
					prompt: 'Enter new project rule name',
					placeHolder: 'e.g.: my-custom-rule'
				});
				if (!name) return;

				const description = await vscode.window.showInputBox({
					prompt: 'Enter rule description',
					placeHolder: 'e.g.: A custom rule for my project'
				});
				if (!description) return;

				await ruleManager.createRule(name, description, false);

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to create rule: ${error}`);
			}
		}),

		vscode.commands.registerCommand('clinerules.editRule', async (args) => {
			try {
				let id = args?.id;
				let fromBank = args?.fromBank;
				
				if (id === undefined) {
					const scope = await vscode.window.showQuickPick(['Project Rule', 'Rule Bank'], { placeHolder: 'Select rule scope to edit' });
					if (!scope) return;
					fromBank = scope === 'Rule Bank';
	
					const rules = await ruleManager.getAllRules(fromBank);
					if (rules.length === 0) {
						vscode.window.showInformationMessage('No rules found in this scope.');
						return;
					}
					const selectedRule = await vscode.window.showQuickPick(
						rules.map(rule => ({ label: rule.name, description: rule.description, id: rule.id })),
						{ placeHolder: 'Select a rule to edit' }
					);
					if (!selectedRule) return;
					id = selectedRule.id;
				}

				await ruleManager.editRule(id, fromBank);

			} catch (error) {
				vscode.window.showErrorMessage(`Failed to edit rule: ${error}`);
			}
		}),

		vscode.commands.registerCommand('clinerules.deleteRule', async (args) => {
			try {
				let id = args?.id;
				let fromBank = args?.fromBank;

				if (id === undefined) {
					const scope = await vscode.window.showQuickPick(['Project Rule', 'Rule Bank'], { placeHolder: 'Select rule scope to delete' });
					if (!scope) return;
					fromBank = scope === 'Rule Bank';

					const rules = await ruleManager.getAllRules(fromBank);
					if (rules.length === 0) {
						vscode.window.showInformationMessage('No rules found in this scope.');
						return;
					}
					const selectedRule = await vscode.window.showQuickPick(
						rules.map(rule => ({ label: rule.name, description: rule.description, id: rule.id })),
						{ placeHolder: 'Select rule to delete' }
					);
					if (!selectedRule) return;
					id = selectedRule.id;
				}
				
				const ruleName = (await ruleManager.getAllRules(fromBank)).find(r => r.id === id)?.name || id;
				const confirmed = await confirmAction(`Are you sure you want to delete the rule "${ruleName}"?`);
				if (confirmed) {
					await ruleManager.deleteRule(id, fromBank);
				}
			} catch (error) {
				vscode.window.showErrorMessage(`Failed to delete rule: ${error}`);
			}
		})
	];

	disposables.push(
		vscode.commands.registerCommand('clinerules.openRuleBankDirectory', () => {
			const bankPath = ruleManager.getRuleBankPath();
			vscode.env.openExternal(vscode.Uri.file(bankPath));
		})
	);

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

async function confirmAction(message: string): Promise<boolean> {
	const result = await vscode.window.showWarningMessage(
		message,
		{ modal: true },
		'Confirm'
	);
	return result === 'Confirm';
}

// This method is called when your extension is deactivated
export function deactivate() {}
