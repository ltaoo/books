<?php 
	//content-type:text/html;charset=utf8
	header('content-type:text/html;charset=utf8');
	//连接数据库
	include_once('public/mysqliConnect.php');
	$action = $_REQUEST['action'];
		//获取会员列表
	if($action == 'getMemberList'){
		$sql = "select memberId, memberName, memberNum, memberTel, memberAddress, memberRank, memberCreateTime,  
		(select count(*) from records where records.memberId = members.memberId and records.returnTime is not NULL) as borrowTimes,
		(select count(*) from records where records.memberId = members.memberId and records.returnTime is NULL) as borrowNum 
		from members";
		$results = $mysqli->query($sql);
		$members = array();
		while ($row = $results->fetch_assoc()) {
			$member = array(
				'memberId' => $row['memberId'],
				'memberName' => $row['memberName'],
				'memberNum' => $row['memberNum'],
				'memberTel' => $row['memberTel'],
				'memberTel' => $row['memberTel'],
				'memberAddress' => $row['memberAddress'],
				'memberRank' => $row['memberRank'],
				'borrowTimes' => $row['borrowTimes'],
				'borrowNum' => $row['borrowNum'],
				'memberCreateTime' => $row['memberCreateTime']
			);
			$members[] = $member;
		}
		$mysqli->close();
		die(json_encode($members));
	}elseif($action == 'searchByNum'){
		//根据学号查询
		$result = array();
		$memberNum = $_REQUEST['memberNum'];
		//模糊查询学号
		$sql = "select memberId, memberName, memberNum,memberTel, memberAddress, memberRank, memberCreateTime
		 from members where memberNum = '" . $memberNum . "'";
		// $sql = "select * from members where memberNum = '1218040201'";
		$results = $mysqli->query($sql);
		$members = array();
		if($results === false){
			//如果结果集为空
			// var_dump($results);
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
					'borrowTimes' => $row['borrowTimes'],
					'borrowNum' => $row['borrowNum']
			    );
			    $members[] = $temp;
			}
		}
		
		// if(count($members) == 0){
		// 	$result['state'] = 404;
		// }else{
		// 	$result['state'] = 200;
		// }
		$result['data'] = $members;
		// close connection 
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchByName'){
		//根据姓名查询
		$result = array();
		$memberName = $_REQUEST['memberName'];
		$sql = "select memberId, memberName, memberNum,memberTel, memberAddress, memberRank, memberCreateTime, 
		(select count(*) from records where records.memberId = members.memberId and returnTime is NULL) as borrowNum,
		(select count(*) from records where records.memberId = members.memberId and returnTime is not NULL) as borrowTimes from members where memberName like '%" . $memberName . "%'";
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
				'borrowNum' => $row['borrowNum'],
				'borrowTimes' => $row['borrowTimes']
			);
			$members[] = $a;
		}
		$result['data'] = $members;
		$results->free();
		$mysqli->close();
		die(json_encode($result));
	}elseif($action == 'searchById'){
		//根据id查询
		$result = array();
		$memberId = $_REQUEST['memberId'];
		$sql = "select memberId, memberName, memberNum,memberTel, memberAddress, memberRank, memberCreateTime, 
		(select count(*) from records where records.memberId = members.memberId and returnTime is NULL) as borrowNum,
		(select count(*) from records where records.memberId = members.memberId and returnTime is not NULL) as borrowTimes from members where memberId = '$memberId'";
		$results = $mysqli->query($sql);
		//如果查询失败，就直接退出
		if (!$results){
			//如果查询有问题，就提示err；
			$result['state'] = 500;
			//die('Error: ' . mysql_error());
			die(json_encode($result));
		}
		$member = array();
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
				'borrowNum' => $row['borrowNum'],
				'borrowTimes' => $row['borrowTimes']
			);
			$member = $a;
		}
		$result['data'] = $member;
		$results->free();
		$mysqli->close();
		die(json_encode($result));
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
	}elseif($action == 'delete'){
		//删除记录
		$memberId = $_REQUEST['memberId'];
		$sql = 'DELETE FROM `members` WHERE `memberId` =' . $memberId;
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
?>