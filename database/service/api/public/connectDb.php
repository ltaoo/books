<?php
	header("content-type:text/html;charset=utf8");
	//开始连接数据库
	$con = mysql_connect("localhost","root","");
	if (!$con){
	  	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("bookshop", $con);
	mysql_query('set names utf8');
?>