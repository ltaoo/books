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
	    //如果添加成功，再去更新book和member表
	    //首先获取到该用户当前的memberBorrowNum的值，加一后写入。
	    $sql = "SELECT memberBorrowNum,memberBorrowTimes
	    	FROM `members`
	    	WHERE `memberId` =". $memberId;
	    $result1 = $mysqli->query($sql);
	    if($result1){
	    	$member = array();
	    	//如果有记录
	    	while($row = $result1->fetch_assoc()) {
	    	    $member = array(
	    			'memberBorrowNum' => $row['memberBorrowNum'],
	    			'memberBorrowTimes' => $row['memberBorrowTimes']
	    	    );
	    	}
	    	//这里还应该对用户的等级和已借阅数量在做一次检验，但是后台是管理员操作，所以可以不用。
	    	//应该对用户的输入持最谨慎的态度
	    	$member['memberBorrowNum'] += 1;
	    	$member['memberBorrowTimes'] += 1;
	    	//echo $newMemberBorrowNum;
	    	//echo $bookId;
	    	$sql = "UPDATE `members` 
	    		SET `memberBorrowNum` = " . $member['memberBorrowNum'] . ",`memberBorrowTimes` = " . $member['memberBorrowTimes'] . "
	    		WHERE `memberId` = " . $memberId;
	    	$result2 = $mysqli->query($sql);
	    	if($result2){
	    		$result['state'] = 200;
	    	}else{
	    		$result['mes'] = 'update memberTable is fail';
	    		$result['state'] = 500;
	    	}
	    }else{
	    	$result['state'] = 500;
	    	$result['mes'] = 'not found book';
	    	die(json_encode($result));
	    }
	    $sql = "SELECT borrowTimes
	    	FROM `books`
	    	WHERE `bookId` =". $bookId;
	    $result3 = $mysqli->query($sql);
	    if($result3){
	    	$book = array();
	    	while ($row = $result3->fetch_assoc()) {
	    		$book = array(
	    			'borrowTimes' => $row['borrowTimes']
	    		);
	    	}
	    	$book['borrowTimes'] += 1;
	    	$sql = "UPDATE `books` 
	    		SET `borrowTimes` = " . $book['borrowTimes'] . ",`isBorrow` = '1' 
	    		WHERE `books`.`bookId` =" . $bookId;
	    	$result4 = $mysqli->query($sql);
	    	if(!$result4){
	    		$result['state'] = 500;
	    		$result['mes'] = 'update borrowTimes of book is fail';
	    		die(json_encode($result));
	    	}
	    }
	    //echo $bookId;
	}else{
	    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
	    $result['state'] = 500;
	    $result['mes'] = 'add record is fail';
	}
	$mysqli->close();
	die(json_encode($result));
?>