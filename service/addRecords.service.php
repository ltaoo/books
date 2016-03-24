<?php 
	header("content-type:text/html;charset=utf8");
	include_once('public/connectDb.php');
	//书籍详细信息
	$bookId = $_POST['book']['bookId'];
	$bookIsbn = $_POST['book']['bookIsbn'];
	$bookName = $_POST['book']['bookName'];
	$bookImg = $_POST['book']['bookImg'];
	//会员详细信息
	$memberId = $_POST['member']['memberId'];
	$memberNum = $_POST['member']['memberNum'];
	$memberName = $_POST['member']['memberName'];
	$memberRank = $_POST['member']['memberRank'];
	$memberCreateTime = $_POST['member']['memberCreateTime'];
	$borrowTime = date('Y-m-d');
	$sql = "INSERT INTO `records`
		( `memberId`, `memberNum`, `memberName`, `memberRank`, `memberCreateTime`, `bookId`,  `bookIsbn`, `bookName`, `bookImg`,`borrowTime`) 
		VALUES 
		('$memberId', '$memberNum', '$memberName', '$memberRank', '$memberCreateTime', '$bookId',  '$bookIsbn', '$bookName', '$bookImg', '$borrowTime')";
	if (!mysql_query($sql,$con)){
	  die('Error: ' . mysql_error());
	}
	//header("Location:index.php");
	die('success');
	mysql_close($con);
?>