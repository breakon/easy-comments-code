'use strict';

import * as vscode from 'vscode';
import constant from "./constant"
import * as utils from "./utils";
import { BaseLanguageClient } from 'vscode-languageclient';
import linebyLineHandleTag from "./htmlLinebyLineHandle"
export function activate(context: vscode.ExtensionContext, client: BaseLanguageClient) {

	// await vscode.commands.executeCommand("editor.action.commentLine")
	vscode.commands.registerTextEditorCommand("extension.EasyCommentsCode", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return }
		const document = editor.document;
		const SupportingFile = {
			vue: formatVue, wxml: formatWxml, xml: formatXml, html: formatHtml,
			javascriptreact: formatJsx,
			typescriptreact: formatJsx,
			css: formatCss,


		}[document.languageId] || null
		if (!SupportingFile) { // Keep the default effect
			console.log("No SupportingFile",document.languageId)
			vscode.commands.executeCommand("editor.action.commentLine"); return
		}
		const { start: { line: textStartLine }, end: { line: textEndLine } } = editor.selection;
		const startPos = new vscode.Position(textStartLine, 0);
		const endPos = new vscode.Position(textEndLine, document.lineAt(textEndLine).text.length);
		const entireRange = new vscode.Range(startPos, endPos);
		const word = document.getText(entireRange)
		const formatText = SupportingFile(word, editor, entireRange)
		if (!formatText) {
			// console.warn("Not in line with rules", document.languageId)
			vscode.commands.executeCommand("editor.action.commentLine");
			return
		}
		editor.edit(editBuilder => { return editBuilder.replace(entireRange, formatText) })
	});


}




const formatVue = (input: string, editor: vscode.TextEditor, entireRange: vscode.Range) => {
	let isStyle=false,getStyleText=""
	let findTemplate = false
	function isHTML(editor: vscode.TextEditor, entireRange: vscode.Range) {
		for (let startIdx = entireRange.start.line - 1; startIdx >= 0; startIdx--) {
			const linaAtIdexItemText = editor.document.lineAt(startIdx).text
			const linaAtIdxTexTrim=linaAtIdexItemText.trimStart()
			if ((linaAtIdxTexTrim.indexOf("<style") === 0 || linaAtIdxTexTrim.indexOf("</style>") === 0 || linaAtIdxTexTrim.indexOf("<script") == 0 || linaAtIdxTexTrim.indexOf("</scrip>") == 0)) {
				 isStyle=linaAtIdxTexTrim.indexOf("<style") === 0
				 getStyleText=linaAtIdxTexTrim
				break
			}
			findTemplate = !editor.document.lineAt(startIdx).text.indexOf("<template")
			if (findTemplate) {
				break
			}
		}
		return findTemplate
	}
	isHTML(editor, entireRange)

	if (findTemplate) {
		const htmlInstance = new linebyLineHandleTag(constant.html)
		return htmlInstance.handle(input)
	}else if(isStyle&&getStyleText){
		const htmlInstance = new linebyLineHandleTag(constant.css)
		if(getStyleText.search(/lang=["' ]+postcss+[ '"]/)>=0||getStyleText.search(/(<style)[scoped\s]+>/)>=0){
		return htmlInstance.handle(input)
		}
	}
}

const formatWxml = (input: string, editor?: vscode.TextEditor, entireRange?: vscode.Range) => {
	const htmlInstance = new linebyLineHandleTag(constant.html)
	return htmlInstance.handle(input)
}

const formatXml = (input: string, editor?: vscode.TextEditor, entireRange?: vscode.Range) => {
	const htmlInstance = new linebyLineHandleTag(constant.html)
	return htmlInstance.handle(input)
}

const formatHtml = (input: string, editor: vscode.TextEditor, entireRange: vscode.Range) => {
	function isHTML(editor: vscode.TextEditor, entireRange: vscode.Range) {
		let findTemplate = false;
		for (let startIdx = entireRange.start.line - 1; startIdx >= 0; startIdx--) {
			const textLine = editor.document.lineAt(startIdx).text;
			if (textLine.lastIndexOf("</style>") >= 0
				|| textLine.lastIndexOf("</scrip>") >= 0
				|| textLine.search(/(<script [^]+src=)|(<script[^>]*>[\s\S]*<\/script>)|(<script\/>)/) >= 0
				|| textLine.lastIndexOf("<html") >= 0) {
				findTemplate = true
				break
			} else if (textLine.indexOf("<style") >= 0 || textLine.indexOf("<script") >= 0) {
				break
			}
		}
		return findTemplate
	}

	if (isHTML(editor, entireRange)) {
		const htmlInstance = new linebyLineHandleTag(constant.html)
		return htmlInstance.handle(input)
	}

}

const formatJsx = (input: string, editor: vscode.TextEditor, entireRange: vscode.Range) => {
	function isHTML(editor: vscode.TextEditor, entireRange: vscode.Range) {
		let textAllLog = "", attrIndex=-1
		let findTemplate = false;
		for (let startIdx = entireRange.start.line,truncationIdx=0; startIdx >= 0;truncationIdx++, startIdx--) {
			const textLine = editor.document.lineAt(startIdx).text;
			textAllLog += textLine + "\n"
			if(attrIndex===-1&&startIdx!=entireRange.start.line){ 
				const t=textLine.search(/<.+>/);
				attrIndex= t>=0?-1:truncationIdx
			}
			 if (
				( textLine.trimEnd().search(/return([ 	]*)\(/) >= 0
					&& textLine.search(/return([ 	]*)\([\s\S]+\)/) === -1
					&& (textAllLog.search(/<\w+? (([\s\S])*?\>)|(<\w+>)/) >= 0)
				)
				|| textLine.search(/return([ 	]*)\</) >= 0
			) {
				const findTagAttr=textAllLog.split("\n").splice(0,attrIndex+1).join("\n");
				if(findTagAttr.search(/<[\s\S]*(>)/)==-1){
					break
				}
				findTemplate = true
				break
			} else if ( textLine.trimStart().indexOf("export ")===0) {
				break
			}
		}
		return findTemplate
	}
	if (isHTML(editor, entireRange)) {
		const htmlJsx = new linebyLineHandleTag(constant.jsx)
		return htmlJsx.handle(input)
	}
}



const formatCss = (input: string, editor?: vscode.TextEditor, entireRange?: vscode.Range) => {
	const cssInstance = new linebyLineHandleTag(constant.css)
	return cssInstance.handle(input)
}


