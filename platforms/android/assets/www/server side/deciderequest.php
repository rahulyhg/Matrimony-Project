<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$friendUserName=$REQUEST->friendUserName;
$query="DELETE FROM `Friends` WHERE userName='$userName' AND friendUserName='$friendUserName' AND friendShipStatus = 'request'";
$q=mysql_query($query);
if ($q) {
    echo 'success';
}else {
  // rollback
  $query2="INSERT INTO `Friends`(`userName`, `friendUserName`, `friendShipStatus`) VALUES ('$userName','$friendUserName','request')";
  $q2=mysql_query($query2);
  echo 'error';
}
?>
