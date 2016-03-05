$.init();

$(function(){
document.getElementById("mobileno").value = getMoblieNo();
	
});


var t = 0;
var h;
$("#get-code-btn").click(function() {
	if (t > 0) return false;
	t = 20;
	h = setInterval(function() {
		t--;
		$("#get-code-btn").text("等待" + t + "秒");
		if (t == 0) {
			clearInterval(h);
			$("#get-code-btn").text("获取验证码");
		}
	}, 1000);
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
		url: getRemoteSite() + '/api/base_code',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 0,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				$("#verify-uuid").val(data.Model);
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
		}
	});
}

function reset_pass() {
	//document.getElementById("trans").click();
	//return true;

	var m = document.getElementById("mobileno").value;
	var c = document.getElementById("code").value;
	var u = document.getElementById("verify-uuid").value;
	var p = document.getElementById("password").value;

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
	if (p.length < 6) {
		$.alert("密码长度太少，请继续输入");
		return false;
	}
	if (p.length > 16) {
		$.alert("密码长度太长，请减少");
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
		url: getRemoteSite() + '/api/base_account_reset_password',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				$.alert('重新设置密码成功');	
				document.getElementById("trans").click();
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
		}
	});
}