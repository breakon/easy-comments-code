
import * as utils from "./utils";
import constant from "./constant"
interface IInitHtmlModule {
	commentsStart: string
	commentsEnd: string

	commentsStartReg: RegExp
	commentsEndReg: RegExp

	nestedCommentsEnd: string
	nestedCommentsStart: string

	isCommentsReg: RegExp
}

class HtmlModule {
	COMMENTS_START
	COMMENTS_END

	COMMENTS_START_REG
	COMMENTS_END_RGE

	NESTEDCOMMENTS_START
	NESTEDCOMMENTS_END

	IsCommentsReg

	constructor(init: IInitHtmlModule) {
		// for(let key in init) {
		// 	this[key]=init[key]
		// }
		// this={...init}
		this.COMMENTS_START = init.commentsStart
		this.COMMENTS_END = init.commentsEnd
		this.NESTEDCOMMENTS_START = init.nestedCommentsStart
		this.NESTEDCOMMENTS_END = init.nestedCommentsEnd
		this.IsCommentsReg = init.isCommentsReg
		this.COMMENTS_START_REG = init.commentsStartReg
		this.COMMENTS_END_RGE = init.commentsEndReg
	}
	handle(input: string,) {
		const { splitArray, isComments } = this.splitInputText(input)
		return isComments ? this.commentHeandle(splitArray) : this.unCommentHeandle(splitArray)
	}
	splitInputText(input: string) {
		const inputSplit = input.split("\n")
		let commentsNum = 0
		inputSplit.forEach(lineItem => {
			if (this.IsCommentsReg.test(lineItem)) {
				commentsNum++
			}
		})
		return { splitArray: inputSplit, isComments: !(commentsNum == inputSplit.length) }
	}


	commentHeandle(input: string[]):string {
		const rowLineOne = 1, t = this;
		const Tab = constant.tabChars, space = constant.spaceChars;
		const startKeyReg = new RegExp(t.COMMENTS_START_REG, "g")
		const endKeyReg = new RegExp(t.COMMENTS_END_RGE, "g")
		const baselineTextHandle=(lt:string) =>lt.replace(/\r/g, "").replace(startKeyReg, t.NESTEDCOMMENTS_START).replace(endKeyReg, t.NESTEDCOMMENTS_END)
		if (input.length === rowLineOne) {
			return input.map((lineText) => {
				let text = baselineTextHandle(lineText).replace(new RegExp(`^${space}+|^${Tab}+|^`),(str) => `${str}${t.COMMENTS_START}${space}`);
				return `${text}${space}${t.COMMENTS_END}`
			}).join("\n") 
		}
		return input.map((lineText) => {
			//none-stay the same
			if(!lineText.trim()) return lineText

			let text = baselineTextHandle(lineText) 
			 return  `${t.COMMENTS_START}${space}${text}${space}${t.COMMENTS_END}`
		}).join("\n") 
	}
	unCommentHeandle(input: string[]) {
		const space = constant.spaceChars
		const t = this
		return input.map((lineText) => {
			let lineTextNesting = utils.unOutermostTag(
				lineText,
				[t.COMMENTS_START_REG, t.COMMENTS_END_RGE],
				[t.NESTEDCOMMENTS_START, t.NESTEDCOMMENTS_END],
				{ space: constant.spaceChars, outerTag: [t.COMMENTS_START, t.COMMENTS_END] }
			)

			if (lineTextNesting === lineText) {
				lineTextNesting = lineText
					.replace(`${t.COMMENTS_START}${space}`, "")
					.replace(`${t.COMMENTS_END}${space}`, "")
					.replace(t.COMMENTS_START, "")
					.replace(t.COMMENTS_END, "");
			}
			return lineTextNesting.trimEnd();
		}
		).join("\n");
	}
};

export default HtmlModule