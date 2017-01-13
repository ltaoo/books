//根据借阅次数来计算商品价格
export function sumPriceByBorrowTimes(value, times, time) {
  //先保存下原价
  var orginal = value;
  //按原价75折作为初始价格
  value = 0.75*value;
  //假设每次借阅折损10%
  var loss = value*0.1;
  var price = value-(times*loss);
  var number = price.toFixed(1);
  var nowDate = new Date();
  var nowDate = nowDate.toLocaleDateString();
  var first = Date.parse(nowDate);
  var second = Date.parse(time);

  //判断时间差，一周内的属于新上架
  var day = (first-second)/86400000;
  //这个地方应该递进，比如上架时间超过60而且借阅次数小于6，上架时间超过90而且借阅次数小于9这样。
  for(var i = 1;i < 3; i++) {
    if(day.toFixed() > 30*i && times < 3*i) {
      number = orginal*0.3;
      continue;
    }
  }

  number = String.prototype.split.call(number, '.');
  //console.log(c);
  if(number[1] > 5) {
    number[1] = 0;
    number[0] = parseInt(number[0]) + 1;
  }else{
    number[1] = 5;
  }
  return number.join('.');
}

//订单状态
export function orderState(value) {
  if(value == 0) {
    return '未确认';
  }else if(value == 1) {
    return '订单已完成';
  }else if(value == 2) {
    return '订单已取消';
  }
}
//过滤掉被销售的和被下架的商品
export function fetchNotSale(array) {
  var newArray = array.filter(obj=>{
    return obj.bookState == 0;
  });
  return newArray;
}
//过滤评论用户名显示
export function hiddenName (value) {
  if(value) {
    var len = value.length;
    var firstName = value.charAt(0);
    var x = '';
    for(var n = 1; n < len; n++) {
      x += 'X';
    }
    return firstName + x;
  }
  return value;
}