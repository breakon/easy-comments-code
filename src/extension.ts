'use strict';

import * as vscode from 'vscode';
import constant from "./constant"
import * as utils from "./utils";
export function activate(context: vscode.ExtensionContext) {
	// await vscode.commands.executeCommand("editor.action.commentLine")
	vscode.commands.registerTextEditorCommand("extension.EasyCommentsCode", () => {

		const editor = vscode.window.activeTextEditor;
		if (!editor) { return }
		const document = editor.document;
		// html: formatHtml,
		const SupportingFile = { vue: formatVue }[document.languageId] || null

		if (!SupportingFile) { // Keep the default effect
			vscode.commands.executeCommand("editor.action.commentLine"); return
		}
		const { start: { line: textStartLine }, end: { line: textEndLine } } = editor.selection;
		const startPos = new vscode.Position(textStartLine, 0);
		const endPos = new vscode.Position(textEndLine, document.lineAt(textEndLine).text.length);
		const entireRange = new vscode.Range(startPos, endPos);
		const word = document.getText(entireRange)

		const formatText = SupportingFile(word, editor)

		if (!formatText) {
			console.warn("Not in line with rules")
			return
		}
		editor.edit(editBuilder => { return editBuilder.replace(entireRange, formatText) })
	});
}

const formatVue = (text: string, editor: vscode.TextEditor,) => {
	const docAllText = editor.document.getText()
	const HtmlBlockCode = getHtmlBlock(docAllText)
	const [startKey, endKey] = constant.html.comments
	if (HtmlBlockCode && HtmlBlockCode.text.search(text) >= 0) {
		const isCommentIdentify = !(text.trimStart().startsWith(startKey) && text.trimEnd().endsWith(endKey))
		// const findEndComment = _text.lastIndexOf(endKey)
		let formatData = ""
		// && findStartComment<findEndComment
		const [nestedStartKey, nestedEndKey] = constant.html.nestedComments
		if (isCommentIdentify) {
			const HtmlBlockComments = getHtmlBlockComments(text)
			console.log("todo-comment", HtmlBlockComments)
			if (!HtmlBlockComments) { return }
			const nestedStarKeyReplace = new RegExp(startKey, "g"), nestedEndKeyReplace = new RegExp(endKey, "g")
			const fComments = HtmlBlockComments.text.replace(nestedStarKeyReplace, nestedStartKey).replace(nestedEndKeyReplace, nestedEndKey)
			formatData = OriginalNotes(text.replace(HtmlBlockComments.text, fComments))
		} else {
			console.log("todo-uncomment")
			formatData = utils.ReplaceOutermostTag([startKey, endKey], [nestedStartKey, nestedEndKey], text) || ""

			if(!formatData){
				formatData = text.replace(startKey, " ".repeat(startKey.length)).replace(endKey," ".repeat(endKey.length))
			}
			// const nestedStarKeyReplace = new RegExp(startKey, "g"), nestedEndKeyReplace = new RegExp(startKey, "g")
			//  console.log("formatData:",formatData)
			// formatData = text.replace(nestedStarKeyReplace, startKey).replace(nestedEndKeyReplace, endKey)
		}

		return formatData && formatData

	}else{
		vscode.commands.executeCommand("editor.action.commentLine")	
	}

	
	// =================================================================
	function OriginalNotes(str: string) {
		let i=2
		let res= str.replace(/^\s*|\s+$/g, (matchText) => { 
			if(i==2){
				matchText= `${startKey} `.padStart(matchText.length,matchText)
			}else if(i==1){
				matchText=  ` ${endKey}`.padEnd(matchText.length,matchText)
			}
			--i;
			return matchText
		})
		res.lastIndexOf(endKey)===-1&& (res+= ` ${endKey}`)
		return res
	}
}

const formatHtml = (text: string, editor: vscode.TextEditor,) => {
	// Next version plan
}

const getHtmlBlockComments = (str: string) => {
	const reg = /[\s\S]*/;
	const res = str.match(reg)
	if (!res) { return null }
	return { text: res[0], index: res.index }
}


const getHtmlBlock = (str: string) => {
	// const reg1=/(?<=<template>)[\s\S]*(?=<\/template>)/;
	const reg1 = /(<template>)[\s\S]*(<\/template>)/;
	const res = str.match(reg1)
	if (!res) { return null }
	return { text: res[0], index: res.index }
}
