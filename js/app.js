function isLogin() {
	var accountNo = getlocal("accountNo");
  return accountNo;
}

function setAuth(no){
	setlocal("accountNo", no);
}

function removeAuth(){
	try{
	removelocal("accountNo");		
	}catch(e){
		//TODO handle the exception
	}
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

function getRemoteSite() {
	return "http://123.56.185.114:8002";
}

function getSignData(){
	var data = {};
	data.app = "BEA";
	data.time = new Date().getTime().toString();
	data.sign = md5("f6201b5ee70cf748a339cc5f11b5c4c4" + "-" + data.time);
	return data;
}
