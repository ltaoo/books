# books
# 基础镜像
FROM php:5.6-apache
# 安装 PHP 的 MySql 拓展依赖
RUN docker-php-ext-install pdo_mysql
# 将 PHP 代码复制到容器内
COPY ./ /var/www/html