drop database if exists litemall;
-- 支持emoji：需要mysql数据库参数： character_set_server=utf8mb4
create database litemall default character set utf8mb4 collate utf8mb4_unicode_ci;
use litemall;
create user 'root'@'localhost' identified by 'qq1212';
grant all privileges on litemall.* to 'root'@'localhost';
flush privileges;