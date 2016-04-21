function checkInternetConnection() {
  connectionStatus = navigator.onLine ? 'online' : 'offline';
  if (connectionStatus=='online') {
    return true;
  }else if (connectionStatus=='offline') {
    return false;
  }
}
