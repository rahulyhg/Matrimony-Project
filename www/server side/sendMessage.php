<?php
include "db.php";
$mysqli = new mysqli("139.59.254.92", "root", "thjnhkmbbkt9", "matrimonydb");
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$sendTo=$REQUEST->sendTo;
$message=$REQUEST->message;
$date=date("m/d/Y");
$time = date("H:i:s");
$query="INSERT INTO `Message_TBL`(`messageDate`, `messageTime`, `messageContent`, `isRead`) VALUES (STR_TO_DATE('$date', '%m/%d/%Y'),NOW(),'$message',0)";
$mysqli->query($query);
$id = $mysqli->insert_id;
$query2="INSERT INTO `Message_Mapping_TBL`(`messageId`, `sendFrom`, `sendTo`) VALUES ($id,'$userName','$sendTo')";
$q=mysql_query($query2);
if ($q) {
  echo 'success';
}else {
  //rollback
  $query3="DELETE FROM `Message_TBL` WHERE messageId = $id";
  $q2=mysql_query($query3);
  echo 'error';
}
/* close connection */
$mysqli->close();
// $q=mysql_query($query);
// if ($q) {
//   $id = mysqli_insert_id();
//   echo $id;
//   // $query2="INSERT INTO `Message_Mapping_TBL`(`messageId`, `sendFrom`, `sendTo`) VALUES ([value-1],[value-2],[value-3])";
// }else {
//   echo 'error';
// }
?>
