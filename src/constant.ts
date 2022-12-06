const htmlComments=["<!--","-->"];
const htmlNestedCommentsIdentify="~~"
const htmlNestedComments=["<!"+htmlNestedCommentsIdentify,htmlNestedCommentsIdentify+">"];
export default {
	spaceChars:" ",
	tabChars:"	",
	html:{
		commentsStart:"<!--",
		commentsEnd:"-->",
		nestedCommentsStart:"<!~~",
		nestedCommentsEnd:"~~>",
		
		comments:htmlComments,
		nestedComments:htmlNestedComments,
		attributeComments:"//",

		combination:{
			singleLayer:(()=>{
				return ""
			})()
			
		}
	},
	css:{
		comments:[]
	}

};