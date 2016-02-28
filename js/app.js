function isLogin() {
	var accountNo = getlocal("accountNo");
  return accountNo;
}

function setAuth(no){
	setlocal("accountNo", no);
}

function removeAuth(){
	removelocal("accountNo");
}

function getlocal(key){
	return localStorage.getItem(key);
}

function setlocal(key, value){
	localStorage.setItem(key, value);
}
function removelocal(key){
	localStorage.removeItem(key);
}