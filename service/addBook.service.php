<?php 
	header("content-type:text/html;charset=utf8");
	include_once('public/mysqliConnect.php');
	//var_dump($_POST);
	//书籍详细信息
	$bookTitle = $_POST['title'];
	//会员详细信息
	$memberId = $_POST['memberId'];
	$createTime = date('Y-m-d');
	$sql = "INSERT INTO `records`
		( `memberId`, `bookId`, `borrowTime`) 
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
	    //echo $bookId;
	}else{
	    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
	    $result['state'] = 500;
	    $result['mes'] = 'add record is fail';
	}
	$mysqli->close();
	die(json_encode($result));





	include_once('public/connectDb.php');
	$bookTitle = $_POST['title'];
	$bookIsbn = $_POST['isbn13'];
	$bookImg = $_POST['image'];
	$result = array();
	$sql = "INSERT INTO `books`( `bookTitle`, `bookIsbn`, `bookImg`) VALUES ('$bookTitle','$bookIsbn', '$bookImg')";

	if (!mysql_query($sql,$con)){
	  	//die('Error: ' . mysql_error());
		die(json_encode($result['state'] = 'err'));
	}
	//header("Location:index.php");
	$bookId = mysql_insert_id();
	//这个地方只要返回成功后的id就可以，查询就交给查询接口。
	$result['state'] = 'success';
	$result['id'] = $bookId;
	mysql_close($con);
	die(json_encode($result));
?>