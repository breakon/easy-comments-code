
import * as utils from "./utils";
import constant from "./constant"
const startKey = "<!--"
const endKey = "-->"


const heandle = (input: string) => {
	const { splitArray, isComments } = splitInputText(input)
	if (isComments) {//取消注释
		return commentHeandle(splitArray)
	}
	return unCommentHeandle(splitArray)
}

const splitInputText = (input: string) => {
	const inputSplit = input.split("\n")
	let commentsNum = 0

	inputSplit.forEach(lineItem => {
		if (lineItem.search(/(<!--)[\s\S]*(-->)/)) {
			commentsNum++
		}
	})
	// console.log(commentsNum, inputSplit.length)
	return { splitArray: inputSplit, isComments: !(commentsNum === inputSplit.length-1) }

}

const commentHeandle = (input: string[], test?: boolean) => {
	return input.map((lineText) => commentline(lineText)).join("\n")
}

const commentline = (lineText: string) => {
	const Tab = `	`, space = ` `
	const regText = `^${space}+|^${Tab}+|^`;
	const startReg = new RegExp(regText)
	let text = lineText.replace(/<!--/g, "<!~~").replace(/-->/g, "~~>")
		.replace(startReg, (str) => `${str}${startKey}${space}`);
	text = `${text} ${endKey}`;
	return text
}


// const unCommentline = (lineText: string) => {
// 	const regText=`(${startKey})((?!${startKey}).)*?(${endKey})`;
// 	const lineText2=new RegExp(regText)
// 	let text = lineText.replace(lineText2,(str)=>{
// 		return str.replace(/<!--/, "").replace(/-->/, "")
// 	})
// 	const [nestedStartKey, nestedEndKey] = constant.html.nestedComments
// 	let lineTextNesting = utils.ReplaceOutermostTag([startKey, endKey], [nestedStartKey, nestedEndKey], text) || ""
// 	return lineTextNesting||text
// }
const unCommentline = (lineText: string) => {
	const [nestedStartKey, nestedEndKey] = constant.html.nestedComments
	let lineTextNesting = utils.ReplaceOutermostTag([`${startKey} `, ` ${endKey}`], [nestedStartKey, nestedEndKey], lineText) || utils.ReplaceOutermostTag([startKey, endKey], [nestedStartKey, nestedEndKey], lineText) || ""
	if (!lineTextNesting) {
		lineTextNesting = lineText.replace(`${startKey} `, "").replace(`${endKey} `, "").replace(startKey, "").replace(endKey, "")
	}
	return lineTextNesting.trimEnd()
}
const unCommentHeandle = (input: string[], test?: boolean) => {
	return input.map((lineText) => unCommentline(lineText)).join("\n")
}


export default {
	splitInputText,
	heandle,
	commentHeandle,
	unCommentHeandle
}