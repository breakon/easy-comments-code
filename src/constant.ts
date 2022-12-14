 
export default {
	// todo
	isCommentPointBeginningLine:false,//user set
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
		commentsStart: "/*",
		commentsEnd: "*/",
		commentsStartReg: /\/\*/,
		commentsEndReg: /\*\//,

		isCommentsReg: /(\/\*)[\s\S]*(\*\/)/,
		nestedCommentsStart: "/~",
		nestedCommentsEnd: "~/",
	}

};