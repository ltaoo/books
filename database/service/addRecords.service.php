<?php 
	header("content-type:text/html;charset=utf8");
	include_once('public/mysqliConnect.php');
	//var_dump($_POST);
	//书籍详细信息
	$bookId = $_POST['bookId'];
	//会员详细信息
	$memberId = $_POST['memberId'];
	$borrowTime = date('Y-m-d');
	$sql = "INSERT INTO `records`
		(`memberId`, `bookId`, `borrowTime`) 
		VALUES 
		('$memberId', '$bookId', '$borrowTime')";
	$insert_row = $mysqli->query($sql);
	//var_dump($insert_row);
	//如果添加成功，$results为true
	if($insert_row){
	    //print 'Success! ID of last inserted record is : ' .$mysqli->insert_id .'<br />'; 
	    $recordId = $mysqli->insert_id;
	    //这个地方只要返回成功后的id就可以，查询就交给查询接口。
	    $result = array();
	    $result['recordId'] = $recordId;
	    // 然后是更新会员表
	    //echo $bookId;
	}else{
	    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
	    $result['state'] = 500;
	    $result['mes'] = 'add record is fail';
	}
	$mysqli->close();
	die(json_encode($result));
?>