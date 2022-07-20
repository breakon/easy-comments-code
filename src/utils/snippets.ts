export const GetMdHtmlBlock = (str: string) => {

	// const reg1=/(?<=<template>)[\s\S]*(?=<\/template>)/;
	const reg1 = /(?<=```html)[\s\S]*?(?=```)/;
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
	const nestedStarKeyReplace = new RegExp(reg);
	const res = str.match(nestedStarKeyReplace);
	if (!res) { return null ;}
	return { text: res[0], index: res.index };
};

export const ReplaceOutermostTag = (target: [string, string], replace: [string, string], str: string) => {
	const textOutermost = GetOutermostTag(target, str);
	if (!textOutermost) { return; }
	const [startKey, EndKey] = replace;
	const reg = `(?<=${startKey})[\\s\\S]*?(?=${EndKey})`;
	// ((<!~~))[\s\S][^!~~]*((~~>))
	
	const nestedStarKeyReplace = new RegExp(reg, "gm");
	const res = str.match(nestedStarKeyReplace);
	if (!res) {
		console.warn("ReplaceOutermostTa:no match ", reg, str);
		return null;
	}
	return { text:res[0], index: res.index };
};



