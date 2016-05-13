<?php
include "db.php";
  $POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
  $REQUEST = JSON_DECODE($POSTDATA);
  $userName=$REQUEST->userName;
  $query="SELECT Account_TBL.userName, Information_TBL.firstName, Information_TBL.middleName, Information_TBL.lastName, Information_TBL.avatarUrl FROM Account_TBL INNER JOIN Information_TBL ON Account_TBL.userName = Information_TBL.userName INNER JOIN Friends ON Account_TBL.userName = Friends.userName WHERE Friends.userName IN (SELECT Information_TBL.userName FROM Information_TBL WHERE Information_TBL.userName IN (SELECT Message_Mapping_TBL.sendTo FROM Message_Mapping_TBL WHERE Message_Mapping_TBL.sendFrom = '$userName' GROUP BY Message_Mapping_TBL.sendTo) OR Information_TBL.userName IN (SELECT Message_Mapping_TBL.sendFrom FROM Message_Mapping_TBL WHERE Message_Mapping_TBL.sendTo = '$userName' GROUP BY Message_Mapping_TBL.sendTo) GROUP BY Information_TBL.userName) AND Friends.friendShipStatus = 'friend' AND Friends.friendUserName = '$userName'";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);

  $data=array();
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);
?>
