<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	//连接数据库
	include_once('public/mysqliConnect.php');
	$action = $_REQUEST['action'];
	// 获取借阅记录列表
	if($action == 'recordsList'){
		$sql = "select * from records, books, members 
		where records.bookId = books.bookId and records.memberId = members.memberId";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			die(json_encode($result['state']=500));
		}
		$records = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberTel' => $row['memberTel'],
				'memberAddress' => $row['memberAddress'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime'],
				'returnTime' => $row['returnTime']
			);
			$records[] = $record;
		}
		if(count($records) == 0){
			$result['state'] = 404;
		}else{
			$result['state'] = 200;
			$result['data'] = $records;
		}
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByBookId'){
		//根据书籍id码查询记录
		$bookId = $_REQUEST['bookId'];
		$sql = "select * from records
		where bookId = '$bookId' and returnTime is NULL";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			die(json_encode($result['state']=500));
		}
		$record = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'bookId' => $row['bookId']
			);
			$record = $record;
		}
		$result['state'] = 200;
		$result['data'] = $record;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'serachByIsbn'){
		//根据书籍isbn码查询记录
		$bookIsbn = $_REQUEST['bookIsbn'];
		$sql = "select * from records, books, members 
		where records.bookId = books.bookId and records.memberId = members.memberId and records.returnTime is NULL and books.bookIsbn like '%".$bookIsbn."'";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			die(json_encode($result['state']=500));
		}
		$records = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime']
			);
			$records[] = $record;
		}
		$result['data'] = $records;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByTitle'){
		//echo 'hello world';
		//exit;
		$result = array();
		//根据书籍名查询记录
		$bookTitle = $_REQUEST['bookTitle'];
		$sql = "select * from records, books, members 
		where records.bookId = books.bookId and records.memberId = members.memberId and records.returnTime is NULL and books.bookTitle like '%".$bookTitle."%'";
		//echo $sql;
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			die(json_encode($result['state']=500));
		}
		$records = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime']
			);
			$records[] = $record;
		}
		$result['data'] = $records;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByName'){
		$result = array();
		//根据会员名查询记录
		$memberName = $_REQUEST['memberName'];
		$sql = "select * from records, books, members 
		where records.bookId = books.bookId and records.memberId = members.memberId and records.returnTime is NULL and members.memberName like '%".$memberName."'";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			$result['data'] = array();
		}
		$records = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime']
			);
			$records[] = $record;
		}
		$result['data'] = $records;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByNumber'){
		$result = array();
		//根据会员学号查询记录
		$memberNum = $_REQUEST['memberNum'];
		$sql = "select * from records, books, members 
		where records.bookId = books.bookId and records.memberId = members.memberId and records.returnTime is NULL and members.memberNum like '%".$memberNum."'";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			$result['data'] = array();
		}
		$records = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime']
			);
			$records[] = $record;
		}
		$result['data'] = $records;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchRecordsByMemberId'){
		$result = array();
		//根据会员学号查询记录
		$memberId = $_REQUEST['memberId'];
		$sql = "select * from records, books, members 
		where records.bookId = books.bookId and records.memberId = members.memberId and members.memberId = '$memberId'";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			$result['data'] = array();
		}
		$records = array();
		while($row = $results->fetch_assoc()){
			//var_dump($row);
			$record = array(
				'recordId' => $row['recordId'],
				'returnTime' => $row['returnTime'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime']
			);
			$records[] = $record;
		}
		$result['data'] = $records;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByMemberId'){
		$result = array();
		//根据会员学号查询记录
		$memberId = $_REQUEST['memberId'];
		/*$sql = "select * from records, books, members
		where records.bookId = books.bookId and records.memberId = members.memberId and records.returnTime is NULL and members.memberId = '$memberId'";*/
		$sql = "select bookTilte
		from books where books.bookId = (select bookId from records where records.memberId = '$memberId')";
		//先从records中查询是否存在借阅记录
		$sql = "select * from records where records.memberId = '$memberId' and records.returnTime is NULL";
		$results = $mysqli->query($sql);
		//如果查询执行不正确则返回false
		if(!$results){
			die(json_encode($result['state']=500));
		}
		//$records = array();
		$row = $results->fetch_row();
		//var_dump($row);
		if($row){
			//如果查询到记录
			$sql = "select * from records, books, members 
			where records.bookId = books.bookId and records.memberId = members.memberId and records.returnTime is NULL and members.memberId = '$memberId'";
			$results = $mysqli->query($sql);
			$row = $results->fetch_assoc();
			//var_dump($row);
			//exit;
			$record = array(
				'recordId' => $row['recordId'],
				'memberId' => $row['memberId'],
				'memberNum' => $row['memberNum'],
				'memberName' => $row['memberName'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'bookId' => $row['bookId'],
				'bookIsbn' => $row['bookIsbn'],
				'bookTitle' => $row['bookTitle'],
				'bookImg' => $row['bookImg'],
				'borrowTime' => $row['borrowTime']
			);
			$result['state'] = 200;
			$result['data'] = $record;
		}else{
			//没有正在借阅的借阅记录
			$result['data'] = array();
		}
		/*while($row = $results->fetch_assoc()){
			var_dump($row);
		}
		exit;*/
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'update'){
		$recordId = $_REQUEST['recordId'];
		$time = date('Y-m-d');
		//UPDATE `records` SET `returnTime` = '2015-12-30' WHERE `records`.`recordId` =7
		$sql = "UPDATE `records` SET `returnTime` = '$time' WHERE `records`.`recordId` =" . $recordId;
		$results = $mysqli->query($sql);
		$mysqli->close();
		die(json_encode($result));
	}
?>