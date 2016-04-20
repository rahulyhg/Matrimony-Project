<?php
include "db.php";
$data=array();
$q=mysql_query("select * from `users`");
while ($row=mysql_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
?>
