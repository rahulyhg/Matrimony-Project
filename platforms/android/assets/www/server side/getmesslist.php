<?php
include "db.php";
  $POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
  $REQUEST = JSON_DECODE($POSTDATA);
  $userName=$REQUEST->userName;
  $frUserName=$REQUEST->frUserName;
  $query="SELECT Message_TBL.messageId, Message_TBL.messageDate, Message_TBL.messageTime, Message_TBL.messageContent, Message_Mapping_TBL.sendFrom, Message_Mapping_TBL.sendTo FROM Message_TBL INNER JOIN Message_Mapping_TBL ON Message_TBL.messageId = Message_Mapping_TBL.messageId WHERE Message_Mapping_TBL.sendFrom = '$userName' AND Message_Mapping_TBL.sendTo = '$frUserName'";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);

  $data=array();
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);

?>
