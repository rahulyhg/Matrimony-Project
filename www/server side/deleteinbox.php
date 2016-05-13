<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$sendTo=$REQUEST->sendTo;
$query="DELETE FROM Message_Mapping_TBL WHERE (Message_Mapping_TBL.sendFrom = '$userName' AND Message_Mapping_TBL.sendTo = '$sendTo') OR ( Message_Mapping_TBL.sendFrom = '$sendTo' AND Message_Mapping_TBL.sendTo = '$userName')";
$q=mysql_query($query);
if ($q) {
  echo 'success';
}else {
  echo 'error';
}
?>
