<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$query="SELECT * FROM UserImage_TBL WHERE userName = '$userName'";
$q=mysql_query($query);
$lenght = mysql_num_rows($q);
$data=array();
while ($row=mysql_fetch_object($q)){
  $data[]=$row;
}
echo json_encode($data);
?>
