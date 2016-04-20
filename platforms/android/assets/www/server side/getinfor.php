<?php
include "db.php";
  $POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
  $REQUEST = JSON_DECODE($POSTDATA);
  $userName=$REQUEST->userName;
  $query="SELECT Account_TBL.userName, Account_TBL.email, Account_TBL.regDate, Information_TBL.coverImageUrl, Information_TBL.firstName, Information_TBL.middleName, Information_TBL.lastName, Information_TBL.dateOfBirth, Information_TBL.gender, Information_TBL.marialStatus, Information_TBL.phoneNumber, Information_TBL.height, Information_TBL.weight, Information_TBL.motherTongue, Information_TBL.nationality, Information_TBL.country, Information_TBL.cityStates, Information_TBL.seftDescription, Information_TBL.avatarUrl, Information_TBL.coverImageUrl, Information_TBL.age, Information_TBL.religion, Family_TBL.familyType, Family_TBL.familyTrend, Family_TBL.caste, Profile_TBL.highestLiteracy, Profile_TBL.workIn, Profile_TBL.occupation, Profile_TBL.income FROM Account_TBL INNER JOIN Information_TBL ON Account_TBL.userName = Information_TBL.userName INNER JOIN Family_TBL ON Account_TBL.userName = Family_TBL.userName INNER JOIN Profile_TBL ON Account_TBL.userName = Profile_TBL.userName WHERE Account_TBL.userName = '$userName'";
  $q=mysql_query($query);
  $lenght = mysql_num_rows($q);

  $data=array();
  while ($row=mysql_fetch_object($q)){
    $data[]=$row;
  }
  echo json_encode($data);

?>
