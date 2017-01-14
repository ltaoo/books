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
//将书籍状态转为中文。
export function bookState(value) {
	//处理
	if(value == 0){
		return '正常';
	}
	if(value == 1){
		return '已被借阅';
	}
	if(value == 2){
		return '已出售';
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

export function searchBy (value, query) {
	if(query == 0){
		return value;
	}
	//查询未还
	if(query == 1){
		console.log('filter by returntime');
		var records = [];
		var recordLen = value.length;
		for (var i = 0; i < recordLen; i++) {
			var reg = /0000-00-00/;     
      var r = value[i].returnTime.match(reg); 
      console.log(r);    
			if(r !== null){
				//records[i] = {};
				records.push(value[i]);
			}
		}
		return records;
	}
	if(query == 2){
		//查询超期
		var records = [];
		for (var i = 0; i < value.length; i++) {
			//每一条记录
			var reg = /0000-00-00/;
      var r = value[i].returnTime.match(reg);
			if(r == null){
				//已归还
				//records[i] = {};
			}else{
				//未归还
				//没有归还，判断是不是超过期限了
				//records[i] = value[i];
				var rank = value[i].memberRank;

				//借阅时间
				var DateTwo = value[i].borrowTime;
				//获取当前时间
				var myDate = new Date();
				var year = myDate.getFullYear();
				var month = myDate.getMonth() + 1;
				var date = myDate.getDate();
				//当前时间
				var DateOne = year + "-" + month + "-" + date;
				//获取时间差
				var cha = getTimeCha(DateOne, DateTwo);
				if(rank = '0'){
					//普通会员，只能借七天,如果cha>7就是超期了
					if(cha > 7){
						records.push(value[i]);
					}
				}
				if(rank = '1'){
					//月卡，只能借30天,如果cha>30就是超期了
					if(cha > 30){
						records.push(value[i]);
					}
				}
			}
		}
		return records;
	}
}

export function returnFilter (value, borrowtime, rank) {
	if(value == undefined){
		return value;
	}else{
		var reg = /0000-00-00/;     
	    var r = value.match(reg);
		if(r == null){
			//没有匹配到，就是已经还了的
			//records[i] = {};
			return '已还';
		}else{
			//return '未还';
			//会员等级
			var rank = rank;
			//借阅时间
			var DateTwo = borrowtime;
			//获取当前时间
			var myDate = new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth() + 1;
			var date = myDate.getDate();
			//当前时间
			var DateOne = year + "-" + month + "-" + date;
			//获取时间差
			var cha = getTimeCha(DateOne, DateTwo);
			if(rank == '0'){
				//如果是周卡会员而且超期了，就显示超期
				//records.push(value[i]);
				if(cha > 7){
					return '超期' + (cha - 7) + '天';
				}else{

					return '应还时间:' + getTimeAdd(DateTwo, 7);
				}
				
			}else if(rank == '1'){
				//如果是月卡会员而且超期了，就显示超期
				//records.push(value[i]);
				if(cha > 30){
					return '超期' + (cha - 30) + '天';
				}else{
					return '应还时间:' + getTimeAdd(DateTwo, 30);
				}
				
			}else{
				//这里的都是期卡
				return '未还';
			}
			
		}
	}
}