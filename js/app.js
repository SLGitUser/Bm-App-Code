function isLogin() {
	var accountNo = getlocal("accountNo");
	return accountNo;
}

function setMoblieNo(no) {
	setlocal("mobileNo", no);
}

function getMoblieNo() {
	return getlocal("mobileNo");
}

function getAuth() {
	return getlocal("accountNo");
}

function setAuth(no) {
	setlocal("accountNo", no);
}

function removeAuth() {
	try {
		removelocal("accountNo");
	} catch (e) {
		//TODO handle the exception
	}
}

function getlocal(key) {
	return localStorage.getItem(key);
}

function setlocal(key, value) {
	localStorage.setItem(key, value);
}

function removelocal(key) {
	localStorage.removeItem(key);
}

function getRemoteSite() {
	return "http://localhost:62338";
	//return "http://192.168.0.150:62338"
}

function getSignData() {
	var data = {};
	data.app = "BEA";
	data.time = new Date().getTime().toString();
	data.sign = md5("f6201b5ee70cf748a339cc5f11b5c4c4" + "-" + data.time);
	return data;
}

function getQueryStrings() {
	var assoc = {};
	var decode = function(s) {
		return decodeURIComponent(s.replace(/\+/g, " "));
	};
	var queryString = location.search.substring(1);
	var keyValues = queryString.split('&');

	for (var i in keyValues) {
		var key = keyValues[i].split('=');
		if (key.length > 1) {
			assoc[decode(key[0])] = decode(key[1]);
		}
	}
	return assoc;
}

function gotoPage(url) {
	var href = document.getElementById("trans");
	if (href == null) {
		$.alert("请在页面里设置跳转链接");
		return;
		//href = document.createElement("a");
		//document.body.appendChild(href);
	}
	href.setAttribute("href", url);
	href.click();
}