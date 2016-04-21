<?php
include "db.php";
if(isset($_POST['savestep1']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $fName=mysql_real_escape_string(htmlspecialchars(trim($_POST['fname'])));
  $mName=mysql_real_escape_string(htmlspecialchars(trim($_POST['mname'])));
  $lName=mysql_real_escape_string(htmlspecialchars(trim($_POST['lname'])));
  $birthday=mysql_real_escape_string(htmlspecialchars(trim($_POST['birthday'])));
  $age=intval($_POST['age']);
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
  $gender=mysql_real_escape_string(htmlspecialchars(trim($_POST['gender'])));
  $minAge=intval($_POST['minAge']);
  $maxAge=intval($_POST['maxAge']);
  $city=mysql_real_escape_string(htmlspecialchars(trim($_POST['city'])));
  $religon=mysql_real_escape_string(htmlspecialchars(trim($_POST['religon'])));
  $caste=mysql_real_escape_string(htmlspecialchars(trim($_POST['caste'])));
  $query = "INSERT INTO `Survey_TBL`(`userName`, `minAge`, `maxAge`, `caste`, `otherCity`, `otherReligion`, `gender`) VALUES ('$userName',$minAge,$maxAge,'$caste','$city','$religon','$gender')";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 7 WHERE userName = '$userName'");
    echo "saveSuccess";
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['savestep8']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $imgUrl=mysql_real_escape_string(htmlspecialchars(trim($_POST['imgurl'])));
  $imgUrlFormated = "http://139.59.254.92/upload/".$imgUrl;
  $des=mysql_real_escape_string(htmlspecialchars(trim($_POST['des'])));
  $query = "UPDATE `Information_TBL` SET `avatarUrl`= '$imgUrlFormated', `seftDescription` = '$des' WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    $q1=mysql_query("UPDATE Account_TBL SET settingAccountStep = 8 WHERE userName = '$userName'");
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

if(isset($_POST['editProfile']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $litteracy=mysql_real_escape_string(htmlspecialchars(trim($_POST['litteracy'])));
  $workFor=mysql_real_escape_string(htmlspecialchars(trim($_POST['work'])));
  $occupation=mysql_real_escape_string(htmlspecialchars(trim($_POST['occupation'])));
  $income=intval($_POST['income']);
  $query = "UPDATE `Profile_TBL`SET `highestLiteracy`='$litteracy',`workIn`='$workFor',`occupation`='$occupation',`income`=$income WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    echo "saveSuccess";
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['editFamily']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $type=mysql_real_escape_string(htmlspecialchars(trim($_POST['type'])));
  $caste=mysql_real_escape_string(htmlspecialchars(trim($_POST['caste'])));
  $trend=mysql_real_escape_string(htmlspecialchars(trim($_POST['trend'])));
  $query = "UPDATE `Family_TBL` SET `familyType`='$type',`familyTrend`='$trend',`caste`='$caste' WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    echo "saveSuccess";
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['editBasicInformation']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $fName=mysql_real_escape_string(htmlspecialchars(trim($_POST['fname'])));
  $mName=mysql_real_escape_string(htmlspecialchars(trim($_POST['mname'])));
  $lName=mysql_real_escape_string(htmlspecialchars(trim($_POST['lname'])));
  $birthday=mysql_real_escape_string(htmlspecialchars(trim($_POST['birthday'])));
  $age=intval($_POST['age']);
  $gender=mysql_real_escape_string(htmlspecialchars(trim($_POST['gender'])));
  $phone=intval($_POST['phone']);
  $nationality=mysql_real_escape_string(htmlspecialchars(trim($_POST['nationality'])));
  $cityStates=mysql_real_escape_string(htmlspecialchars(trim($_POST['citystates'])));
  $country=mysql_real_escape_string(htmlspecialchars(trim($_POST['country'])));
  $motherTongue=mysql_real_escape_string(htmlspecialchars(trim($_POST['mothertongue'])));
  $marial=mysql_real_escape_string(htmlspecialchars(trim($_POST['marial'])));
  $height=intval($_POST['height']);
  $weight=intval($_POST['weight']);
  $religon=mysql_real_escape_string(htmlspecialchars(trim($_POST['religion'])));
  $query = "UPDATE `Information_TBL` SET `firstName`='$fName',`middleName`='$mName',`lastName`='$lName',`dateOfBirth`=STR_TO_DATE('$birthday', '%m/%d/%Y'), `gender`='$gender',`marialStatus`='$marial',`phoneNumber`=$phone,`height`=$height,`weight`=$weight,`motherTongue`='$motherTongue',`nationality`='$nationality',`country`='$country',`cityStates`='$cityStates',`religion`='$religon',`age`=$age WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    echo "saveSuccess";
  }
  else{
    echo "saveError";
  }
}

if(isset($_POST['editsurvey']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $gender=mysql_real_escape_string(htmlspecialchars(trim($_POST['gender'])));
  $minAge=intval($_POST['minAge']);
  $maxAge=intval($_POST['maxAge']);
  $city=mysql_real_escape_string(htmlspecialchars(trim($_POST['city'])));
  $religon=mysql_real_escape_string(htmlspecialchars(trim($_POST['religon'])));
  $caste=mysql_real_escape_string(htmlspecialchars(trim($_POST['caste'])));
  $query = "UPDATE `Survey_TBL` SET `minAge`=$minAge,`maxAge`=$maxAge,`caste`='$caste',`otherCity`='$city',`otherReligion`='$religon',`gender`='$gender' WHERE userName = '$userName'";
  $q=mysql_query($query);
  if($q){
    echo "success";
  }
  else{
    echo "error";
  }
}
?>
