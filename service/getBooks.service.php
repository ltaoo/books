<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	include_once('public/mysqliConnect.php');
	$action = $_REQUEST['action'];
	//获取书籍列表
	if($action == 'bookList'){
		$sql = "select bookId, bookName, bookIsbn, borrowTimes, isBorrow, bookImg, 
		(select borrowTime from records r where r.bookId = b.bookId) as borrowTime
		from books b order by borrowTimes desc";
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		$books = array();
		while ($row = mysql_fetch_row($res)) {
			$book = array(
				'bookId' => $row[0],
				'bookName' => $row[1],
				'bookIsbn' => $row[2],
				'bookTimes' => $row[3],
				'isBorrow' => $row[4],
				'bookImg' => $row[5]
			);
			$books[] = $book;
		}
		mysql_close($con);
		die(json_encode($books));
	}elseif($action == 'searchByIsbn'){
		//根据isbn码搜索商品
		$result = array();
		$books = array();
		$bookIsbn = $_REQUEST['bookIsbn'];
		$sql = "select bookId, bookTitle, bookIsbn, borrowTimes, bookImg, 
		(select borrowTime from records where records.bookId = books.bookId and records.returnTime = 0000-00-00) as borrowTime
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
					'bookName' => $row['bookTitle'],
					'bookIsbn' => $row['bookIsbn'],
					'borrowTimes' => $row['borrowTimes'],
					'bookImg' => $row['bookImg'],
					'borrowTime' => $row['borrowTime']
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
		$sql = "select bookId, bookTitle, bookIsbn, borrowTimes, bookImg, 
		(select borrowTime from records where records.bookId = books.bookId and records.returnTime = 0000-00-00) as borrowTime
		from books where bookTitle like '%" . $bookName . "%'";
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
					'borrowTimes' => $row['borrowTimes'],
					'bookImg' => $row['bookImg'],
					'borrowTime' => $row['borrowTime']
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
	}elseif($action == 'getDetail'){
		//根据id获取书籍信息
		$bookId = $_REQUEST['bookId'];
		$sql = "select * from books where bookId =" . $bookId;
		if (!mysql_query($sql,$con)){
			//die('Error: ' . mysql_error());
			die(json_encode($result['state'] = 'err'));
		}
		$res = mysql_query($sql);
		$book = array();
		while ($row = mysql_fetch_row($res)) {
			//var_dump($row);
			$a = array(
				'bookId' => $row[0],
				'bookName' => $row[1],
				'bookIsbn' => $row[2],
				'bookTimes' => $row[3],
				'isBorrow' => $row[4],
				'bookImg' => $row[5]
			);
			$book = $a;
		}
		$result['state'] = 'success';
		$result['data'] = $book;
		mysql_close($con);
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
		$result = array();
		$sql = 'DELETE FROM `books` WHERE `bookId` =' . $bookId;
		if (!mysql_query($sql,$con)){
			//die('Error: ' . mysql_error());
			die(json_encode($result['state'] = 'err'));
		}
		$res = mysql_query($sql);
		mysql_close($con);
		$result['state'] = 'success';
		die(json_encode($result));
	}
?>