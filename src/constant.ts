const htmlComments=["<!--","-->"];
const htmlNestedCommentsIdentify="~~"
const htmlNestedComments=["<!"+htmlNestedCommentsIdentify,htmlNestedCommentsIdentify+">"];
export default {
	html:{
		comments:htmlComments	,
		nestedComments:htmlNestedComments,
		attributeComments:"//",
		combination:{
			singleLayer:(()=>{
				const [left, right] =htmlNestedComments; // create:((<!~~)([^(!~~)]+)(~~>))|(~~>)|(<!~~)
				return `((${left})([^(${htmlNestedCommentsIdentify})]+)(${right}))|(${right})|(${left})`
			})()
			
		}
	},
	css:{
		comments:[]
	}

};