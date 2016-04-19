<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$friendUserName=$REQUEST->friendUserName;
$query="INSERT INTO `Friends`(`userName`, `friendUserName`, `friendShipStatus`) VALUES ('$userName','$friendUserName','request')";
$q=mysql_query($query);
if ($q) {
  echo 'success';
}else {
  echo 'error';
}
?>
