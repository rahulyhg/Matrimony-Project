var options = {
  "direction"      : "up", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
  "duration"       :  600, // in milliseconds (ms), default 400
  "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
  "androiddelay"   :  100,  // same as above but for Android, default 70
  "winphonedelay"  :  150 // same as above but for Windows Phone, default 200
};
window.plugins.nativepagetransitions.flip(
  options,
  function (msg) {console.log("success: " + msg)}, // called when the animation has finished
  function (msg) {alert("error: " + msg)} // called in case you pass in weird values
);
