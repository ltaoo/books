import {getTimeCha, getTimeAdd} from './time.js';
//将会员等级转为中文。
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
//根据会员登记日期和等级判断是否超期
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
	var cha = getTimeCha(nowDate, endDate)
	//console.log(cha)
	if(rank == '1' && cha > 30){
		//如果是月卡会员而且超期了，就显示超期
		//records.push(value[i]);
		return true
	}else{
		//这里的都是期卡
		return false
	}
}
//根据书籍是否已借出判断是否有借阅按钮
export function sumCanBorrow(value){
	if(value == null){
		return true
	}else{
		return false
	}
}

//根据会员等级显示按钮状态
export function sumRank(value, rank) {
	if(value == rank){
		return true;
	}else{
		return false;
	}
}