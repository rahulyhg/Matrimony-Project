<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$name=$REQUEST->name;
$gender=$REQUEST->gender;
$minAge=intval($REQUEST->minAge);
$maxAge=intval($REQUEST->maxAge);
$country=$REQUEST->country;
$cityStates=$REQUEST->cityStates;
$motherTongue=$REQUEST->motherTongue;
$marrialStt=$REQUEST->marrialStt;
$religion=$REQUEST->religion;
$caste=$REQUEST->caste;
$literacy=$REQUEST->literacy;
$query="SELECT Account_TBL.userName, Account_TBL.email, Account_TBL.regDate, Information_TBL.age, Information_TBL.firstName, Information_TBL.middleName, Information_TBL.lastName, Information_TBL.coverImageUrl, Information_TBL.dateOfBirth, Information_TBL.gender, Information_TBL.marialStatus, Information_TBL.phoneNumber, Information_TBL.height, Information_TBL.weight, Information_TBL.motherTongue, Information_TBL.nationality, Information_TBL.country, Information_TBL.cityStates, Information_TBL.seftDescription, Information_TBL.avatarUrl, Information_TBL.religion, Family_TBL.familyType, Family_TBL.familyTrend, Family_TBL.caste, Profile_TBL.highestLiteracy, Profile_TBL.workIn, Profile_TBL.occupation, Profile_TBL.income FROM Account_TBL INNER JOIN Information_TBL ON  Account_TBL.userName = Information_TBL.userName INNER JOIN Family_TBL ON Account_TBL.userName = Family_TBL.userName INNER JOIN Profile_TBL ON Account_TBL.userName = Profile_TBL.userName WHERE ( Information_TBL.firstName LIKE '%$name%' OR Information_TBL.middleName LIKE '%$name%' OR Information_TBL.lastName LIKE '%$name%' ) AND ( Information_TBL.age BETWEEN $minAge AND $maxAge ) AND Information_TBL.gender = '$gender' AND Information_TBL.country = '$country' AND Information_TBL.cityStates = '$cityStates' AND Information_TBL.motherTongue = '$motherTongue' AND Information_TBL.marialStatus = '$marrialStt' AND Information_TBL.religion = '$religion' AND Family_TBL.caste = '$caste' AND Profile_TBL.highestLiteracy = '$literacy' AND Account_TBL.userName NOT LIKE '$userName'";
if ($name=="any") {
  $query = str_replace(" ( Information_TBL.firstName LIKE '%$name%' OR Information_TBL.middleName LIKE '%$name%' OR Information_TBL.lastName LIKE '%$name%' ) AND","",$query);

};
if ($gender=="any"){
  $query = str_replace(" AND Information_TBL.gender = '$gender'","",$query);
};
if ($country=="any") {
  $query = str_replace("AND Information_TBL.country = '$country'","",$query);
};
if ($cityStates=="any") {
  $query = str_replace("AND Information_TBL.cityStates = '$cityStates'","",$query);
};
if ($motherTongue=="any") {
  $query = str_replace(" AND Information_TBL.motherTongue = '$motherTongue'","",$query);
};
if ($marrialStt=="any") {
  $query = str_replace(" AND Information_TBL.marialStatus = '$marrialStt'","",$query);
};
if ($religion=="any") {
  $query = str_replace(" AND Information_TBL.religion = '$religion'","",$query);
};
if ($caste=="any") {
  $query = str_replace(" AND Family_TBL.caste = '$caste'","",$query);
};
if ($literacy=="any") {
  $query = str_replace(" AND Profile_TBL.highestLiteracy = '$literacy'","",$query);
};

// echo $query;
$q=mysql_query($query);
$lenght = mysql_num_rows($q);

$data=array();
while ($row=mysql_fetch_object($q)){
  $data[]=$row;
}
echo json_encode($data);

?>
