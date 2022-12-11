export const GetMdHtmlBlock = (str: string) => {
	// const reg1=/(?<=<template>)[\s\S]*(?=<\/template>)/;
	const reg1 = /(?<=```html\n)[\s\S]*?(?=\n```)/;
	const res = str.match(reg1);
	if (!res) { return null; }
	return { text: res[0], index: res.index };
};

export const TargetMdHtmCode = (key: string, mdHtmlText: string) => {
	const targetIndexOf = mdHtmlText.indexOf(key);
	const startTextIndex = key.length + targetIndexOf;
	const text = mdHtmlText.substring(startTextIndex);
	return GetMdHtmlBlock(text)?.text;
};
export const GetOutermostTag = (arr: [string, string], str: string) => {
	const [startKey, EndKey] = arr;
	const reg = `(?<=${startKey})[\\s\\S]*?(?=${EndKey})`;
	const nestedStarKeyReplace = new RegExp(reg, "g");
	const res = str.match(nestedStarKeyReplace);
	return res;
};
function* MatchTag(strArr: Array<string> = [], [leftKey, rightKey]: [string, string]) {
	let left: Array<string> = [];// 空栈
	for (let i = 0; i < strArr.length; i++) {
		const log = { stack: left, idx: i, isLeft: strArr[i] == leftKey }
		yield log
		if (strArr[i] == leftKey) {
			left.push(strArr[i]) //左括号入栈
		} else if (strArr[i] == rightKey && left.pop() != leftKey) {
			return false; //结束循环
		}
	}
}

interface IunOutermostTag_options{
space:string,
outerTag:[string,string]
}

export function unOutermostTag(
	_inputText: string = "",
	outerTag:[RegExp, RegExp],
	insideTag:[string, string],
	options:IunOutermostTag_options
	) {
	
	// commentsStart
	const [oTagStartReg, oTagEndReg]=outerTag,[ iTagStart, iTagEnd]=insideTag
	const [ oTagStart, oTagEnd]=options.outerTag

	const leftTagReg=new RegExp(oTagStartReg,"g");
	const rightTagReg=new RegExp(oTagEndReg,"g");

	const leftTagTransition=iTagStart
	const rightTagTransition=iTagEnd

	const inputText = _inputText.replace(leftTagReg, leftTagTransition).replace(rightTagReg,rightTagTransition)

	const findAllTag=new RegExp(`${leftTagTransition}|${rightTagTransition}`,"g");

	const splitText = inputText.match(findAllTag)
	if (!splitText || splitText.length <= 1) { return _inputText }
	const iteratorMatchTag = MatchTag(splitText, insideTag)

	const findReplaceAllTagReg=new RegExp(`(${iTagStart}${options.space})|(${options.space}${iTagEnd})|(${iTagStart})|(${iTagEnd})`,"g");

	const tagSpace=options.space||" "
	return inputText.replace(findReplaceAllTagReg, (v) => {
		const currItem = iteratorMatchTag.next().value;
		if (!currItem) { return v }
		const currStackLen = currItem.stack.length
		if (currItem.isLeft) {
			if (currStackLen === 0) {
				return ""
			} else if (currStackLen === 1) {
				let k = oTagStart
				return `${k}${v.length > k.length ? tagSpace : ""}`
			} else {
				let k = iTagStart
				return `${k}${v.length > k.length ? tagSpace : ""}`
			}
		} else {
			if (currStackLen - 1 === 0) {
				return ""
			} else if (currStackLen - 1 === 1) {
				// debugger
				let k = oTagEnd
				return `${v.length > k.length ? tagSpace : ""}${k}`
			} else {
				let k = iTagEnd
				return `${v.length > k.length ? tagSpace : ""}${k}`
			}

		}
	})

}

