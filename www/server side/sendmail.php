<?php
ignore_user_abort(true);
$check = 0;
if(isset($_POST['sendmail']) && $check == 0)
{
  $email=$_POST['email'];
  $emailType=$_POST['type'];
  if ($emailType=='rspassword') {
    $passw = $_POST['password'];
    $subject = 'Your new password!';
    $mess = 'This is your new password, please change it after first login!';
    sendEmail($email,$subject, 'user', $mess, $passw);
    $check = 1;
    exit(0);
  }elseif ($emailType=='newreg') {
    $user=$_POST['user'];
    $passw = $_POST['password'];
    $code=$_POST['code'];
    $subject = 'Register information';
    $mess = 'Thank you for signup at Tiny Matrimony<br/>Login to your account with password: '.$passw.' and using this code below to active your account.';
    sendEmail($email,$subject, $user, $mess, $code);
    $check = 1;
    exit(0);
  }elseif ($emailType=='resendactcode') {
    $user=$_POST['userName'];
    $code=$_POST['code'];
    $subject = 'New active code';
    $mess = 'You has request a new active code<br/>Your new active code is below:';
    sendEmail($email,$subject, $user, $mess, $code);
  }
  exit(0);
}


function sendEmail($email, $subject, $user, $mess,$code)
{
  // message
  $message = '
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
  <meta content="telephone=no" name="format-detection" />
  <title>TinySoft</title>


  <style type="text/css" media="screen">
  /* Linked Styles */
  body { padding:0 !important; margin:0 !important; display:block !important; background:#ffffff; -webkit-text-size-adjust:none }
  a { color:#00b8e4; text-decoration:underline }
  h3 a { color:#1f1f1f; text-decoration:none }
  .text2 a { color:#ea4261; text-decoration:none }


  /* Campaign Monitor wraps the text in editor in paragraphs. In order to preserve design spacing we remove the padding/margin */
  p { padding:0 !important; margin:0 !important }
  </style>
  </head>
  <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; background:#ffffff; -webkit-text-size-adjust:none">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
  <tr>
  <td align="center" valign="top">
  <table width="800" border="0" cellspacing="0" cellpadding="0">
  <!-- Header -->
  <tr>
  <td align="center" bgcolor="#1f1f1f">
  <table width="620" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left"><a href="#" target="_blank"><img src="http://139.59.254.92/logo.png" alt="" border="0" width="71" height="52" /></a></td>
  <td align="right">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <!-- END Header -->
  <!-- Content -->
  <tr>
  <td>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="90"></td>
  <td>
  <div style="font-size:0pt; line-height:0pt; height:30px"><img src="http://139.59.254.92/empty.gif" width="1" height="30" style="height:30px" alt="" /></div>
  <div>
  <div style="font-size:0pt; line-height:0pt; height:10px"><img src="http://139.59.254.92/empty.gif" width="1" height="10" style="height:10px" alt="" /></div>
  </div>
  <div>
  <div style="font-size:0pt; line-height:0pt; height:10px"><img src="http://139.59.254.92/empty.gif" width="1" height="10" style="height:10px" alt="" /></div>
  <div class="text-center" style="color:#868686; font-family:Tahoma; font-size:14px; line-height:18px; text-align:center">
  <div>
  Hi '.$user.'!<br />'.$mess.'
  </div>
  <br/>
  <div class="h2" style="color:#1f1f1f; font-family:Tahoma; font-size:20px; line-height:24px; text-align:center; font-weight:bold">
  <div>'.$code.'</div>
  </div>
  </div>
  <div style="font-size:0pt; line-height:0pt; height:35px"><img src="http://139.59.254.92/empty.gif" width="1" height="35" style="height:35px" alt="" /></div>
  </div>
  <div>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  </table>
  </td>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="90"></td>
  </tr>
  </table>
  </td>
  </tr>
  <!-- END Content -->
  <!-- Footer -->
  <tr>
  <td>
  <div class="img" style="font-size:0pt; line-height:0pt; text-align:left"><img src="http://139.59.254.92/footer_top.jpg" alt="" border="0" width="800" height="10" /></div>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#eeefec">
  <tr>
  <td>
  <div style="font-size:0pt; line-height:0pt; height:12px"><img src="http://139.59.254.92/empty.gif" width="1" height="12" style="height:12px" alt="" /></div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td align="center">
  <table border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left"><a href="#" target="_blank"><img src="http://139.59.254.92/facebook.jpg" alt="" border="0" width="43" height="43" /></a></td>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="7"></td>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left"><a href="#" target="_blank"><img src="http://139.59.254.92/twitter.jpg" alt="" border="0" width="43" height="43" /></a></td>
  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="7"></td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  <div style="font-size:0pt; line-height:0pt; height:30px"><img src="images/empty.gif" width="1" height="30" style="height:30px" alt="" /></div>
  <div class="footer" style="color:#a9aaa9; font-family:Arial; font-size:11px; line-height:20px; text-align:center">
  <div>
  Tiny Matrimony<br />
  Copyright &copy; <span>2016</span> <span>Tiny Soft</span>.
  </div>
  </div>
  <div style="font-size:0pt; line-height:0pt; height:25px"><img src="images/empty.gif" width="1" height="25" style="height:25px" alt="" /></div>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <!-- END Footer -->
  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>
  ';

  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  // Additional headers
  $headers .= 'From: Tiny Matrimony>' . "\r\n";
  // Mail it
  mail($email, $subject, $message, $headers);
}

?>
