<?php 
	header("content-type:text/html;charset=utf8");
	include_once('public/mysqliConnect.php');
	//var_dump($_POST);
	//书籍详细信息
	//书籍标题
	$bookTitle = $_POST['title'];
	$bookIsbn = $_POST['isbn13'];
	$bookPrice = $_POST['price'];
	$bookSummary = $_POST['summary'];
	$bookImg = $_POST['image'];
	$createTime = date('Y-m-d');
	$sql = "INSERT INTO `books`
		(`bookTitle`, `bookIsbn`, `bookPrice`, `bookSummary`, `bookImg`, `createTime`) 
		VALUES 
		('".$bookTitle."', '".$bookIsbn."', '".$bookPrice."', '".$bookSummary."', '".$bookImg."', '".$createTime."')";
	$insert_row = $mysqli->query($sql);
	//var_dump($insert_row);
	//如果添加成功，$results为true
	$result = array();
	if($insert_row){
	    //print 'Success! ID of last inserted record is : ' .$mysqli->insert_id .'<br />'; 
	    $bookId = $mysqli->insert_id;
	    //这个地方只要返回成功后的id就可以，查询就交给查询接口。
	    $result['bookId'] = $bookId;
	    //echo $bookId;
	}else{
	    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
	    $result['state'] = 500;
	    $result['mes'] =  $mysqli->error;
	}
	$mysqli->close();
	die(json_encode($result));
?>