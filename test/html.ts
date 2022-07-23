// import * as console from "console";
import * as fs from "fs";

import { TargetMdHtmCode, ReplaceOutermostTag } from "../src/utils";
const mdHtmlText: string = fs.readFileSync("./example/html.md").toString();

function testMarkHtmlCancelText(key:string) {
	const testHtmlCancelText = TargetMdHtmCode(key, mdHtmlText);
	if (!testHtmlCancelText) { return {outInputText:null,key,message:key+" Not Found Tag"}; }
	const outInputText = ReplaceOutermostTag(["<!--", "-->"], ["<!~~", "~~>"], testHtmlCancelText);
	console.log("outInputText:",outInputText)
	return {outInputText:outInputText,key};
}

// main
(function(){

const test1=testMarkHtmlCancelText("TestMark:HtmlCancelNestingHtml-Before");
const HtmlCancelNestingHtmlAfter=TargetMdHtmCode("TestMark:HtmlCancelNestingHtml-After",mdHtmlText);
console.log(`Run: ${test1.key}`);
console.assert(test1.outInputText===HtmlCancelNestingHtmlAfter, `No Pass ${test1.key}`);
})();
