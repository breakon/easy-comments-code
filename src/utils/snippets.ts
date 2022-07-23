import constantCfg from "../constant";
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

export const ReplaceOutermostTag = (
	target: [string, string], 
	removeNested: [string, string],
	 str: string) => {
	const textOutermost = GetOutermostTag(target, str);
	if (!textOutermost) { return; }
	// console.log("textOutermost",textOutermost); 
	const reg = new RegExp(constantCfg.html.combination.singleLayer, "g");
	const textMatchList = textOutermost.text.match(reg)
	const [ NC_Start,NC_End ]=removeNested
	const SingleLabelIndex:{ [k:number]:string }={}//
	if (!textMatchList) {
		console.warn("ReplaceOutermostTa:no match ", reg, str);
		return null;
	}
	textMatchList.forEach((el,i) => {
		if(NC_Start===el||NC_End===el) {
			SingleLabelIndex[i]=el
		}
		});
	let logIndex=0;
	const [C_Start,C_End]=constantCfg.html.comments
	  let bool=true
	const replaceTextResult=textOutermost.text.replace(reg, (_cString)=>{ 
		const singleFindTag=SingleLabelIndex[logIndex]||"" 
		let currentStr=_cString
		if(singleFindTag){
			const idx=[NC_Start,NC_End].indexOf(singleFindTag);
			// console.log("SingleLabelIndex:",idx,singleFindTag)
			bool=NC_End===singleFindTag
			currentStr= [C_Start,C_End][+idx];
		 }
		 if((bool)&&(currentStr.startsWith(NC_Start)&&currentStr.endsWith(NC_End))){
			currentStr= currentStr.replace(NC_Start,C_Start).replace(NC_End,C_End)
		}
		logIndex++ 
	        return currentStr
	});
	return { text:replaceTextResult};
};



