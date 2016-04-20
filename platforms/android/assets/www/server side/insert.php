<?php
include "db.php";
if(isset($_POST['insert']))
{
  mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));
  $code = rand(111111, 999999);
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $password=md5(mysql_real_escape_string(htmlspecialchars(trim($_POST['password']))));
  $email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
  $date=date("m/d/Y");
  $checkExistsEmail=mysql_num_rows(mysql_query("SELECT * FROM Account_TBL WHERE email = '$email';"));
  if ($checkExistsEmail!=0) {
    echo "existEmail";
  }else {
    $checkExistsUser=mysql_num_rows(mysql_query("SELECT * FROM Account_TBL WHERE userName = '$userName';"));
    if ($checkExistsUser!=0) {
      echo "existUser";
    }else {
      $query = "CALL RegisterAccount('$userName','$password','$email',$code,'$date',@val)";
      $q=mysql_query($query);
      if($q){
        echo "registerSuccess".$code;
      }
      else{
        echo "registerError";
      }
    }
  }
}
?>
