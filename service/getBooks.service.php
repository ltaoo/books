<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	include_once('public/connectDb.php');
	$action = $_REQUEST['action'];
	//获取书籍列表
	if($action == 'bookList'){
		$sql = "select * from books order by borrowTimes desc";
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
		$bookIsbn = $_REQUEST['bookIsbn'];
		$sql = "select * from books where bookIsbn =" . $bookIsbn;
		//如果查询错误则返回相应信息
		if (!mysql_query($sql,$con)){
			//如果查询有问题,输入字母就会到这，就提示err；
			$result['state'] = 'err';
			//die('Error: ' . mysql_error());
			die(json_encode($result));
		}
		$res = mysql_query($sql);
		$books = array();
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
			$books[] = $a;
		}
		if(count($books) == 0){
			$result['state'] = 'empty';
		}else{
			$result['state'] = 'success';
		}
		$result['data'] = $books;
		mysql_close($con);
		die(json_encode($result));
	}elseif($action == 'searchByName'){
		//根据isbn码搜索商品
		$result = array();
		$bookName = $_REQUEST['bookName'];
		$sql = "select * from books where bookTitle like '%" . $bookName . "%'";
		//如果查询错误则返回相应信息
		if (!mysql_query($sql,$con)){
			//如果查询有问题,输入字母就会到这，就提示err；
			$result['state'] = 'err';
			//die('Error: ' . mysql_error());
			die(json_encode($result));
		}
		$res = mysql_query($sql);
		$books = array();
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
			$books[] = $a;
		}
		if(count($books) == 0){
			$result['state'] = 'empty';
		}else{
			$result['state'] = 'success';
		}
		$result['data'] = $books;
		mysql_close($con);
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
	}elseif($action == 'borrow'){
		//更新书籍为被借阅状态与总的借阅次数
		$bookId = $_REQUEST['bookId'];
		//给书籍的被借阅次数加1
		//首先获取到书籍当前的borrowTimes的值，加一后写入。
		$sql = "SELECT borrowTimes
			FROM `books`
			WHERE `bookId` =". $bookId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		$row = mysql_fetch_row($res);
		$borrowTimes = $row[0];
		$borrowTimes = $borrowTimes + 1;
		//echo $bookId;
		$sql = "UPDATE `books` 
			SET `borrowTimes` = '$borrowTimes',`isBorrow` = '1' 
			WHERE `books`.`bookId` =" . $bookId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		die(json_encode(200));



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