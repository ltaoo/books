<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	include_once('public/mysqliConnect.php');
	$action = $_REQUEST['action'];
	//获取书籍列表
	if($action == 'getBookList'){
		// borrowTimes 是借阅次数
		// 在借阅记录表中，且借阅时间为已经归还的，
		$sql = "select bookId, bookTitle, bookIsbn, bookPrice, bookSummary, bookImg, createTime,
		(select count(*) from records where records.bookId = books.bookId) as borrowTimes,
		(select count(*) from records where records.bookId = books.bookId and returnTime is NULL) as bookState
		from books order by borrowTimes desc";
		// 怎么算书籍状态呢，书籍状态暂时分已借出和可借两种
		//$sql = "select * from books ";
		$results = $mysqli->query($sql);
		$books = array();
		while ($row = $results->fetch_assoc()) {
			$book = array(
				'bookId' => $row['bookId'],
				'bookTitle' => $row['bookTitle'],
				'bookIsbn' => $row['bookIsbn'],
				'bookPrice' => $row['bookPrice'],
				'borrowTimes' => $row['borrowTimes'],
				'returnTime' => $row['returnTime'],
				'bookSummary' => $row['bookSummary'],
				'bookState' => $row['bookState'],
				'bookImg' => $row['bookImg'],
				'createTime' => $row['createTime']
			);
			$books[] = $book;
		}
		$mysqli->close();
		die(json_encode($books));
	}elseif($action == 'index'){
		$sql = "select bookId, bookTitle, bookIsbn, bookPrice, bookSummary, bookImg, 
		(select count(*) from records where records.bookId = books.bookId) as borrowTimes,
		(select count(*) from records where records.bookId = books.bookId and returnTime is NULL) as bookState
		from books order by borrowTimes desc";
		$results = $mysqli->query($sql);
		$books = array();
		while ($row = $results->fetch_assoc()) {
			$book = array(
				'bookId' => $row['bookId'],
				'bookTitle' => $row['bookTitle'],
				'bookIsbn' => $row['bookIsbn'],
				'bookPrice' => $row['bookPrice'],
				'borrowTimes' => $row['borrowTimes'],
				'bookSummary' => $row['bookSummary'],
				'bookImg' => $row['bookImg'],
				'bookState' => $row['bookState']
			);
			$books[] = $book;
		}
		$mysqli->close();
		die(json_encode($books));
	}elseif($action == 'searchByIsbn'){
		//根据isbn码搜索商品
		$result = array();
		$books = array();
		$bookIsbn = $_REQUEST['bookIsbn'];
		$sql = "select bookId, bookTitle, bookIsbn, bookPrice, bookSummary, bookImg, createTime,
		(select borrowTime from records where records.bookId = books.bookId and records.returnTime = 0000-00-00) as borrowTime,
		(select count(*) from records where records.bookId = books.bookId and returnTime is NULL) as bookState
		from books where books.bookIsbn =" . $bookIsbn;
		$results = $mysqli->query($sql);
		//如果查询错误则返回相应信息
		if (!$results){
			//如果查询有问题,输入字母就会到这，就提示err；
			$result['state'] = 500;
			//die('Error: ' . mysql_error());
		}else{
			while ($row = $results->fetch_assoc()) {
				//var_dump($row);
				$a = array(
					'bookId' => $row['bookId'],
					'bookTitle' => $row['bookTitle'],
					'bookIsbn' => $row['bookIsbn'],
					'bookPrice' => $row['bookPrice'],
					'borrowTime' => $row['borrowTime'],
					'bookSummary' => $row['bookSummary'],
					'bookImg' => $row['bookImg'],
					'createTime' => $row['createTime'],
					'bookState' => $row['bookState']
				);
				$books[] = $a;
			}
		}
		if(count($books) == 0){
			$result['state'] = 404;
		}else{
			$result['state'] = 200;
		}
		$result['data'] = $books;
		//$results->free();
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByName'){
		//根据书籍名模糊查询
		$result = array();
		$books = array();
		$bookName = trim($_REQUEST['bookName']);
		if(!$bookName){
			$result['state'] = 504;
			die(json_encode($result));
		}
		$sql = "select bookId, bookTitle, bookIsbn, bookPrice, bookSummary, bookImg, createTime,
		(select borrowTime from records where records.bookId = books.bookId and records.returnTime is NULL) as borrowTime,
		(select count(*) from records where records.bookId = books.bookId and returnTime is NULL) as bookState
		from books where bookState = 0 and bookTitle like '%" . $bookName . "%'";
		$results = $mysqli->query($sql);
		//如果查询错误则返回相应信息
		if (!$results){
			//如果查询有问题,输入字母就会到这，就提示err；
			$result['state'] = 500;
			//die('Error: ' . mysql_error());
		}else{
			while ($row = $results->fetch_assoc()) {
				//var_dump($row);
				$a = array(
					'bookId' => $row['bookId'],
					'bookTitle' => $row['bookTitle'],
					'bookIsbn' => $row['bookIsbn'],
					'bookPrice' => $row['bookPrice'],
					'borrowTime' => $row['borrowTime'],
					'bookSummary' => $row['bookSummary'],
					'bookImg' => $row['bookImg'],
					'createTime' => $row['createTime'],
					'bookState' => $row['bookState']
				);
				$books[] = $a;
			}
		}
		if(count($books) == 0){
			$result['state'] = 404;
		}else{
			$result['state'] = 200;
		}
		$result['data'] = $books;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchById'){
		//根据id获取书籍信息
		$result = array();
		$book = array();
		$bookId = $_REQUEST['bookId'];
		$sql = "select bookId, bookTitle, bookIsbn, bookPrice, bookSummary, bookImg, createTime,
		(select count(*) from records where records.bookId = books.bookId) as borrowTimes,
		(select count(*) from records where records.bookId = books.bookId and records.returnTime is NULL) as returnTime,
		(select count(*) from records where records.bookId = books.bookId and returnTime is NULL) as bookState
		from books where bookId = '$bookId'";
		$results = $mysqli->query($sql);
		//根据id查询肯定只有一条记录
		
		//如果查询错误则返回相应信息
		if (!$results){
			//如果查询有问题,输入字母就会到这，就提示err；
			$result['state'] = 500;
			die('Error: ');
		}
		$row = $results->fetch_assoc();
		//var_dump($row);
		$book = array(
			'bookId' => $row['bookId'],
			'bookTitle' => $row['bookTitle'],
			'bookIsbn' => $row['bookIsbn'],
			'bookPrice' => $row['bookPrice'],
			'borrowTimes' => $row['borrowTimes'],
			'bookSummary' => $row['bookSummary'],
			'bookImg' => $row['bookImg'],
			'createTime' => $row['createTime'],
			'returnTime' => $row['returnTime'],
			'bookState' => $row['bookState']
		);
		$result['state'] = 200;
		$result['data'] = $book;
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'return'){
		//更新书籍为未借阅状态
		$bookId = $_REQUEST['bookId'];
		//echo $bookId;
		$sql = "UPDATE `books` SET `isBorrow` = '0' WHERE `books`.`bookId` =" . $bookId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		die(json_encode(200));
	}elseif($action == 'delete'){
		//删除记录
		$bookId = $_REQUEST['bookId'];
		$sql = 'DELETE FROM `books` WHERE `bookId` =' . $bookId;
		$results = $mysqli->query($sql);
		if($results){
		    //print 'Success! record updated / deleted'; 
		    $result['state'] = 'success';
		}else{
		    //print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
		    $result['state'] = 'err';
		}
		// close connection 
		$mysqli->close();
		die(json_encode($result));
	}
	//更新书籍状态
	elseif($action == 'updateState') {
		$bookId = $_REQUEST['bookId'];
		$state = $_REQUEST['state'];
		$sql = "UPDATE `books` 
			SET `bookState`= '$state' WHERE `bookId`=" . $bookId;
		$results = $mysqli->query($sql);

		//MySqli Delete Query
		//$results = $mysqli->query("DELETE FROM products WHERE ID=24");

		if($results){
		    //print 'Success! record updated / deleted'; 
		    $result['state'] = 'success';
		}else{
		    //print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
		    $result['state'] = 'err';
		}
		// close connection 
		$mysqli->close();
		die(json_encode($result));
	}
?>