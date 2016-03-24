<?php 
	header('content-type:text/html;charset=utf8');
	$isbn = $_GET['q'];
	//echo $isbn;
	//使用爬虫来发起get请求
	$firstUrl = "http://api.douban.com/v2/book/search?q=".$isbn;
	//echo $firstUrl;
	$curl = curl_init();
	$timeout = 5;
	//访问的url
	curl_setopt($curl, CURLOPT_URL, $firstUrl);
	//返回文件流
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
	//user-agent头
	//curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:14.0) Gecko/20120722 Firefox/14.0.1");
	//打开头文件数据流输出,1表示输出头信息和content，0只输出content
	curl_setopt($curl, CURLOPT_HEADER, 0);
	//获取COOKIE并存储
	//curl_setopt($curl,CURLOPT_COOKIEJAR,$cookie_file);
	//执行
	$contents = curl_exec($curl);
	//var_dump($contents);
	curl_close($curl);
	//preg_match('/Set-Cookie:(.*);/iU',$contents,$str); //正则匹配
	//把jsessionid赋值给$cookie
	//$cookie = $str[1];
	echo $contents;
?>