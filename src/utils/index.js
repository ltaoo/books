/* 返回最终的地址
 * @param <String> api
 * @param <Stirng> action
 * @param <String> query
 * @param <String> param
 * @return <String>
 */
export function url (api, action, query, param) {
  let url = `${api}action=${action}`;
  if (query) {
    url += query && `&${query}=${param}`;
  }
  return url;
}
/* 返回处理好的 formData
 * @param <Object> data
 * @return <FormData>
 */
// const FormData = require('form-data')
export function convert (data) {
  let formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}
/* 根据会员类型返回中文说明
 * @param <String> rank
 * @return <String>
 */
export function rank (rank) {
  const rankTable = {
    0: '周卡',
    1: '月卡',
    2: '期卡',
  };
  return rankTable[rank];
}
/* 根据书籍状态返回中文说明
 * @param <String> state
 * @return <String>
 */
export function bookState (state) {
  const bookStateTable = {
    0: '正常',
    1: '正在借阅',
    2: '已出售',
  };
  return bookStateTable[state];
}
/* 根据订单状态返回中文说明
 * @param <String> state
 * @return <String>
 */
export function orderState (state) {
  const orderStateTable = {
    0: '未确认',
    1: '订单已完成',
    2: '订单已取消',
  };

  return orderStateTable[state];
}
/* 获取两个时间的时间差
 * @param <Date> first
 * @param <Date> second
 * @return <>
 */
export function computedTime (dateOne, dateTwo) {
  const oneMonth = dateOne.substring(5, dateOne.lastIndexOf('-'));
  const oneDay = dateOne.substring(
    dateOne.length,
    dateOne.lastIndexOf('-') + 1,
  );
  const oneYear = dateOne.substring(0, dateOne.indexOf('-'));
  const twoMonth = dateTwo.substring(5, dateTwo.lastIndexOf('-'));
  const twoDay = dateTwo.substring(
    dateTwo.length,
    dateTwo.lastIndexOf('-') + 1,
  );
  const twoYear = dateTwo.substring(0, dateTwo.indexOf('-'));
  // 第一个时间减去第二个时间,第一个时间为当前时间
  // Date.parse 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。86400000毫秒等于1天
  return (
    (Date.parse(oneMonth + '/' + oneDay + '/' + oneYear) -
      Date.parse(twoMonth + '/' + twoDay + '/' + twoYear)) /
    86400000
  );
}
/* 计算指定时间 num 天后的时间
 * @param <Date> data 指定时间
 * @param <Number>
 */
export function afterNumDay (date, num) {
  // date为借阅时间
  // parse的参数为1993/08/19格式
  const month = date.substring(5, date.lastIndexOf('-'));
  const day = date.substring(date.length, date.lastIndexOf('-') + 1);
  const year = date.substring(0, date.indexOf('-'));
  // 分别拿到年月日
  // 获取到num至
  const yinghuan = new Date(
    Date.parse(month + '/' + day + '/' + year) + 86400000 * num,
  );
  const year1 = yinghuan.getFullYear();
  const month1 = yinghuan.getMonth() + 1;
  const date1 = yinghuan.getDate();
  // 当前时间
  return year1 + '-' + month1 + '-' + date1;
}

/* 根据书籍原价与借阅次数计算出打折后的价格
 * @param <String> price
 * @param <Number> times
 * @param <String>
 */
export function computedPriceByTimes (price, times) {
  // 先保存下原价
  // var orginal = price
  // 按原价75折作为初始价格
  const originalPrice = 0.75 * parseFloat(price);
  // 假设每次借阅折损10%
  var lossPrice = price * 0.1;
  const resultPrice = originalPrice - times * lossPrice;
  // let number = price.toFixed(1)
  // let nowDate = new Date().toLocaleDateString()
  // var first = Date.parse(nowDate)
  // var second = Date.parse(time)

  // //判断时间差，一周内的属于新上架
  // var day = (first-second)/86400000
  // //这个地方应该递进，比如上架时间超过60而且借阅次数小于6，上架时间超过90而且借阅次数小于9这样。
  // for(var i = 1;i < 3; i++) {
  // 	if(day.toFixed() > 30*i && times < 3*i) {
  // 		number = orginal*0.3
  // 		continue
  // 	}
  // }

  // number = String.prototype.split.call(number, '.')
  // if (number[1] > 5) {
  // 	number[1] = 0
  // 	number[0] = parseInt(number[0]) + 1
  // } else {
  //     number[1] = 5
  // }
  // return number.join('.')
  return resultPrice;
}
/* 重置指定组件内的指定表单
 * @param <Component> component
 * @param <String> form
 */
export function resetForm (component, form) {
  component.$refs[form].resetFields();
}
/* 根据借阅时间和会员等级计算归还时间
 * @param <Date> returnTime
 * @param <Date> borrowTime
 * @param <String> rank
 * @return <Number> 0 超期、1 已还、2 未还
 */
export function returnTime (returnTime, borrowTime, rank) {
  if (returnTime) {
    // 如果 returnTime 不是 null 表示已还
    return '已还';
  }
  // 借阅时间
  const dateTwo = borrowTime;
  // 获取当前时间
  const myDate = new Date();
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1;
  const date = myDate.getDate();
  // 当前时间
  const dateOne = year + '-' + month + '-' + date;
  // 获取时间差
  const cha = computedTime(dateOne, dateTwo);
  if (rank === '0') {
    // 如果是周卡会员而且超期了，就显示超期
    if (cha > 7) {
      return '超期';
    } else {
      return '未还';
    }
  } else if (rank === '1') {
    // 如果是月卡会员而且超期了，就显示超期
    if (cha > 30) {
      return '超期';
    } else {
      return '未还';
    }
  } else {
    // 这里的都是期卡
    return '未还';
  }
}
