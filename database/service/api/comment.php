<?php 
	header("content-type:text/html;charset=utf-8");
	//连接数据库
	include_once('public/mysqliConnect.php');
	//数据赋值
	$action = $_REQUEST['action'];
	
	//添加评论
	if($action == "addComment"){
		$memberId = $_POST['memberId'];
		$bookIsbn = $_POST["bookIsbn"];
		$content = $_POST['content'];
		//创建时间
		$createTime = date('Y/m/d');
		//写入数据库
		$sql = "INSERT INTO `comments`
				(`memberId`, `bookIsbn`, `content`, `createTime`) 
				VALUES 
				('$memberId', '$bookIsbn', '$content', '$createTime')";
		$insert_row = $mysqli->query($sql);
		//var_dump($insert_row);
		//如果添加成功，$results为true
		//var_dump($insert_row);
		if($insert_row){
		    //print 'Success! ID of last inserted record is : ' .$mysqli->insert_id .'<br />'; 
		    $commentId = $mysqli->insert_id;
		    //这个地方只要返回成功后的id就可以，查询就交给查询接口。
		    $result['state'] = 'success';
		    $result['commentId'] = $commentId;
		}else{
		    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
		    $result['state'] = $mysqli->error;
		}
		$mysqli->close();
		die(json_encode($result));
	}
	//根据书籍isbn码查询该书籍下的所有评论
	elseif($action == "list") {
		$bookIsbn = $_REQUEST['bookIsbn'];
		$sql = "select * from comments where bookIsbn= '$bookIsbn'";
		$results = $mysqli->query($sql);
		$result = array();
		if($results === false){
			//如果结果集为空
			$result['state'] = 'err';
		}else{
			$comments = array();
			while($row = $results->fetch_assoc()) {
			    $temp = array(
			    	'commentId' => $row['commentId'],
			    	'bookIsbn' => $row['bookIsbn'],
			    	'memberId' => $row['memberId'],
			    	'content' => $row['content'],
			    	'createTime' => $row['createTime']
			    );
			    $comments[] = $temp;
			}
			$result['state'] = 200;
			$result['data'] = $comments;
		}
		//var_dump($result);
		if(count($result['data']) == 0) {
			//如果没有记录
			$result['msg'] = 'empty';
		}
		//var_dump($cart);
		// Frees the memory associated with a result
		$results->free();
		// close connection 
		$mysqli->close();
		die(json_encode($result));
	}
	elseif($action == "fetchById") {
		$commentId = $_REQUEST['commentId'];
		$sql = "select * from comments where commentId = '$commentId'";
		$results = $mysqli->query($sql);
		$result = array();
		if($results === false){
			//如果结果集为空
			$result['state'] = 'err';
		}else{
			$row = $results->fetch_assoc();
			$comment = array(
				'commentId' => $row['commentId'],
				'memberId' => $row['memberId'],
				'bookIsbn' => $row['bookIsbn'],
				'content' => $row['content'],
				'createTime' => $row['createTime']
			);
			$result['state'] = 200;
			$result['data'] = $comment;
		}
		//var_dump($cart);
		// Frees the memory associated with a result
		$results->free();
		// close connection 
		$mysqli->close();
		die(json_encode($result));
	}
?>