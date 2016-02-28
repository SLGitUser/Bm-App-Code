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
		// http://123.56.185.114:8002/api/account?app=BEA&time=1456669504149&sign=c16f3826ee62405e4d24f19b8fa07911&m=18600000000&p=123456&_=1456669504153&callback=jsonp1
		url: getRemoteSite() + '/api/account',
		// data to be added to query string:
		data: dataset,
		contentType: "application/json",
		// type of data we are expecting in return:
		dataType: 'jsonp',
		//18600961576async: false,
		//jsonpCallback: 'jsonpCallback',
		//data: JSON.stringify(postData),
		timeout: 3000,
		//context: $('body'),
		success: function(data, status, xhr) {
			// Supposing this JSON payload was received:
			//   {"project": {"id": 42, "html": "<div>..." }}
			// append the HTML to context object.
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				setAuth(data.Model.No);
				$.router.load("base_main.html");
			}
		},
		error: function(xhr, type, error) {
			$.alert('Ajax error!' + type + "," + error);
		},
		complete: function(xhr, status) {
			//alert("complete");
		}
	}).send();
}