'use strict';

import * as vscode from 'vscode';
import constant from "./constant"
import * as utils from "./utils";
import htmlHendle from "./htmlHendle"
import { BaseLanguageClient } from 'vscode-languageclient';
export function activate(context: vscode.ExtensionContext, client: BaseLanguageClient) {
	// await vscode.commands.executeCommand("editor.action.commentLine")
	vscode.commands.registerTextEditorCommand("extension.EasyCommentsCode", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return }
		const document = editor.document;
		const SupportingFile = { vue: formatVue, wxml: formatWxml }[document.languageId] || null
		if (!SupportingFile) { // Keep the default effect
			vscode.commands.executeCommand("editor.action.commentLine"); return
		}
		const { start: { line: textStartLine }, end: { line: textEndLine } } = editor.selection;
		const startPos = new vscode.Position(textStartLine, 0);
		const endPos = new vscode.Position(textEndLine, document.lineAt(textEndLine).text.length);
		const entireRange = new vscode.Range(startPos, endPos);
		const word = document.getText(entireRange)
		const formatText = SupportingFile(word, editor, entireRange)
		if (!formatText) {
			console.warn("Not in line with rules")
			vscode.commands.executeCommand("editor.action.commentLine");
			return
		}
		editor.edit(editBuilder => { return editBuilder.replace(entireRange, formatText) })
	});


}




const formatVue = (input: string, editor: vscode.TextEditor, entireRange: vscode.Range) => {
	function isTemplateRange(editor: vscode.TextEditor, entireRange: vscode.Range) {
		let findTemplate = false
		for (let startIdx = entireRange.start.line - 1; startIdx >= 0; startIdx--) {
			const linaAtIdexItemText = editor.document.lineAt(startIdx).text
			if ((linaAtIdexItemText.indexOf("<style") === 0 || linaAtIdexItemText.indexOf("</style>") === 0 || linaAtIdexItemText.indexOf("<script") == 0 || linaAtIdexItemText.indexOf("</scrip>") == 0)) {
				break
			}
			findTemplate = !editor.document.lineAt(startIdx).text.indexOf("<template")
			if (findTemplate) {
				break
			}
		}
		return findTemplate
	}
	if (isTemplateRange(editor, entireRange)) {
		return htmlHendle.heandle(input)
	}
}

const formatWxml = (input: string, editor?: vscode.TextEditor, entireRange?: vscode.Range) => {
	return htmlHendle.heandle(input)
}
