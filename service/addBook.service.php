<?php 
	header("content-type:text/html;charset=utf8");
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