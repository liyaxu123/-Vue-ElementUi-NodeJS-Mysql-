/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : studentdormitory

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-05-19 20:44:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banji
-- ----------------------------
DROP TABLE IF EXISTS `banji`;
CREATE TABLE `banji` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banji` varchar(30) NOT NULL,
  `xyid` int NOT NULL,
  `fdy` varchar(10) NOT NULL,
  `fdytel` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banji
-- ----------------------------
INSERT INTO `banji` VALUES ('1', '光电1班', '1', '李世民', '17382456788');
INSERT INTO `banji` VALUES ('2', '通信1班', '1', '打打球', '17354545535');
INSERT INTO `banji` VALUES ('3', '英语1班', '2', '3weqw', '17489739473');
INSERT INTO `banji` VALUES ('4', '临床1班', '3', '23231', '13734344111');
INSERT INTO `banji` VALUES ('5', '会计1班', '4', '321', '15232111111');
INSERT INTO `banji` VALUES ('6', '体操1班', '5', '111', '15323111111');
INSERT INTO `banji` VALUES ('7', '美声1班', '6', '2321', '13911111111');
INSERT INTO `banji` VALUES ('8', '美术1班', '7', '32121', '13733333333');
INSERT INTO `banji` VALUES ('9', '车辆工程', '8', '1111', '15233333333');
INSERT INTO `banji` VALUES ('10', '国际1班', '9', '111', '13711111111');

-- ----------------------------
-- Table structure for bxlb
-- ----------------------------
DROP TABLE IF EXISTS `bxlb`;
CREATE TABLE `bxlb` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `lynumber` char(255) NOT NULL,
  `sushe` varchar(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `bxdata` varchar(255) NOT NULL,
  `bxtime` varchar(255) NOT NULL,
  `bxdel` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `switchon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bxlb
-- ----------------------------
INSERT INTO `bxlb` VALUES ('1', '新区1号楼', '101', '贾玉', '13738275269', '2020-03-01', '	\r\n16:01:01', '空调坏了，不会转了', '1', '1');
INSERT INTO `bxlb` VALUES ('2', '新区2号楼', '101', '111', '13738223323', '2020-03-01', '	\r\n16:01:01', '空调坏了，不会转了', '1', '1');
INSERT INTO `bxlb` VALUES ('3', '新区1号楼', '102', '张天志', '15734567890', '2020-04-10', '17-30-20', '桌子坏了', '1', '1');
INSERT INTO `bxlb` VALUES ('4', '新区1号楼', '103', '贾玉', '13782478900', '2020-04-10', '17-35-20', '灯泡坏了', '1', '1');
INSERT INTO `bxlb` VALUES ('5', '新区1号楼', '101', '宋小宝', '13845678901', '2020-04-10', '17-37-33', '柜子坏了', '1', '1');
INSERT INTO `bxlb` VALUES ('6', '新区2号楼', '102', '上官发财', '17934567890', '2020-04-10', '18-46-44', '风扇坏了', '1', '1');
INSERT INTO `bxlb` VALUES ('7', '12323', '1233', '123', '13745678900', '2020-05-04', '21-47-59', '23131321', '1', '1');
INSERT INTO `bxlb` VALUES ('8', '12', '242342', '123123', '13756789000', '2020-05-14', '21-48-53', '343242423', '0', '0');

-- ----------------------------
-- Table structure for bxtj
-- ----------------------------
DROP TABLE IF EXISTS `bxtj`;
CREATE TABLE `bxtj` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `bxsh` double NOT NULL,
  `clgm` double NOT NULL,
  `lywh` double NOT NULL,
  `total` double NOT NULL,
  `lynumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bxtj
-- ----------------------------
INSERT INTO `bxtj` VALUES ('1', '贾宝玉', '137824567890', '1456.3', '1234', '111', '11111', '新区1号楼');
INSERT INTO `bxtj` VALUES ('2', '林黛玉', '13782456789', '1234', '5678', '8834', '34567', '新区2号楼');
INSERT INTO `bxtj` VALUES ('3', '张三', '13782456293', '111', '111', '111', '333', '新区3号楼');

-- ----------------------------
-- Table structure for lgpf
-- ----------------------------
DROP TABLE IF EXISTS `lgpf`;
CREATE TABLE `lgpf` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `pgf` varchar(255) NOT NULL,
  `fwf` varchar(255) NOT NULL,
  `zrx` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `lynumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lgpf
-- ----------------------------
INSERT INTO `lgpf` VALUES ('1', '贾宝玉', '2020-2-1 08:34:34', '8', '8', '8', '24', '新区1号楼');
INSERT INTO `lgpf` VALUES ('2', '林黛玉', '2020-2-1 9:18:25', '9', '9', '9', '27', '新区2号楼');
INSERT INTO `lgpf` VALUES ('3', '张三', '2020-04-1410-08-02', '9', '9', '9', '27', '新区3号楼');
INSERT INTO `lgpf` VALUES ('4', '张柳', '2020-04-14 10-08-02', '9', '9', '9', '27', '新区6号楼');
INSERT INTO `lgpf` VALUES ('5', '李四', '2020-04-14 10-17-35', '6', '7', '8', '21', '新区4号楼');
INSERT INTO `lgpf` VALUES ('6', '王五', '2020-04-14 10-17-35', '6', '8', '8', '22', '新区5号楼');
INSERT INTO `lgpf` VALUES ('7', '张无忌', '2020-04-14 10-18-37', '8', '9', '9', '26', '新区7号楼');
INSERT INTO `lgpf` VALUES ('8', '王八', '2020-04-14 10-18-37', '7', '7', '7', '21', '新区8号楼');
INSERT INTO `lgpf` VALUES ('9', '李九', '2020-04-14 10-18-37', '9', '9', '9', '27', '新区9号楼');

-- ----------------------------
-- Table structure for lynumber
-- ----------------------------
DROP TABLE IF EXISTS `lynumber`;
CREATE TABLE `lynumber` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `lynumber` varchar(255) NOT NULL,
  `leader` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lynumber` (`lynumber`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lynumber
-- ----------------------------
INSERT INTO `lynumber` VALUES ('1', '新区1号楼', '贾宝玉', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('2', '新区2号楼', '林黛玉', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('3', '新区3号楼', '贾政', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('4', '新区4号楼', '王熙凤', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('5', '新区5号楼', '薛宝钗', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('6', '新区6号楼', '孙悟空', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('7', '新区7号楼', '猪八戒', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('8', '新区8号楼', '唐三藏', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('9', '新区9号楼', '沙和尚', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('10', '新区10号楼', '宋江', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('11', '新区11号楼', '武松', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('12', '新区12号楼', '鲁智深', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('13', '新区13号楼', '曹操', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('14', '新区14号楼', '诸葛亮', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('15', '新区15号楼', '刘备', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('16', '新区16号楼', '张飞', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('17', '新区17号楼', '赵云', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('18', '新区18号楼', '貂蝉', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('19', '新区19号楼', '西施', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('20', '新区20号楼', '王思聪', '男', '13898238399', '1');
INSERT INTO `lynumber` VALUES ('22', '新区21号楼', '周芷若', '女', '13782456789', '1');
INSERT INTO `lynumber` VALUES ('23', '新区22号楼', '刘德华', '男', '13457864329', '1');
INSERT INTO `lynumber` VALUES ('24', '新区23号楼', '王天亮', '男', '13784567890', '1');
INSERT INTO `lynumber` VALUES ('25', '新区24号楼', '张无忌', '男', '13789348488', '1');
INSERT INTO `lynumber` VALUES ('26', '新区25号楼', '赵敏', '女', '13578788780', '1');
INSERT INTO `lynumber` VALUES ('27', '新区26号楼', '孙艺洲', '男', '13878979789', '1');
INSERT INTO `lynumber` VALUES ('28', '新区27号楼', '范冰冰', '女', '13789887887', '1');
INSERT INTO `lynumber` VALUES ('29', '老区1号楼', '秦明', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('30', '老区2号楼', '呼延灼', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('31', '老区3号楼', '花荣', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('32', '老区4号楼', '柴进', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('33', '老区9号楼', '李应', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('34', '老区15号楼', '董平', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('35', '老区5号楼', '皇甫端', '男', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('36', '老区6号楼', '香菱', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('37', '老区7号楼', '林之孝', '女', '13892453261', '1');
INSERT INTO `lynumber` VALUES ('38', '老区8号楼', '天赐', '男', '15798763589', '1');

-- ----------------------------
-- Table structure for sspf
-- ----------------------------
DROP TABLE IF EXISTS `sspf`;
CREATE TABLE `sspf` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `lynumber` varchar(255) NOT NULL,
  `sushe` varchar(255) NOT NULL,
  `xueyuan` varchar(255) NOT NULL,
  `banji` varchar(255) NOT NULL,
  `time` char(255) NOT NULL,
  `health` tinyint NOT NULL,
  `discipline` tinyint NOT NULL,
  `dormitoryculture` tinyint NOT NULL,
  `total` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sspf
-- ----------------------------
INSERT INTO `sspf` VALUES ('1', '新区1号楼', '101', '工院', '光电1班', '2020-4-9 08:35:24', '7', '8', '8', '23');
INSERT INTO `sspf` VALUES ('2', '新区1号楼', '102', '工院', '光电1班', '2020-4-9 10:23:32', '8', '8', '8', '24');
INSERT INTO `sspf` VALUES ('3', '新区2号楼', '101', '外院', '英语1班', '2020-2-9 14:25:46', '6', '7', '8', '21');
INSERT INTO `sspf` VALUES ('4', '新区2号楼', '102', '外院', '英语2班', '2020-4-5 15:46:24', '9', '9', '9', '27');
INSERT INTO `sspf` VALUES ('5', '新区1号楼', '103', '工院', '机械1班', '2019-11-24 09:30:34', '8', '8', '7', '23');
INSERT INTO `sspf` VALUES ('6', '新区1号楼', '104', '工院', '建筑11班', '2019-8-22 17:34:26', '6', '4', '8', '18');
INSERT INTO `sspf` VALUES ('7', '新区5号楼', '101', '医学院', '临床1班', '2020-4-8 11:09:25', '8', '9', '8', '25');
INSERT INTO `sspf` VALUES ('8', '老区1号楼', '101', '商学院', '会计1班', '2020-2-9 10:23:35', '8', '7', '9', '24');
INSERT INTO `sspf` VALUES ('9', '老区2号楼', '101', '商学院', '会计2班', '2020-3-20 09:10:30', '8', '8', '8', '24');
INSERT INTO `sspf` VALUES ('10', '新区1号楼', '105', '工院', '光电3班', '2020-1-20 09:20:25', '9', '9', '9', '27');

-- ----------------------------
-- Table structure for sushe
-- ----------------------------
DROP TABLE IF EXISTS `sushe`;
CREATE TABLE `sushe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sushe` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lyid` int NOT NULL,
  `ssz` varchar(10) NOT NULL,
  `sex` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sushe
-- ----------------------------
INSERT INTO `sushe` VALUES ('1', '101', '1', '张三', '男');
INSERT INTO `sushe` VALUES ('2', '102', '1', '李四', '男');
INSERT INTO `sushe` VALUES ('3', '103', '1', '王五', '男');
INSERT INTO `sushe` VALUES ('4', '104', '1', '李白', '男');
INSERT INTO `sushe` VALUES ('5', '105', '1', '杜甫', '男');
INSERT INTO `sushe` VALUES ('6', '106', '1', '王天霸', '男');
INSERT INTO `sushe` VALUES ('8', '101', '2', '222', '女');
INSERT INTO `sushe` VALUES ('9', '102', '2', '922', '女');
INSERT INTO `sushe` VALUES ('10', '103', '2', '111', '女');
INSERT INTO `sushe` VALUES ('11', '104', '2', '222', '女');
INSERT INTO `sushe` VALUES ('12', '105', '2', '222', '女');
INSERT INTO `sushe` VALUES ('13', '101', '3', '111', '男');
INSERT INTO `sushe` VALUES ('14', '102', '3', '111', '男');
INSERT INTO `sushe` VALUES ('15', '101', '4', '111', '女');
INSERT INTO `sushe` VALUES ('16', '101', '5', '111', '男');
INSERT INTO `sushe` VALUES ('17', '111', '6', '122', '女');
INSERT INTO `sushe` VALUES ('18', '111', '7', '111', '男');
INSERT INTO `sushe` VALUES ('19', '111', '8', '1111', '女');
INSERT INTO `sushe` VALUES ('20', '332', '9', '111', '男');
INSERT INTO `sushe` VALUES ('21', '111', '10', '11', '女');
INSERT INTO `sushe` VALUES ('22', '111', '11', '222', '男');
INSERT INTO `sushe` VALUES ('23', '11', '12', '222', '女');
INSERT INTO `sushe` VALUES ('24', '22', '13', '133', '男');
INSERT INTO `sushe` VALUES ('25', '12', '14', '122', '女');
INSERT INTO `sushe` VALUES ('26', '212', '15', '212', '男');
INSERT INTO `sushe` VALUES ('27', '21', '16', '222', '女');
INSERT INTO `sushe` VALUES ('28', '222', '17', '343', '男');
INSERT INTO `sushe` VALUES ('29', '123', '18', '231', '女');
INSERT INTO `sushe` VALUES ('30', '111', '19', '323', '男');
INSERT INTO `sushe` VALUES ('31', '2323', '20', '233', '女');
INSERT INTO `sushe` VALUES ('32', '3232', '21', '232', '男');
INSERT INTO `sushe` VALUES ('33', '223', '22', '231', '女');
INSERT INTO `sushe` VALUES ('34', '22', '23', '2331', '男');
INSERT INTO `sushe` VALUES ('35', '2423', '24', '42', '女');
INSERT INTO `sushe` VALUES ('36', '232', '25', '312', '男');
INSERT INTO `sushe` VALUES ('37', '232', '26', '321', '女');
INSERT INTO `sushe` VALUES ('38', '2131', '27', '1221', '男');
INSERT INTO `sushe` VALUES ('39', '2313', '28', 'ww', '女');
INSERT INTO `sushe` VALUES ('40', '2323', '29', '2323', '男');
INSERT INTO `sushe` VALUES ('41', '233', '30', '2323', '女');
INSERT INTO `sushe` VALUES ('42', '233', '31', '322', '男');
INSERT INTO `sushe` VALUES ('43', '23321', '32', '233', '女');
INSERT INTO `sushe` VALUES ('44', '123', '33', '321', '男');
INSERT INTO `sushe` VALUES ('45', '21', '34', '311', '女');
INSERT INTO `sushe` VALUES ('46', '23', '35', '231', '男');
INSERT INTO `sushe` VALUES ('47', '111', '36', '3223', '女');
INSERT INTO `sushe` VALUES ('48', '3123', '37', '2131', '男');
INSERT INTO `sushe` VALUES ('49', '201', '1', '201', '男');
INSERT INTO `sushe` VALUES ('50', '202', '1', '111', '男');
INSERT INTO `sushe` VALUES ('51', '301', '1', '111', '男');
INSERT INTO `sushe` VALUES ('52', '302', '1', '222', '男');
INSERT INTO `sushe` VALUES ('53', '401', '1', '1111', '男');
INSERT INTO `sushe` VALUES ('54', '402', '1', '1111', '男');
INSERT INTO `sushe` VALUES ('55', '501', '1', '111', '男');
INSERT INTO `sushe` VALUES ('56', '502', '1', '111', '男');
INSERT INTO `sushe` VALUES ('57', '601', '1', '123', '男');
INSERT INTO `sushe` VALUES ('58', '602', '1', '123', '男');
INSERT INTO `sushe` VALUES ('59', '201', '2', '201', '女');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(10) NOT NULL,
  `pass` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `xueyuan` varchar(20) DEFAULT NULL,
  `banji` varchar(20) DEFAULT NULL,
  `tel` char(11) NOT NULL,
  `sushe` varchar(10) DEFAULT NULL,
  `lynumber` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `fdy` varchar(10) DEFAULT NULL,
  `fdytel` varchar(11) DEFAULT NULL,
  `state` varchar(1) NOT NULL,
  `family` varchar(10) DEFAULT NULL,
  `familytel` varchar(11) DEFAULT NULL,
  `roler` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1601021001', '123456', '贾玉', '男', '工院', '光电1班', '13738275269', '101', '新区1号楼', '李世民', '17382456788', '1', '贾天下', '13738275269', '2');
INSERT INTO `user` VALUES ('2', '1601021002', '123456', '宋小宝', '男', '外国语学院', '日语1班', '13733333333', '101', '新区1号楼', '李世民', '17382456788', '1', '宋大宝', '13738275269', '2');
INSERT INTO `user` VALUES ('3', 'lgtest', '123', '林黛玉', '女', '医学院', '临床2班', '15738444444', '103', '新区1号楼', '李世民', '17382456788', '1', '林父', '13738275269', '1');
INSERT INTO `user` VALUES ('4', 'admin', '1234', '张小玉', '女', '音乐学院', '美声8班', '17318243658', '205', '新区1号楼', '李世民', '17382456788', '1', '张父', '13738275269', '0');
INSERT INTO `user` VALUES ('5', '1601021004', '123456', '洛天依', '女', '音乐学院', '舞蹈1班', '17343333333', '503', '新区1号楼', '李世民', '17382456788', '1', '洛父', '13738275269', '2');
INSERT INTO `user` VALUES ('6', '1601111111', '123456', '林冲', '男', '体院', '武术2班', '13722222222', '403', '新区2号楼', '李世民', '17382456788', '1', '林父', '13738275269', '2');
INSERT INTO `user` VALUES ('7', '1501411111', '123456', '武松', '男', '工院', '建筑1班', '13722222222', '304', '新区2号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('8', '1501011111', '123456', '宋江', '男', '商院', '外贸2班', '15733333333', '333', '新区2号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('9', '1601021011', '123456', '鲁智深', '男', '艺术设计学院', '美术1班', '13422222222', '503', '新区3号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('10', '1601022222', '1234556', '武则天', '女', '商院', '会计3班', '17922222222', '111', '新区3号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('11', '1601021005', '123456', '贾玉2', '男', '工院', '光电1班', '13738275269', '101', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('12', '1601021006', '123456', '贾玉3', '男', '工院', '光电1班', '13738275269', '101', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('13', '1601021007', '123456', '贾玉4', '男', '工院', '光电1班', '13738275269', '101', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('14', '1601021008', '123456', '贾玉5', '男', '工院', '光电1班', '13738275269', '101', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('15', '1601021009', '123456', '贾玉6', '男', '工院', '光电1班', '13738275269', '101', '新区1号楼', '李世民', '17382456788', '0', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('16', '1601021010', '123456', '林黛玉2', '女', '医学院', '临床2班', '15738444444', '103', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('17', '1601021011', '123456', '林黛玉3', '女', '医学院', '临床2班', '15738444444', '103', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('18', '1601021011', '123456', '林黛玉4', '女', '医学院', '临床2班', '15738444444', '103', '新区1号楼', '李世民', '17382456788', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('19', '1601021029', '123456', '李2蛋', '男', '工院', '光电1班', '17319767008', '102', '新区1号楼', '黄4梅', '17319737088', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('20', '1601021022', '123456', '李小南', '男', '工院', '光电1班', '17319797088', '102', '新区1号楼', '黄9梅', '17319797088', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('21', '1601011000', '123456', '王天霸', '男', '工院', '光电2班', '18237965423', '102', '新区1号楼', '战天雷', '18237965423', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('22', '1501021022', '123456', '陆小千', '男', '交通学院', '车辆1班', '15010210221', '102', '新区1号楼', '李世民', '15010210221', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('23', '1201021000', '123456', '猪八戒', '男', '医学院', '临床1班', '13978654232', '102', '新区1号楼', '唐僧', '13978654232', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('24', '1021021020', '123456', '沙僧', '男', '医学院', '临床3班', '13785678900', '102', '新区1号楼', '唐僧', '13785678900', '1', '张三', '13738275269', '2');
INSERT INTO `user` VALUES ('25', '1401021011', '123456', '上官婉儿', '女', '工院', '光电', '17312345678', '101', '新区2号楼', '张天爱', '17312345678', '1', '上官发财', '17312345678', '2');
INSERT INTO `user` VALUES ('26', '1701021011', '123456', '陈咬金', '男', '工院', '光电', '15212345678', '101', '新区3号楼', '李世民', '1701021011', '1', '陈父', '1701021011', '2');

-- ----------------------------
-- Table structure for xueyuan
-- ----------------------------
DROP TABLE IF EXISTS `xueyuan`;
CREATE TABLE `xueyuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `xueyuan` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xueyuan
-- ----------------------------
INSERT INTO `xueyuan` VALUES ('1', '工院');
INSERT INTO `xueyuan` VALUES ('2', '外国语学院');
INSERT INTO `xueyuan` VALUES ('3', '医学院');
INSERT INTO `xueyuan` VALUES ('4', '商贸学院');
INSERT INTO `xueyuan` VALUES ('5', '体育学院');
INSERT INTO `xueyuan` VALUES ('6', '音乐学院');
INSERT INTO `xueyuan` VALUES ('7', '艺术设计学院');
INSERT INTO `xueyuan` VALUES ('8', '交通学院');
INSERT INTO `xueyuan` VALUES ('9', '国际学院');

-- ----------------------------
-- Table structure for yhqx
-- ----------------------------
DROP TABLE IF EXISTS `yhqx`;
CREATE TABLE `yhqx` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `roler` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yhqx
-- ----------------------------
INSERT INTO `yhqx` VALUES ('1', 'admin', '男', '13738174500', '0', '1');
INSERT INTO `yhqx` VALUES ('2', '张三', '男', '13738174500', '1', '1');
INSERT INTO `yhqx` VALUES ('3', '贾宝玉', '男', '13738174500', '1', '1');
INSERT INTO `yhqx` VALUES ('4', '林黛玉', '女', '13738174500', '1', '1');
INSERT INTO `yhqx` VALUES ('5', '黎小田', '男', '17338478585', '1', '0');
INSERT INTO `yhqx` VALUES ('6', '王晓伟', '男', '13982456293', '1', '1');
INSERT INTO `yhqx` VALUES ('7', '李小天', '男', '13839756493', '1', '1');
INSERT INTO `yhqx` VALUES ('8', '陆小凤', '男', '13782156789', '1', '1');
INSERT INTO `yhqx` VALUES ('9', '花满楼', '男', '15738174890', '1', '1');
