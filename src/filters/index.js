
const handleLevel = (value)=>{
				if(value == '0'){
					return '标准'
				}else if(value == '1'){
					return '高端'
				}else if(value == '2'){
					return '全部'
				}
			}

const formatDate=(time, fmt)=> {
				const date =  new Date(time)
				return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + "点" + date.getMinutes() + "分" + date.getSeconds() + "秒";
				
			}

export default{
	handleLevel,
	formatDate
}

