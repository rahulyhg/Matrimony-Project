<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$friendUserName=$REQUEST->friendUserName;
$query="UPDATE `Friends` SET `friendShipStatus`='friend' WHERE userName='$userName' AND friendUserName='$friendUserName'";
$q=mysql_query($query);
if ($q) {
  $query="INSERT INTO `Friends`(`userName`, `friendUserName`, `friendShipStatus`) VALUES ('$friendUserName','$userName','friend')";
  $q1=mysql_query($query);
  if ($q1) {
    echo 'success';
  }else {
    // rollback
    $query="UPDATE `Friends` SET `friendShipStatus`='request' WHERE userName='$userName' AND friendUserName='$friendUserName'";
    $q2=mysql_query($query);
    echo 'error';
  }
}else {
  echo 'error';
}
?>
