<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	//连接数据库
	include_once('public/connectDb.php');
	$action = $_REQUEST['action'];
	if($action == 'recordsList'){
		$sql = "select * from records";
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		//如果查询执行不正确则返回false
		$res = mysql_query($sql);
		$records = array();
		//mysql_fetch_row失败返回false
		//$row = mysql_fetch_row($res);
		//取出每个字段
		while ($row = mysql_fetch_row($res)) {
			//获取到id后，分别去各自表查询详细信息
			//查询书籍详细信息
			$record = array(
				'recordId' => $row[0],
				'memberId' => $row[1],
				'memberNum' => $row[2],
				'memberName' => $row[3],
				'memberRank' => $row[4],
				'memberCreateTime' => $row[5],
				'bookId' => $row[6],
				'bookIsbn' => $row[7],
				'bookName' => $row[8],
				'bookImg' => $row[9],
				'borrowTime' => $row[10],
				'returnTime' => $row[11]
			);
			$records[] = $record;
		}
		mysql_close($con);
		die(json_encode($records));
	}elseif($action == 'serachByIsbn'){
		//根据书籍isbn码查询记录
		$bookIsbn = $_REQUEST['bookIsbn'];
		$sql = "select * from records where bookIsbn = $bookIsbn and `returnTime` =0000 -00 -00";
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		//如果查询执行不正确则返回false
		$res = mysql_query($sql);
		$records = array();
		while($row = mysql_fetch_row($res)){
			$record = array(
				'recordId' => $row[0],
				'memberId' => $row[1],
				'memberNum' => $row[2],
				'memberName' => $row[3],
				'memberRank' => $row[4],
				'memberCreateTime' => $row[5],
				'bookId' => $row[6],
				'bookIsbn' => $row[7],
				'bookName' => $row[8],
				'bookImg' => $row[9],
				'borrowTime' => $row[10],
				'returnTime' => $row[11]
			);
			$records[] = $record;
		}
		mysql_close($con);
		die(json_encode($records));
	}elseif($action == 'searchByName'){
		$result = array();
		//根据书籍isbn码查询记录
		$bookName = $_REQUEST['bookName'];
		$sql = "select * from records where `returnTime` =0000 -00 -00 and bookName like '%" . $bookName . "%'";;
		if (!mysql_query($sql,$con)){
			//die('Error: ' . mysql_error());
			die(json_encode('err'));
			$result['state'] = 'err';
		}
		//如果查询执行不正确则返回false
		$res = mysql_query($sql);
		$records = array();
		while($row = mysql_fetch_row($res)){
			$record = array(
				'recordId' => $row[0],
				'memberId' => $row[1],
				'memberNum' => $row[2],
				'memberName' => $row[3],
				'memberRank' => $row[4],
				'memberCreateTime' => $row[5],
				'bookId' => $row[6],
				'bookIsbn' => $row[7],
				'bookName' => $row[8],
				'bookImg' => $row[9],
				'borrowTime' => $row[10],
				'returnTime' => $row[11]
			);
			$records[] = $record;
		}
		if(count($records) == 0){
			$result['state'] = 'empty';
		}else{
			$result['state'] = 'success';
		}
		$result['data'] = $records;
		mysql_close($con);
		die(json_encode($result));
	}elseif($action == 'update'){
		$recordId = $_REQUEST['recordId'];
		$time = date('Y-m-d');
		
		//UPDATE `records` SET `returnTime` = '2015-12-30' WHERE `records`.`recordId` =7
		$sql = "UPDATE `records` SET `returnTime` = '$time' WHERE `records`.`recordId` =" . $recordId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		die(json_encode(200));
	}
?>