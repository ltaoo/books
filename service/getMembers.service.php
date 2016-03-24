<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	//连接数据库
	include_once('public/mysqliConnect.php');
	$action = $_REQUEST['action'];
	//获取会员列表
	if($action == 'memberList'){
		$sql = "select * from members";
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		//如果查询执行不正确则返回false
		$res = mysql_query($sql);
		$members = array();
		//mysql_fetch_row失败返回false
		//$row = mysql_fetch_row($res);
		//取出每个字段
		while ($row = mysql_fetch_row($res)) {
			//var_dump($row);
			$member = array(
				'memberId' => $row[0],
				'memberName' => $row[1],
				'memberNum' => $row[2],
				'memberTel' => $row[3],
				'memberAddress' => $row[4],
				'memberRank' => $row[5],
				'memberCreateTime' => $row[6],
				'memberBorrowNum' => $row[7],
				'memberBorrowTimes' => $row[8]
			);
			$members[] = $member;
		}
		mysql_close($con);
		die(json_encode($members));
	}elseif($action == 'searchByNum'){
		//根据学号查询
		$result = array();
		$memberNum = $_REQUEST['memberNum'];
		//模糊查询学号
		$sql = "select * from members where memberNum like '%" . $memberNum . "%'";
		$results = $mysqli->query($sql);
		$members = array();
		if($results === false){
			//如果结果集为空
			$result['state'] = 500;
		}else{
			while($row = $results->fetch_assoc()) {
			    $temp = array(
			    	'memberId' => $row['memberId'],
					'memberName' => $row['memberName'],
					'memberNum' => $row['memberNum'],
					'memberTel' => $row['memberTel'],
					'memberAddress' => $row['memberAddress'],
					'memberRank' => $row['memberRank'],
					'memberCreateTime' => $row['memberCreateTime'],
					'memberBorrowNum' => $row['memberBorrowNum'],
					'memberBorrowTimes' => $row['memberBorrowTimes']
			    );
			    $members[] = $temp;
			}
		}
		
		if(count($members) == 0){
			$result['state'] = 0;
		}else{
			$result['state'] = 200;
		}
		$result['data'] = $members;
		$results->free();
		// close connection 
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByName'){
		//根据姓名查询
		$result = array();
		$memberName = $_REQUEST['memberName'];
		$sql = "select * from members where memberName like '%" . $memberName . "%'";
		$results = $mysqli->query($sql);
		//如果查询失败，就直接退出
		if (!$results){
			//如果查询有问题，就提示err；
			$result['state'] = 500;
			//die('Error: ' . mysql_error());
			die(json_encode($result));
		}
		$members = array();
		//mysql_fetch_row失败返回false
		//$row = mysql_fetch_row($res);
		//取出每个字段
		while ($row = $results->fetch_assoc()) {
			//var_dump($row);
			$a = array(
				'memberId' => $row['memberId'],
				'memberName' => $row['memberName'],
				'memberNum' => $row['memberNum'],
				'memberTel' => $row['memberTel'],
				'memberAddress' => $row['memberAddress'],
				'memberRank' => $row['memberRank'],
				'memberCreateTime' => $row['memberCreateTime'],
				'memberBorrowNum' => $row['memberBorrowNum'],
				'memberBorrowTimes' => $row['memberBorrowTimes']
			);
			$members[] = $a;
		}
		if(count($members) == 0){
			$result['state'] = 0;
		}else{
			$result['state'] = 200;
		}
		$result['data'] = $members;
		$results->free();
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchById'){
		//根据id查询
		$memberId = $_REQUEST['memberId'];
		$result = array();
		$sql = "select * from members where memberId =" . $memberId;
		if (!mysql_query($sql,$con)){
			//die('Error: ' . mysql_error());
			$result['state'] = 'err';
			die(json_encode($result));
		}
		//如果查询执行不正确则返回false
		$res = mysql_query($sql);
		$member = array();
		//mysql_fetch_row失败返回false
		//$row = mysql_fetch_row($res);
		//取出每个字段
		while ($row = mysql_fetch_row($res)) {
			//var_dump($row);
			$a = array(
				'memberId' => $row[0],
				'memberName' => $row[1],
				'memberNum' => $row[2],
				'memberTel' => $row[3],
				'memberAddress' => $row[4],
				'memberRank' => $row[5],
				'memberCreateTime' => $row[6],
				'memberBorrowNum' => $row[7],
				'memberBorrowTimes' => $row[8]
			);
			$member = $a;
		}
		$result['state'] = 'success';
		$result['data'] = $member;
		mysql_close($con);
		die(json_encode($result));
	}elseif($action == 'borrow'){
		$memberId = $_REQUEST['memberId'];
		//首先获取到该用户当前的memberBorrowNum的值，加一后写入。
		$sql = "SELECT memberBorrowNum,memberBorrowTimes
			FROM `members`
			WHERE `memberId` =". $memberId;
		if (!mysql_query($sql,$con)){
			//die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		$row = mysql_fetch_row($res);
		$memberBorrowNum = $row[0];
		$memberBorrowTimes = $row[1];
		$MemberBorrowNum = $memberBorrowNum + 1;
		$memberBorrowTimes = $memberBorrowTimes + 1;
		//echo $newMemberBorrowNum;
		//echo $bookId;
		$sql = "UPDATE `members` 
			SET `memberBorrowNum` = " . $MemberBorrowNum . ",`memberBorrowTimes` = " . $memberBorrowTimes . "
			WHERE `memberId` = " . $memberId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		die(json_encode(200));



	}elseif($action == 'return'){
		$memberId = $_REQUEST['memberId'];
		//首先获取到该用户当前的memberBorrowNum的值，加一后写入。
		$sql = "SELECT memberBorrowNum
			FROM `members`
			WHERE `memberId` =". $memberId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		$row = mysql_fetch_row($res);
		$memberBorrowNum = $row[0];
		$newMemberBorrowNum = $memberBorrowNum - 1;
		//echo $newMemberBorrowNum;
		//echo $bookId;
		$sql = "UPDATE `members` SET `memberBorrowNum` = " . $newMemberBorrowNum . " WHERE `members`.`memberId` =" . $memberId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		die(json_encode(200));
	}elseif($action == 'update'){
		$result = array();
		//修改会员信息
		$memberId = $_POST['memberId'];
		$memberName = $_POST['memberName'];
		$memberNum = $_POST['memberNum'];
		$memberTel = $_POST['memberTel'];
		$memberAddress = $_POST['memberAddress'];
		$memberCreateTime = $_POST['memberCreateTime'];
		$memberRank = $_POST['memberRank'];
		$sql = "UPDATE `members` 
			SET `memberName`= '$memberName',`memberNum`='$memberNum',`memberTel`='$memberTel',`memberAddress`='$memberAddress',`memberRank`='$memberRank',`memberCreateTime`='$memberCreateTime' 
			WHERE `memberId`=" . $memberId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		$result['state'] = 'success';
		die(json_encode($result));
	}elseif($action == 'delete'){
		//删除记录
		$memberId = $_REQUEST['memberId'];
		$sql = 'DELETE FROM `members` WHERE `memberId` =' . $memberId;
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		$res = mysql_query($sql);
		mysql_close($con);
		$result['state'] = 200;
		die(json_encode($result));
	}
?>