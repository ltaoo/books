-- drop table if exists `members`;
create table if not exists `members`(
	memberId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	memberName TEXT, 
	memberNum TEXT, 
	memberTel TEXT, 
	memberAddress TEXT, 
	memberRank INT, 
	memberCreateTime DATE);
insert into members (memberName, memberNum, memberTel, memberAddress, memberRank, memberCreateTime) values (
	'ltaoo', 
	'123456', 
	'123456', 
	'8-8-218', 
	1,
	'2015-10-20');
-- drop table if exists `books`;
create table if not exists `books` (bookId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	bookTitle TEXT, 
	bookIsbn TEXT, 
	bookPrice INT,
	bookSummary TEXT, 
	bookImg TEXT, 
	bookState INT DEFAULT 0, 
	createTime DATE);
insert into books (bookTitle, bookIsbn, bookPrice, bookSummary, bookImg, bookState, createTime) values (
	'React Native入门与实战',
	'9787115411914',
	'79',
	'本书共4部分，首先简要介绍了React Native的开发基础知识，然后介绍了React Native的API、组件以及Native扩展和组件的封装，接着介绍了App的动态更新和上架过程，最后通过3个案例介绍了如何使用React Native开发原生App。',
	'https://img1.doubanio.com/mpic/s29105337.jpg',
	1,
	'2017-03-08'
);
-- drop table if exists `records`;
create table if not exists `records` (recordId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	memberId INT, 
	bookId INT, 
	borrowTime DATE, 
	returnTime DATE);
-- drop table if exists `orders`;
create table if not exists `orders` (orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	memberId TEXT, 
	booklist TEXT, 
	message TEXT, 
	orderState INT, 
	createTime DATE);
-- drop table if exists `carts`;
create table if not exists `carts` (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	bookId INT, 
	bookPrice TEXT, 
	bookTitle TEXT,
	cartSession TEXT);
-- drop table if exists `comments`;
create table if not exists `comments` (commentId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	bookIsbn TEXT, 
	content TEXT, 
	memberId INT, 
	createTime DATE);
-- drop table if exists `admin`;
create table if not exists `admin` (
	adminId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	adminName TEXT, 
	adminPassword TEXT, 
	rank INT);
insert into admin (adminName, adminPassword, rank) values (
	'admin', 
	'123456', 
	0);
