/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : sd

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 10/07/2022 18:34:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for docker_endpoint
-- ----------------------------
DROP TABLE IF EXISTS `docker_endpoint`;
CREATE TABLE `docker_endpoint` (
  `id` varchar(128) NOT NULL,
  `name` varchar(256) DEFAULT '默认',
  `type` varchar(128) NOT NULL,
  `state` varchar(128) NOT NULL DEFAULT 'NORMAL',
  `host` varchar(512) DEFAULT '',
  `port` int DEFAULT '0',
  `latest_test_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='dockerEndpoint';

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `client_id` bigint NOT NULL,
  `user_id` bigint NOT NULL COMMENT '操作人ID',
  `name` varchar(128) NOT NULL DEFAULT '' COMMENT '操作人',
  `resource` varchar(128) NOT NULL COMMENT '操作资源类型',
  `content` text COMMENT '操作内容JSON',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='操作记录表';

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `value` varchar(256) NOT NULL,
  `version` varchar(128) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `salt_value` varchar(128) DEFAULT 'SALE',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
