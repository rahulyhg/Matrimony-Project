<?php
include "db.php";
if(isset($_POST['resetPass']))
{
  $passw = generate_random_password();
  $password=md5($passw);
  $email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));

  $checkExistsEmail=mysql_num_rows(mysql_query("SELECT userName FROM Account_TBL WHERE email = '$email';"));
  if ($checkExistsEmail!=0) {
    $query = "UPDATE Account_TBL SET password = '$password' WHERE email = '$email'";
    $q=mysql_query($query);
    if($q){
      echo "resetSuccess".$passw;
    }
    else{
      echo "resetError";
    }
  }else {
    echo "accountNotExists";
  }
}

function generate_random_password($length=8) {
  $string = '';
  $characters = "23456789ABCDEFHJKLMNPRTVWXYZabcdefghijklmnopqrstuvwxyz";
  for ($p = 0; $p < $length; $p++) {
    $string .= $characters[mt_rand(0, strlen($characters)-1)];
  }
  return $string;
}
//
// $passw = generate_random_password();
// $password=md5($passw);
// echo $passw."-".$password."-----------";
// echo $passw."-".$password;
// echo generate_random_password();
?>
