<?php 
	header("content-type:text/html;charset=utf-8");
	// 默认地址为 localhost
	$serverName = env("MYSQL_PORT_3306_TCP_ADDR", "localhost");
	// 默认数据库名为 bookshop
	$databaseName = env("MYSQL_INSTANCE_NAME", "bookshop");
	// 默认用户名为 root
	$username = env("MYSQL_USERNAME", "root");
	// 默认密码为空
	$password = env("MYSQL_PASSWORD", "123");

	/**
	* 获取环境变量
	* @param $key
	* @param null $default
	* @return null|string
	*/
	function env($key, $default = null) {
		$value = getenv($key);
		if ($value === false) {
			return $default;
		}
		return $value;
	}
	//连接数据库
	//$link = mysqli_connect("localhost", "root", "", "bookshop");
	//实例化一个mysqli对象，返回连接成功对象$link。
	//echo "开始连接数据库";
	//Open a new connection to the MySQL server
	$mysqli = new mysqli($serverName, $username, $password, $databaseName);
	//连接数据库时要指定编码

	//Output any connection error
	if ($mysqli->connect_error) {
	    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	}

	$mysqli->query("SET NAMES utf8");
 ?>