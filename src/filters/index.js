//根据借阅次数来计算商品价格
export function sumPriceByBorrowTimes(value, times) {
  //按原价75折作为初始价格
  value = 0.75*value;
  //假设每次借阅折损10%
  var loss = value*0.1;
  var price = value-(times*loss);
  var number = price.toFixed(1);

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
    return '订单取消';
  }
}
//过滤掉被销售的和被下架的商品
export function fetchNotSale(array) {
  var newArray = array.filter(obj=>{
    return obj.bookState == 0;
  });
  return newArray;
}