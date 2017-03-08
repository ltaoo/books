<?php 
	header("content-type:text/html;charset=utf8");
	// var_dump($_POST);
	include_once('public/mysqliConnect.php');
	$memberName = $_POST['memberName'];
	$memberNum = $_POST['memberNum'];
	$memberTel = $_POST['memberTel'];
	$memberAddress = $_POST['memberAddress'];
	$memberRank = $_POST['memberRank'];
	$memberCreateTime = date('Y/m/d');
	$sql = "INSERT INTO `members`( `memberName`, `memberNum`, `memberTel`, `memberAddress`, `memberRank`, `memberCreateTime`) 
	VALUES ('$memberName','$memberNum', '$memberTel', '$memberAddress', '$memberRank', '$memberCreateTime')";
	$insert_row = $mysqli->query($sql);
	//var_dump($insert_row);
	//如果添加成功，$results为true
	if($insert_row){
	    //print 'Success! ID of last inserted record is : ' .$mysqli->insert_id .'<br />'; 
	    $memberId = $mysqli->insert_id;
	    //这个地方只要返回成功后的id就可以，查询就交给查询接口。
	    $result = array();
	    $result['memberId'] = $memberId;
	    //echo $bookId;
	}else{
	    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
	    $result['state'] = 500;
	    $result['mes'] =  $mysqli->error;
	}
	$mysqli->close();
	die(json_encode($result));
?>