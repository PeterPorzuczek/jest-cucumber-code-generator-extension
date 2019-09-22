import 
	* as vscode
	from 'vscode';
import
	generator
	from './modules/generator';

const commandsGenerated = 'Commands are in clipboard!';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		'extension.generateCodeFromFeature',
		run
	);
	context.subscriptions.push(disposable);
}
function run() {
	if (vscode.window.activeTextEditor) {
		const editor = vscode.window.activeTextEditor;
		const documentText = editor.document.getText();
		const selectionInformation =
			createSelectionLinesInformation(editor);
		try {
			const commands =
				generator.generateCommandsFromFeatureAsText(
					documentText,
					selectionInformation
				);
			vscode.env.clipboard.writeText(commands);
			vscode.window.showInformationMessage(commandsGenerated);
		} catch (error) {
			vscode.window.showErrorMessage(error.message);
		}
		
	}
}
function createSelectionLinesInformation(editor) {
	return {
		count: editor.document.lineCount,
		start: editor.selection.start.line + 1,
		end: editor.selection.end.line + 1,
		text: editor.document.getText(
			editor.selection
		)
	};
}