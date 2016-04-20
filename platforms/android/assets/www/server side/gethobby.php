<?php
include "db.php";
  $POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
  $REQUEST = JSON_DECODE($POSTDATA);
  $userName=$REQUEST->userName;
  $query="SELECT Hobby_TBL.hobbyName, Hobby_Catalog_TBL.hobbyType FROM Hobby_TBL INNER JOIN Hobby_Catalog_Mapping_TBL ON Hobby_TBL.hobbyId = Hobby_Catalog_Mapping_TBL.hobbyId INNER JOIN Hobby_Catalog_TBL ON Hobby_Catalog_Mapping_TBL.hobbyTypeId = Hobby_Catalog_TBL.hobbyTypeId INNER JOIN Hobby_Mapping_TBL ON Hobby_TBL.hobbyId = Hobby_Mapping_TBL.hobbyId WHERE Hobby_Mapping_TBL.userName = '$userName'";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);

  $data=array();
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);

?>
