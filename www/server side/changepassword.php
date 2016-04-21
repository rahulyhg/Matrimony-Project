<?php
include "db.php";
if(isset($_POST['changepassword']))
{
  mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $oldPassword=md5(mysql_real_escape_string(htmlspecialchars(trim($_POST['oldPassword']))));
  $newPassword=md5(mysql_real_escape_string(htmlspecialchars(trim($_POST['newPassword']))));
  $checkPassword=mysql_num_rows(mysql_query("SELECT * FROM Account_TBL WHERE userName = '$userName' AND password = '$oldPassword';"));
  if ($checkPassword!=0) {
    $query = "UPDATE Account_TBL SET `password` = '$newPassword' WHERE userName = '$userName'";
    $q = mysql_query($query);
    if ($q) {
      echo "success";
    }else {
      echo "error";
    }
  }else {
    echo "wrongpass";
  }
}
?>
