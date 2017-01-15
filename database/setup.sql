-- drop table if exists `members`;
create table if not exists `members`(
	memberId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	memberName TEXT, 
	memberNum TEXT, 
	memberTel TEXT, 
	memberAddress TEXT, 
	memberRank INT, 
	memberCreateTime DATE);
insert into members (memberName, memberNum, memberTel, memberAddress, memberRank) values (
	'ltaoo', 
	'123456', 
	'123456', 
	'8-8-218', 
	1);
-- drop table if exists `books`;
create table if not exists `books` (bookId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	bookTitle TEXT, 
	bookIsbn TEXT, 
	bookPrice INT,
	bookSummary TEXT, 
	bookImg TEXT, 
	bookState INT DEFAULT 0, 
	createTime DATE);
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
	bookPrice INT, 
	cartSession TEXT);
-- drop table if exists `comments`;
create table if not exists `comments` (commentId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	bookIsbn TEXT, 
	content TEXT, 
	memberId INT, 
	createTime DATE);
-- drop table if exists `admin`;
create table if not exists `admin` (adminId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	adminName TEXT, 
	adminPassword TEXT, 
	rank INT);
insert into admin (adminName, adminPassword, rank) values (
	'admin', 
	'123456', 
	0);
