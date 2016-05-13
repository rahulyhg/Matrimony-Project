<?php
include "db.php";
  $POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
  $REQUEST = JSON_DECODE($POSTDATA);
  $userName=$REQUEST->userName;
  $query="SELECT Information_TBL.userName, Information_TBL.firstName, Information_TBL.middleName, Information_TBL.lastName, Information_TBL.avatarUrl FROM Information_TBL WHERE Information_TBL.userName IN (SELECT Message_Mapping_TBL.sendTo FROM Message_Mapping_TBL WHERE Message_Mapping_TBL.sendFrom = '$userName' GROUP BY Message_Mapping_TBL.sendTo)";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);

  $data=array();
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);

?>
