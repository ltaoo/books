<?php 
	header("content-type:text/html;charset=utf-8");
	//连接数据库
	//$link = mysqli_connect("localhost", "root", "", "bookshop");
	//实例化一个mysqli对象，返回连接成功对象$link。
	//echo "开始连接数据库";
	//Open a new connection to the MySQL server
	$mysqli = new mysqli('localhost','root','','bookshop');
	//连接数据库时要指定编码

	//Output any connection error
	if ($mysqli->connect_error) {
	    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	}

	$mysqli->query("SET NAMES utf8");
 ?>