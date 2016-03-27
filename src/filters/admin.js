import {getTimeCha, getTimeAdd} from './time.js'
export function rank(value) {
	//处理
	if(value == 0){
		return '周卡';
	}
	if(value == 1){
		return '月卡';
	}
	if(value == 2){
		return '期卡';
	}
}

export function sumDaysByRank(value, rank){
	var endDate = value
	//获取当前时间
	var myDate = new Date()
	var year = myDate.getFullYear()
	var month = myDate.getMonth() + 1
	var date = myDate.getDate()
	//当前时间
	var nowDate = year + "-" + month + "-" + date
	//获取时间差
	cha = getTimeCha(nowDate, endDate)
	if(rank == '1' && cha > 30){
		//如果是月卡会员而且超期了，就显示超期
		//records.push(value[i]);
		return true
	}else{
		//这里的都是期卡
		return false
	}
}