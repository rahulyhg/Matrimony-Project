<?php
include "db.php";
if(isset($_POST['savestep1']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $fName=mysql_real_escape_string(htmlspecialchars(trim($_POST['fname'])));
  $mName=mysql_real_escape_string(htmlspecialchars(trim($_POST['mname'])));
  $lName=mysql_real_escape_string(htmlspecialchars(trim($_POST['lname'])));
  $birthday=mysql_real_escape_string(htmlspecialchars(trim($_POST['birthday'])));
  $age=$phone=intval($_POST['age']);
  $gender=mysql_real_escape_string(htmlspecialchars(trim($_POST['gender'])));
  $phone=intval($_POST['phone']);
  $coverImgUrl  = "http://139.59.254.92/upload/default-system-cover-imgae.jpg";
  $query = "INSERT INTO `Information_TBL`(`userName`, `firstName`, `middleName`, `lastName`, `dateOfBirth`, `gender`, `marialStatus`, `phoneNumber`, `height`, `weight`, `motherTongue`, `nationality`, `country`, `cityStates`, `seftDescription`, `avatarUrl`, `religion`, `age`, `coverImageUrl`) VALUES ('$userName','$fName','$mName','$lName',STR_TO_DATE('$birthday', '%m/%d/%Y'), '$gender','none',$phone,0,0,'none','none','none','none','none','none', 'none', $age, '$coverImgUrl')";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 1 WHERE userName = '$userName'");
    if (q1) {
      echo "saveSuccess";
    }else {
      // rollback
      $rq=mysql_query("DELETE FROM Information_TBL WHERE userName = '$userName'");
      echo "saveError";
    }
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['savestep2']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $nationality=mysql_real_escape_string(htmlspecialchars(trim($_POST['nationality'])));
  $cityStates=mysql_real_escape_string(htmlspecialchars(trim($_POST['citystates'])));
  $country=mysql_real_escape_string(htmlspecialchars(trim($_POST['country'])));
  $motherTongue=mysql_real_escape_string(htmlspecialchars(trim($_POST['mothertongue'])));
  $query = "UPDATE `Information_TBL` SET `motherTongue` = '$motherTongue', `nationality` = '$nationality', `country` = '$country', `cityStates` = '$cityStates' WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 2 WHERE userName = '$userName'");
    if (q1) {
      echo "saveSuccess";
    }else {
      echo "saveError";
    }
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['savestep3']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $marial=mysql_real_escape_string(htmlspecialchars(trim($_POST['marial'])));
  $height=intval($_POST['height']);
  $weight=intval($_POST['weight']);
  $religon=mysql_real_escape_string(htmlspecialchars(trim($_POST['religion'])));
  $query = "UPDATE `Information_TBL` SET `marialStatus` = '$marial', `height` = $height, `weight` = $weight, `religion` = '$religon' WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 3 WHERE userName = '$userName'");
    if (q1) {
      echo "saveSuccess";
    }else {
      echo "saveError";
    }
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['savestep4']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $type=mysql_real_escape_string(htmlspecialchars(trim($_POST['type'])));
  $caste=mysql_real_escape_string(htmlspecialchars(trim($_POST['caste'])));
  $trend=mysql_real_escape_string(htmlspecialchars(trim($_POST['trend'])));
  $query = "INSERT INTO `Family_TBL`(`userName`, `familyType`, `familyTrend`, `caste`) VALUES ('$userName','$type','$trend','$caste')";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 4 WHERE userName = '$userName'");
    if (q1) {
      echo "saveSuccess";
    }else {
      // rollback
      $rq=mysql_query("DELETE FROM `Family_TBL` WHERE userName = '$userName'");
      echo "saveError";
    }
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['savestep5']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $litteracy=mysql_real_escape_string(htmlspecialchars(trim($_POST['litteracy'])));
  $workFor=mysql_real_escape_string(htmlspecialchars(trim($_POST['work'])));
  $occupation=mysql_real_escape_string(htmlspecialchars(trim($_POST['occupation'])));
  $income=intval($_POST['income']);
  $query = "INSERT INTO `Profile_TBL`(`userName`, `highestLiteracy`, `workIn`, `occupation`, `income`) VALUES ('$userName','$litteracy','$workFor','$occupation',$income)";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 5 WHERE userName = '$userName'");
    if (q1) {
      echo "saveSuccess";
    }else {
      // rollback
      $rq=mysql_query("DELETE FROM `Profile_TBL` WHERE userName = '$userName'");
      echo "saveError";
    }
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['savestep6']))
{
  // Decode our JSON into PHP objects
  $dataObj = json_decode($_POST["savestep6"]);
  $userName = $dataObj->username;
  $hobbyArr = $dataObj->hobby;
  $j = count($hobbyArr);
  $check = true;
  for ($i=0; $i < $j; $i++) {
    $query = "INSERT INTO `Hobby_Mapping_TBL`(`userName`, `hobbyId`) VALUES ('$userName',$hobbyArr[$i]);";
    // echo $query;
    $q=mysql_query($query);
    if (!$q) {
      $check = false;
    }
  }

  if ($check == true) {
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 6 WHERE userName = '$userName'");
    if ($q1) {
      echo "saveSuccess";
    }else {
      // rollback
      $rq = mysql_query("DELETE FROM `Hobby_Mapping_TBL` WHERE userName = '$userName';");
      echo "saveError";
    }
  }else {
    // rollback
    $query = "DELETE FROM `Hobby_Mapping_TBL` WHERE userName = '$userName';";
    echo "saveError";
  }
}

if(isset($_POST['savestep7']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $imgUrl=mysql_real_escape_string(htmlspecialchars(trim($_POST['imgurl'])));
  $imgUrlFormated = "http://139.59.254.92/upload/".$imgUrl;
  $des=mysql_real_escape_string(htmlspecialchars(trim($_POST['des'])));
  $query = "UPDATE `Information_TBL` SET `avatarUrl`= '$imgUrlFormated', `seftDescription` = '$des' WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 7 WHERE userName = '$userName'");
    if (q1) {
      echo "saveSuccess";
    }else {
      echo "saveError";
    }
  }
  else{
    echo "saveError";
  }
}
?>
