<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$friendUserName=$REQUEST->friendUserName;
$query="DELETE FROM `Friends` WHERE userName='$userName' AND friendUserName='$friendUserName'";
$query2="DELETE FROM `Friends` WHERE userName='$friendUserName' AND friendUserName='$userName'";
$q=mysql_query($query);
if ($q) {
  $q2=mysql_query($query2);
  if ($q2) {
    echo 'success';
  }else {
    // rollback
    $query4="INSERT INTO `Friends`(`userName`, `friendUserName`, `friendShipStatus`) VALUES ('$friendUserName','$userName','friend')";
    $q4=mysql_query($query4);
    $query5="INSERT INTO `Friends`(`userName`, `friendUserName`, `friendShipStatus`) VALUES ('$userName','$friendUserName','friend')";
    $q5=mysql_query($query5);
    echo 'error';
  }
}else {
  // rollback
  $query3="INSERT INTO `Friends`(`userName`, `friendUserName`, `friendShipStatus`) VALUES ('$userName','$friendUserName','friend')";
  $q3=mysql_query($query3);
  echo 'error';
}
?>
