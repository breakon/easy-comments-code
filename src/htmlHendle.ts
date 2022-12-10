
import * as utils from "./utils";
import constant from "./constant"
// constant.html.commentsStart
let COMMENTS_START = constant.html.commentsStart
let COMMENTS_END = constant.html.commentsEnd
let NESTEDCOMMENTS_START=constant.html.nestedCommentsStart
let NESTEDCOMMENTS_END=constant.html.nestedCommentsEnd

const heandle = (input: string,) => {
	
	const { splitArray, isComments } = splitInputText(input)
	if (isComments) {//取消注释
		return commentHeandle(splitArray)
	}
	return unCommentHeandle(splitArray)
}

const splitInputText = (input: string) => {
	const inputSplit = input.split("\n")
	let commentsNum = 0
	const warpTag=new RegExp(`(${COMMENTS_START})[\\s\\S]*(${COMMENTS_END})`)
	inputSplit.forEach(lineItem => {
		if (warpTag.test(lineItem)) {
			commentsNum++
		}
	})
	return { splitArray: inputSplit, isComments: !(commentsNum == inputSplit.length) }

}

const commentHeandle = (input: string[], test?: boolean) => {
	return input.map((lineText) => commentline(lineText)).join("\n")
}

const commentline = (lineText: string) => {
	const Tab = constant.tabChars, space = constant.spaceChars
	const gap = `^${space}+|^${Tab}+|^`;
	const startGap = new RegExp(gap);
	const startKeyReg = new RegExp(COMMENTS_START, "g")
	const endKeyReg = new RegExp(COMMENTS_END, "g")
	let text = lineText.replace(startKeyReg, NESTEDCOMMENTS_START).replace(endKeyReg, NESTEDCOMMENTS_END)
		.replace(startGap, (str) => `${str}${COMMENTS_START}${space}`);
	text = `${text} ${COMMENTS_END}`;
	return text;
}


const unCommentline = (lineText: string) => {
	let lineTextNesting = utils.unOutermostTag(lineText,[COMMENTS_START,COMMENTS_END],[NESTEDCOMMENTS_START,NESTEDCOMMENTS_END],{ space:constant.spaceChars })
	if (lineTextNesting === lineText) {
		lineTextNesting = lineText.replace(`${COMMENTS_START} `, "").replace(`${COMMENTS_END} `, "").replace(COMMENTS_START, "").replace(COMMENTS_END, "");
	}
	return lineTextNesting.trimEnd();
}
const unCommentHeandle = (input: string[], test?: boolean) => {
	return input.map((lineText) => unCommentline(lineText)).join("\n");
}


export default {
	splitInputText,
	heandle,
	commentHeandle,
	unCommentHeandle
}