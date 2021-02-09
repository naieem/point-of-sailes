FROM php:7.2-apache
RUN apt-get update && apt-get update -y
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN docker-php-ext-enable pdo_mysql
WORKDIR /var/www/html
COPY . ./