'use strict';

import * as vscode from 'vscode';
import constant from "./constant"
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerTextEditorCommand("extension.EasyCommentsCode", (editor) => {
		vscode.commands.executeCommand("editor.action.commentLine").then(() => {
			const document = editor.document;
			// html: formatHtml,
			const SupportingFile = { vue: formatVue }[document.languageId] || null

			if (!SupportingFile) { return }
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
		})
	})
}

const formatVue = (text: string, editor: vscode.TextEditor,) => {
	const docAllText = editor.document.getText()
	const HtmlBlockCode = getHtmlBlock(docAllText)
	if (HtmlBlockCode && HtmlBlockCode.text.search(text) >= 0) {
		const [startKey, endKey] = constant.html.comments
		const _text = text.trim()
		const findStartComment = _text.indexOf(startKey)
		// const findEndComment = _text.lastIndexOf(endKey)
		let formatData = ""
		// && findStartComment<findEndComment
		const [nestedStartKey, nestedEndKey] = constant.html.nestedComments
		if (findStartComment === 0) {
			// console.log("todo-comment")
			const HtmlBlockComments = getHtmlBlockComments(text)
			if (!HtmlBlockComments) { return }
			const nestedStarKeyReplace = new RegExp(startKey, "g"), nestedEndKeyReplace = new RegExp(endKey, "g")
			const fComments = HtmlBlockComments.text.replace(nestedStarKeyReplace, nestedStartKey).replace(nestedEndKeyReplace, nestedEndKey)
			// console.log("todo-fComments",fComments)
			formatData = text.replace(HtmlBlockComments.text, fComments)
		} else {
			const nestedStarKeyReplace = new RegExp(nestedStartKey, "g"), nestedEndKeyReplace = new RegExp(nestedEndKey, "g")

			formatData = text.replace(nestedStarKeyReplace, startKey).replace(nestedEndKeyReplace, endKey)
			// console.log("todo-uncomment")
		}

		return formatData && formatData

	}

}

const formatHtml = (text: string, editor: vscode.TextEditor,) => {
	// Next version plan
}

const getHtmlBlockComments = (str: string) => {
	const reg1 = /(?<=<!--)[\s\S]*(?=-->)/;
	const res = str.match(reg1)
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
