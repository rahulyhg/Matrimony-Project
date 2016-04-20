<?php
include "db.php";
if(isset($_POST['login']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $password=mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));
  $query="SELECT * FROM Account_TBL WHERE userName = '$userName' AND password = '$password'";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);
  // echo $lenght;
  //   while($row = mysql_fetch_assoc($q)) {
  //     echo "userName: {$row['userName']}";
  //   }

  $data=array();
  // $q=mysql_query(query);
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);
  //
  // if($q)
  // echo "ok";
  // else
  // echo "error";

  //
  // if($lenght != 0){
  //   while($row = mysql_fetch_array($q)){
  //     echo $row['userName'];
  //   }
  // }else {
  //   echo "fail";
  // }
}
?>
