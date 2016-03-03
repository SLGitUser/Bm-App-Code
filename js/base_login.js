$.init();

removeAuth();

function login() {
	var m = document.getElementById("mobileno").value;
	var p = document.getElementById("password").value;

	if (!m) {
		$.alert("请输入手机号码");
		return false;
	}
	if (!p) {
		$.alert("请输入密码");
		return false;
	}
	if (m.length !== 11) {
		$.alert("请输入正确的手机号码，长度必须为11位");
		return false;
	}
	if (p.length < 4) {
		$.alert("密码长度太少，请继续输入");
		return false;
	}

	var dataset = getSignData();
	dataset.m = m;
	dataset.p = p;

	$.ajax({
		type: 'GET',
		url: getRemoteSite() + '/api/base_account_auth',
		data: dataset,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				setAuth(data.Model.No);
				setMoblieNo(document.getElementById("mobileno").value);
				$.router.load(data.Model.Types[0] + "/base_main.html");
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