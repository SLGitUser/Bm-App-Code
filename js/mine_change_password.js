$.init();

document.getElementById("mobileno").value = getMoblieNo();

var t = 0;
var h;
$("#get-code-btn").click(function() {
	if (t > 0) return false;
	t = 20;
	h = setInterval(function() {
		t--;
		$("#get-code-btn").text("等待" + t + "秒后可重发");
		if (t == 0) {
			clearInterval(h);
			$("#get-code-btn").text("单击获取验证码");
		}
	}, 1000);
	//login();
	//$.alert("请输入手机号接收到的验证码");
});


function getCode() {

	var m = document.getElementById("mobileno").value;

	if (!m) {
		$.alert("请输入手机号码");
		return false;
	}
	if (m.length !== 11) {
		$.alert("请输入正确的手机号码，长度必须为11位");
		return false;
	}

	var data = getSignData();
	data.m = m;
	data.t = "reset_password";

	$.ajax({
		type: 'GET',
		// http://123.56.185.114:8002/api/account?app=BEA&time=1456669504149&sign=c16f3826ee62405e4d24f19b8fa07911&m=18600000000&p=123456&_=1456669504153&callback=jsonp1
		url: getRemoteSite() + '/api/base_code',
		//url: "http://192.168.1.10:62338" + '/api/code',
		// data to be added to query string:
		data: data,
		contentType: "application/json",
		// type of data we are expecting in return:
		dataType: 'jsonp',
		//18600961576async: false,
		//jsonpCallback: 'jsonpCallback',
		//data: JSON.stringify(postData),
		timeout: 0,
		//context: $('body'),
		success: function(data, status, xhr) {
			// Supposing this JSON payload was received:
			//   {"project": {"id": 42, "html": "<div>..." }}
			// append the HTML to context object.
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				$("#verify-uuid").val(data.Model);
				//$.alert(data.Model);
				//setAuth(data.Model.No);
				//$.router.load("base_login.html"); 
			}
		},
		error: function(xhr, type, error) {
			if("timeout" === type) {
				$.alert("网络请求超时，请检查设备信号后重试。");
			} else{
				$.alert('网络请求错误，' + type + "," + error);
			}
		},
		complete: function(xhr, status) {
			//alert("complete");
		}
	});
}

function register() {

	var m = document.getElementById("mobileno").value;
	var c = document.getElementById("code").value;
	var u = document.getElementById("verify-uuid").value;
	var p = document.getElementById("password").value;
	var pc = document.getElementById("password_confirm").value;

	if (!m) {
		$.alert("请输入手机号码");
		return false;
	}
	if (m.length !== 11) {
		$.alert("请输入正确的手机号码，长度11位");
		return false;
	}
	if (!c) {
		$.alert("请输入验证码");
		return false;
	}
	if (c.length !== 5) {
		$.alert("请输入正确的验证码，长度5位");
		return false;
	}
	if (!u) {
		$.alert("你没有收到有效的验证码，请单击获取验证码");
		return false;
	}
	if (!p) {
		$.alert("请输入密码");
		return false;
	}
	if (p.length < 4) {
		$.alert("密码长度太少，请继续输入");
		return false;
	}
	if (!pc) {
		$.alert("请重复输入密码");
		return false;
	}
	if (p !== pc) {
		$.alert("重复输入密码不正确，请检查后输入");
		return false;
	}

	var data = getSignData();
	data.m = m;
	data.p = p;
	data.u = u;
	data.c = c;
	
	console.log(data);

	$.ajax({
		type: 'GET',
		// http://123.56.185.114:8002/api/account?app=BEA&time=1456669504149&sign=c16f3826ee62405e4d24f19b8fa07911&m=18600000000&p=123456&_=1456669504153&callback=jsonp1
		url: getRemoteSite() + '/api/base_account_reset_password',
		// data to be added to query string:
		data: data,
		contentType: "application/json",
		// type of data we are expecting in return:
		dataType: 'jsonp',
		//18600961576async: false,
		//jsonpCallback: 'jsonpCallback',
		//data: JSON.stringify(postData),
		timeout: 10000,
		//context: $('body'),
		success: function(data, status, xhr) {
			// Supposing this JSON payload was received:
			//   {"project": {"id": 42, "html": "<div>..." }}
			// append the HTML to context object.
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				$.alert('重新设置密码成功');	
				$.router.load("base_mine.html");
			}
		},
		error: function(xhr, type, error) {
			if("timeout" === type) {
				$.alert("网络请求超时，请检查设备信号后重试。");
			} else{
				$.alert('网络请求错误，' + type + "," + error);
			}
		},
		complete: function(xhr, status) {
			//alert("complete");
		}
	}).send();
}