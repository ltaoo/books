import fetch from '@/utils/fetch';
// url 用来返回地址，省得拼接字符串
import {
  prefix,
} from '@/config';
import {
  url,
  convert,
} from '@/utils';
/* --------------
 * 会员信息接口
 --------------- */
const memberapi = `${prefix}/getMembers.service.php?`;
// 获取所有用户
export function fetchMembers () {
  return new Promise((resolve, reject) => {
    fetch(url(memberapi, 'getMemberList'))
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 根据用户Id获取信息
export function searchMemberById (param) {
  return new Promise((resolve, reject) => {
    fetch(url(memberapi, 'searchById', 'memberId', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 根据会员学号查询会员
export function searchMemberByNum (param) {
  return new Promise((resolve, reject) => {
    fetch(url(memberapi, 'searchByNum', 'memberNum', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 根据会员姓名查询
export function searchMemberByName (param) {
  return new Promise((resolve, reject) => {
    fetch(url(memberapi, 'searchByName', 'memberName', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 添加会员到数据库
export function createMember (member) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/addMember.service.php`, {
      method: 'POST',
      body: convert(member),
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 更新会员信息
export function updateMember (member) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/getMembers.service.php?action=update`, {
      method: 'POST',
      body: convert(member),
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 删除会员
export function deleteMember (memberId) {
  return new Promise((resolve, reject) => {
    fetch(url(memberapi, 'delete', 'memberId', memberId))
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
