/* 获取两个时间的时间差
 * @param <Date> first
 * @param <Date> second
 * @return <>
 */
export function getTimeCha(dateOne, dateTwo){
	const OneMonth = dateOne.substring(5,DateOne.lastIndexOf ('-'));  
	const OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
	const OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
	
	const TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
	const TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
	const TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
	// 第一个时间减去第二个时间,第一个时间为当前时间
	// Date.parse 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。86400000毫秒等于1天
	return ((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
}
/* 

 */
export function getTimeAdd(date, num){
	// date为借阅时间
	// parse的参数为1993/08/19格式
	const month = date.substring(5,date.lastIndexOf ('-'));
	const day = date.substring(date.length,date.lastIndexOf ('-')+1);
	const year = date.substring(0,date.indexOf ('-'));
	// 分别拿到年月日
	// 获取到num至
	const yinghuan = new Date(Date.parse(month + '/' + day + '/' + year) + (86400000 * num));  
	const year1 = yinghuan.getFullYear();
	const month1 = yinghuan.getMonth() + 1;
	const date1 = yinghuan.getDate();
	// 当前时间
	return year1 + "-" + month1 + "-" + date1;
}