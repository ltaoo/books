<?php 
	header("content-type:text/html;charset=utf-8");
	//连接数据库
	include_once('public/mysqliConnect.php');
	//数据赋值
	$action = $_REQUEST['action'];
	//获取购物车商品信息，get请求获取数据，但是要带参数cartSession，
	
	//新增订单
	if($action == "createOrder"){
		$memberId = $_POST['memberId'];
		$booklist = $_POST["booklist"];
		$message = $_POST['message'];
		//创建时间
		$createTime = date('Y/m/d');
		//写入数据库
		$sql = "INSERT INTO `orders`
				(`memberId`, `booklist`, `message`, `orderState`, `createTime`) 
				VALUES 
				('$memberId', '$booklist', '$message', 0, '$createTime')";
		$insert_row = $mysqli->query($sql);
		//var_dump($insert_row);
		//如果添加成功，$results为true
		//var_dump($insert_row);
		if($insert_row){
		    //print 'Success! ID of last inserted record is : ' .$mysqli->insert_id .'<br />'; 
		    $orderId = $mysqli->insert_id;
		    //这个地方只要返回成功后的id就可以，查询就交给查询接口。
		    $result['state'] = 'success';
		    $result['orderId'] = $orderId;
		}else{
		    //die('Error : ('. $mysqli->errno .') '. $mysqli->error);
		    $result['state'] = $mysqli->error;
		}
		$mysqli->close();
		die(json_encode($result));
	}
	//根据用户id查询所有订单记录
	elseif($action == "list") {
		$memberId = $_REQUEST['memberId'];
		$sql = "select * from orders where memberId= '$memberId'";
		$results = $mysqli->query($sql);
		$result = array();
		if($results === false){
			//如果结果集为空
			$result['state'] = 'err';
		}else{
			$orders = array();
			while($row = $results->fetch_assoc()) {
			    $temp = array(
			    	'orderId' => $row['orderId'],
			    	'memberId' => $row['memberId'],
			    	'booklist' => $row['booklist'],
			    	'message' => $row['message'],
			    	'orderState' => $row['orderState'],
			    	'createTime' => $row['createTime']
			    );
			    $orders[] = $temp;
			}
			$result['state'] = 200;
			$result['data'] = $orders;
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
	elseif($action == "fetchList") {
		$sql = "select * from orders";
		$results = $mysqli->query($sql);
		$result = array();
		if($results === false){
			//如果结果集为空
			$result['state'] = 'err';
		}else{
			$orders = array();
			while($row = $results->fetch_assoc()) {
			    $temp = array(
			    	'orderId' => $row['orderId'],
			    	'memberId' => $row['memberId'],
			    	'booklist' => $row['booklist'],
			    	'message' => $row['message'],
			    	'orderState' => $row['orderState']
			    );
			    $orders[] = $temp;
			}
			$result['state'] = 200;
			$result['data'] = $orders;
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
	//确认订单
	elseif($action == 'confirmOrder') {
		$orderId = $_REQUEST['orderId'];
		$sql = "UPDATE `orders` 
			SET `orderState`= 1 WHERE `orderId`=" . $orderId;
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
	//取消订单
	elseif($action == 'cancelOrder') {
		$orderId = $_REQUEST['orderId'];
		$sql = "UPDATE `orders` 
			SET `orderState`= 2 WHERE `orderId`=" . $orderId;
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