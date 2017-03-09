<?php 
  //content-type:text/html;charset=utf8
  header('content-type:text/html;charset=utf8');
  //连接数据库
  include_once('public/mysqliConnect.php');
  //获取用户信息
  $username = $_POST['username'];
  $password = $_POST['password'];
  $admins = array();
  $sql = "select * from members where memberNum = '$username' and memberTel = '$password'";
  $results = $mysqli->query($sql);
  //var_dump($results);
  //获取单条记录
  $row = $results->fetch_row();
  if($row){
    //如果记录存在
    $result['state'] = 'success';
    $result['data'] = $row;
  }else{
    $result['state'] = 'fail';
    $result['mes'] = '用户不存在';
  }
  $mysqli->close();
  die(json_encode($result));
?>