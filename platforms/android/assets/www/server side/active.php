<?php
include "db.php";
if(isset($_POST['activeaccount']))
{
  $code = mysql_real_escape_string(htmlspecialchars(trim($_POST['code'])));
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $checkCode=mysql_num_rows(mysql_query("SELECT * FROM Account_TBL WHERE userName = '$userName' AND code = '$code';"));
  if ($checkCode!=0) {
    $query = "UPDATE Account_TBL SET isActive = 1 WHERE userName = '$userName';";
    $q=mysql_query($query);
    if($q){
      echo "activeSuccess";
    }
    else{
      echo "activeError";
    }
  }else {
    echo "wrongCode";
  }
}

if(isset($_POST['resendcode']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $code = rand(111111, 999999);
  $query = "UPDATE Account_TBL SET code = $code WHERE userName = '$userName';";
  $q=mysql_query($query);
  if($q){
    echo "recodeSuccess".$code;
  }
  else{
    echo "recodeError";
  }
}
?>
