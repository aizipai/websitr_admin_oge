
import axios from 'axios'


const getGuides = ({url,options,callback})=>{
console.log(111)
	axios.post(url,options,(res)=>{
		res = JSON.parse(res)
		console.log(res)
		console.log(111)
		typeof callback == 'function' && callback(res)
	})
}


export default{
	getGuides
}