<?php
// Directory where uploaded images are saved
$dirname = "upload/";
// If uploading file
if ($_FILES) {
  print_r($_FILES);
  mkdir ($dirname, 0777, true);
  move_uploaded_file($_FILES["file"]["tmp_name"],$dirname."/".$_FILES["file"]["name"]);
  $urltmp = $dirname."/".$_FILES["file"]["name"];
  $arr = array(
    array(
      "url" => $urltmp
    )
  );
  // $respondMess = {"serverUrl" : $urltmp};
  echo json_encode($arr);
}
?>
