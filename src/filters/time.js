export function getTimeCha(DateOne, DateTwo){
	var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  	
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  	//第一个时间减去第二个时间,第一个时间为当前时间
  	//Date.parse 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。86400000毫秒等于1天
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return cha;
}

export function getTimeAdd(date, num){
	//date为借阅时间
	//parse的参数为1993/08/19格式
	var month = date.substring(5,date.lastIndexOf ('-'));
    var day = date.substring(date.length,date.lastIndexOf ('-')+1);
    var year = date.substring(0,date.indexOf ('-'));
    //分别拿到年月日
    //获取到num至
	var yinghuan = new Date(Date.parse(month + '/' + day + '/' + year) + (86400000 * num));  
	var year1 = yinghuan.getFullYear();
	var month1 = yinghuan.getMonth() + 1;
	var date1 = yinghuan.getDate();
	//当前时间
	var result = year1 + "-" + month1 + "-" + date1;
	return result;
}