#!/bin/sh

# Run the MySQL container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo "Starting DB..."  
# 配置 mysql 超级用户密码 数据库名 用户名 密码
docker run --name books_db -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=bookshop -d bookshop

# Wait for the database service to start up.
# echo "Waiting for DB to start up..."  
# docker exec books_db mysqladmin --silent --wait=30 -uroot -p123 ping || exit 1

# Run the setup script.
# echo "Setting up initial data..."  
# 将 setup.sql 导入 bookshop 表
# docker exec -i books_db mysql -uroot -p123 bookshop < setup.sql

# 开启 php 服务
echo "Starting php server"
docker run --name books -v $PWD/service:/app --link books_db:mysql -p 8123:80 -d tutum/apache-php
