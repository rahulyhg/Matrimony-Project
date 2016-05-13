<?php
include "db.php";
if(isset($_POST['uploadImg']))
{
  $userName=mysql_real_escape_string(htmlspecialchars(trim($_POST['userName'])));
  $imgUrl=mysql_real_escape_string(htmlspecialchars(trim($_POST['imgurl'])));
  $imgUrlFormated = "http://139.59.254.92/upload/".$imgUrl;
  $query = "INSERT INTO `UserImage_TBL`(`userName`, `imageUrl`) VALUES ('$userName','$imgUrlFormated')";
  $q=mysql_query($query);
  if($q){
    echo "saveSuccess";
  }
  else{
    echo "saveError";
  }
}
?>
