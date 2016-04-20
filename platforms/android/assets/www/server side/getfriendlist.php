<?php
include "db.php";
  $POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
  $REQUEST = JSON_DECODE($POSTDATA);
  $userName=$REQUEST->userName;
  $query="SELECT Account_TBL.userName, Information_TBL.avatarUrl, Information_TBL.firstName, Information_TBL.middleName, Information_TBL.lastName, Information_TBL.gender, Friends.friendShipStatus FROM Account_TBL INNER JOIN Information_TBL ON  Account_TBL.userName = Information_TBL.userName INNER JOIN Friends ON Account_TBL.userName = Friends.userName WHERE Friends.friendUserName = '$userName' AND Friends.friendShipStatus = 'friend'";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);

  $data=array();
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);

?>
