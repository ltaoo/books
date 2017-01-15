# books
第一个在github上的项目，也是我的毕业设计，一个图书管理、借阅、销售网站。

## 使用

先将代码下载
```bash
git clone https://github.com/ltaoo/books.git
```

会在当前目录生成`books`文件夹，进入该文件夹安装依赖
```bash
npm i
```

安装依赖完成后需要使用 docker 运行 php 容器和 mysql 容器提供接口，进入`books/database`文件夹
```bash
./start.sh
```

会开启名为`books`的`php`容器和名为`books_db`的`mysql`容器，再初始化数据表
```bash
docker exec -i books_db mysql -uroot -p123 bookshop < setup.sql
```

然后就可以运行前端开发服务器了
```bash
npm run dev
```

## 功能

### 后台管理

进入`http://localhost:8080/#!/adminLogin`，使用`admin`，`123456`登陆后台。

### 书籍管理
登陆后台后可以进入"书籍列表"添加新书籍，点击"添加新书籍"，输入书籍名称或者 ISBN 码搜索后添加。
> 由于数据库编码问题只能添加不包含中文信息的书籍。

添加书籍成功后可以在前台首页看到新添加的书籍。

### 用户登录

在前台首页点击"用户中心"使用`123456`和`123456`即可登录，登陆后可以查看个人信息。



