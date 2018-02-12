一个图书管理、借阅、销售网站。

前端使用`vue`，后端原先是`PHP`，准备用`Python`、`Kotlin`等后端语言重写后端部分（为了学习），所以从该仓库移除后端代码，只保留前端代码。

## 使用

先开启后端服务，参考[后端服务 Python 版](https://github.com/ltaoo/books_server_python)

后端启动后，就可以跑前端代码了。

`clone`代码后安装依赖并运行即可

```bash
git clone https://github.com/ltaoo/books.git
cd books
yarn
```

依赖安装好后就可以运行前端开发服务器了

```bash
npm run dev
```

## 功能

### 后台

#### 管理员登录

进入`http://localhost:8080/#/adminLogin`，使用`admin`，`123456`登陆后台。

#### 书籍管理
登陆后台后可以进入"书籍列表"添加新书籍，点击"添加新书籍"，输入书籍名称或者 ISBN 码搜索后添加。
添加书籍成功后可以在前台首页与书籍列表页看到新添加的书籍。

![书籍列表](http://upload-images.jianshu.io/upload_images/3531509-181726281c07153c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 添加新书籍

![新增图书](http://upload-images.jianshu.io/upload_images/3531509-9ac7b0fd87c40001.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 会员管理

登录后台后可以进入"会员列表"添加新会员，同上。可以使用新增加会员的**学号**和**联系方式**作为前台登录用户名和密码进行登录。

![会员列表](http://upload-images.jianshu.io/upload_images/3531509-bc87f4ba32ec6ccc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 书籍借阅

在后台首页，首先查询好会员，再查询需要借阅的书籍，点击借阅即可生成借阅记录。

![借阅图书](http://upload-images.jianshu.io/upload_images/3531509-29d746c7fe5b9b73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 借阅记录管理

用户借了书后，会生成对应的借阅记录，可以直接在后台看到该借阅记录状态，未还、已还还是已经超期。如果已经归还则会显示归还时间。

![借阅记录](http://upload-images.jianshu.io/upload_images/3531509-7950b0391519da6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 书籍归还

可以在后台还书页，使用会员名、书籍名、书籍 ISBN 码进行查询借阅记录，并选择相应记录进行归还操作。

![归还书籍](http://upload-images.jianshu.io/upload_images/3531509-54bebc86bef18602.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 前台

#### 用户登录

在前台首页点击"用户中心"使用`123456`和`123456`即可登录。

#### 添加到购物车


![添加到购物车](http://upload-images.jianshu.io/upload_images/3531509-e1098529a973948c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 生成订单

![生成订单](http://upload-images.jianshu.io/upload_images/3531509-77b5eb9425935e45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 个人中心

##### 个人信息


![个人信息](http://upload-images.jianshu.io/upload_images/3531509-68b136469631a80f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 订单列表

![订单列表](http://upload-images.jianshu.io/upload_images/3531509-4a96838525d7915c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
