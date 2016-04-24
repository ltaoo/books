<?php 
	header("content-type:text/html;charset=utf-8");
	//连接数据库
	include_once('public/mysqliConnect.php');
	//数据赋值
	$action = $_REQUEST['action'];
	//获取购物车商品信息，get请求获取数据，但是要带参数cartSession，
	if($action == "list") {
		$cartSession = $_REQUEST['cartSession'];
		$sql = "select * from cart where cartSession=" . $cartSession;
		$results = $mysqli->query($sql);
		/*
			object(mysqli_result)[2]
			  public 'current_field' => null
			  public 'field_count' => null
			  public 'lengths' => null
			  public 'num_rows' => null
			  public 'type' => null
		*/
		//如果结果集为空，会返回false，如果结果集不为空，则返回一个对象。
		//echo '是否查询成功还是是否有结果集，看看返回的是什么值：';
		//var_dump($results);
		//exit;
		//var_dump($results);
		//var_dump($results->fetch_row());
		if($results === false){
			//如果结果集为空
			$result['state'] = 'err';
			die(json_encode($result));
		}else{
			$cart = array();
			while($row = $results->fetch_assoc()) {
			    $temp = array(
			    	'cartId' => $row['id'],
			    	'bookId' => $row['bookId'],
			    	'bookPrice' => $row['bookPrice'],
			    	'bookTitle' => $row['bookTitle']
			    );
			    $cart[] = $temp;
			}
			$result['state'] = 200;
			$result['data'] = $cart;
		}
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
	if($action == "createOrder"){
		$memberId = $_POST['memberId'];
		$booklist = $_POST["booklist"];
		$message = $_POST['message'];

		//写入数据库
		$sql = "INSERT INTO `orders`
				(`memberId`, `booklist`, `message`, `orderState`) 
				VALUES 
				('$memberId', '$booklist', '$message', 0)";
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
	//更新购物车，修改记录
	if($action == "update"){
		var_dump($_POST);
		$id = $_POST['cartId'];
		$goodsNum = $_POST['cartNum'];
		$sql = "UPDATE cart SET goodsNum=" . $goodsNum ." WHERE id= " .$id;
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

	//根据商品名称查询购物车对应记录id
	if($action == 'find') {
		$goodsName = $_REQUEST['goodsName'];
		$sql = "select id, goodsNum from cart where goodsName='" . $goodsName . "'";
		$results = $mysqli->query($sql);
		if($results === false){
			//如果结果集为空
			$result['state'] = 'err';
		}else{
			$cart = array();
			while($row = $results->fetch_assoc()) {
			    $cart = array(
			    	'cartId' => $row['id'],
			    	'goodsNum' => $row['goodsNum']
			    );
			}
			$result['state'] = 'success';
			$result['data'] = $cart;
		}
		//var_dump($cart);
		// Frees the memory associated with a result

		die(json_encode($result));
		$results->free();
		// close connection 
		$mysqli->close();
	}
?>