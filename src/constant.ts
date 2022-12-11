// const htmlComments = ["<!--", "-->"];
// const htmlNestedCommentsIdentify = "~~"
// const htmlNestedComments = ["<!" + htmlNestedCommentsIdentify, htmlNestedCommentsIdentify + ">"];
export default {
	spaceChars: " ",
	tabChars: "	",
	html: {
		commentsStart: "<!--",
		commentsEnd: "-->",

		commentsStartReg: /<!--/,
		commentsEndReg: /-->/,

		nestedCommentsStart: "<!~~",
		nestedCommentsEnd: "~~>",

		isCommentsReg: /(<!--)[\s\S]*(-->)/,

		// comments: htmlComments,
		// nestedComments: htmlNestedComments,
		attributeComments: "//",
		// combination: {
		// 	singleLayer: (() => {
		// 		return ""
		// 	})()

		// }
	},
	jsx: {
		commentsStart: "{/*",
		commentsStartReg: /\{\/\*/,
		commentsEnd: "*/}",
		commentsEndReg: /(\*)\/\}/,

		isCommentsReg: /(\{\/\*)[\s\S]*(\*\/\})/,
		nestedCommentsStart: "<!~~",
		nestedCommentsEnd: "~~>",
	},
	css: {
		comments: []
	}

};