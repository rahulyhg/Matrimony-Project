<?php
include "db.php";
$POSTDATA = FILE_GET_CONTENTS("PHP://INPUT");
$REQUEST = JSON_DECODE($POSTDATA);
$userName=$REQUEST->userName;
$gender=$REQUEST->gender;
$country=$REQUEST->country;
$cityStates=$REQUEST->cityStates;
$religion=$REQUEST->religion;
$caste=$REQUEST->caste;
$minAge=intval($REQUEST->minAge);
$maxAge=intval($REQUEST->maxAge);
$otherCity=$REQUEST->otherCity;
$otherReligion=$REQUEST->otherReligion;
$query="SELECT Account_TBL.userName, Account_TBL.email, Account_TBL.regDate, Information_TBL.age, Information_TBL.firstName, Information_TBL.middleName, Information_TBL.lastName, Information_TBL.coverImageUrl, Information_TBL.dateOfBirth, Information_TBL.gender, Information_TBL.marialStatus, Information_TBL.phoneNumber, Information_TBL.height, Information_TBL.weight, Information_TBL.motherTongue, Information_TBL.nationality, Information_TBL.country, Information_TBL.cityStates, Information_TBL.seftDescription, Information_TBL.avatarUrl, Information_TBL.religion, Family_TBL.familyType, Family_TBL.familyTrend, Family_TBL.caste, Profile_TBL.highestLiteracy, Profile_TBL.workIn, Profile_TBL.occupation, Profile_TBL.income FROM Account_TBL INNER JOIN Information_TBL ON Account_TBL.userName = Information_TBL.userName INNER JOIN Family_TBL ON Account_TBL.userName = Family_TBL.userName INNER JOIN Profile_TBL ON Account_TBL.userName = Profile_TBL.userName WHERE (Information_TBL.age BETWEEN $minAge AND $maxAge) AND Information_TBL.gender='$gender' AND Information_TBL.country= '$country' AND Information_TBL.cityStates='$cityStates' AND Information_TBL.religion='$religion' AND Family_TBL.caste='$caste' AND (Information_TBL.marialStatus='single' OR Information_TBL.marialStatus='divorced') AND Account_TBL.userName NOT LIKE '$userName'";
if ($gender=="both") {
  $query = str_replace(" AND Information_TBL.gender='$gender'","",$query);
};
if ($otherReligion=="y") {
  $query = str_replace(" AND Information_TBL.religion='$religion'","",$query);
};
if ($otherCity=="y") {
  $query = str_replace(" AND Information_TBL.cityStates='$cityStates'","",$query);
};
if ($caste=="any") {
  $query = str_replace(" AND Family_TBL.caste='$caste'","",$query);
};

$q=mysql_query($query);
$lenght = mysql_num_rows($q);

$data=array();
while ($row=mysql_fetch_object($q)){
  $data[]=$row;
}
echo json_encode($data);

?>
