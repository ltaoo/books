<?php 
	header("content-type:text/html;charset=utf8");
	//var_dump($_POST);
	include_once('public/connectDb.php');
	$memberName = $_POST['memberName'];
	$memberNum = $_POST['memberNum'];
	$memberTel = $_POST['memberTel'];
	$memberAddress = $_POST['memberAddress'];
	$memberRank = $_POST['memberRank'];
	$memberCreateTime = date('Y/m/d');
	$sql = "INSERT INTO `members`( `memberName`, `memberNum`, `memberTel`, `memberAddress`, `memberRank`, `memberCreateTime`) 
	VALUES ('$memberName','$memberNum', '$memberTel', '$memberAddress', '$memberRank', '$memberCreateTime')";
	if (!mysql_query($sql,$con)){
		//die('Error: ' . mysql_error());
		$result['state'] = 'err';
		die(json_encode($result));
	}
	//header("Location:index.php");
	//如果插入数据成功
	//$res = mysql_query($sql,$con);
	$memberId = mysql_insert_id();
	//这个地方只要返回成功后的id就可以，查询就交给查询接口。
	$result = array();
	$result['state'] = 'success';
	$result['id'] = $memberId;
	mysql_close($con);
	die(json_encode($result));
?>