function refreshData() {
	var data = getSignData();
	data.m = getMoblieNo();
	console.log(data);
	$.ajax({
		type: 'GET',
		// http://123.56.185.114:8002/api/account?app=BEA&time=1456669504149&sign=c16f3826ee62405e4d24f19b8fa07911&m=18600000000&p=123456&_=1456669504153&callback=jsonp1
		url: getRemoteSite() + '/api/base_customer_details',
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
				var html = template('cpl', data.Model);
				console.log(html);
				document.getElementById('cpl-c').innerHTML = html;
				document.getElementById("name").value = data.Model.Name;
				document.getElementById("phone").value = data.Model.Phone;
				document.getElementById("sex").value = data.Model.Sex;
				document.getElementById("dj").value = data.Model.dj;
				document.getElementById("No").value = data.Model.No;
				document.getElementById("txt").value = data.Model.Txt;
				document.getElementById("ud").value = data.Model.ud;
				$.pullToRefreshDone('.pull-to-refresh-content');
			}
		},
		error: function(xhr, type, error) {
			if ("timeout" === type) {
				$.alert("网络请求超时，请检查设备信号后重试。");
			} else {
				$.alert('网络请求错误，' + type + "," + error);
			}
		},
		complete: function(xhr, status) {
			//alert("complete");
		}
	});
}

function register() {

	var m = document.getElementById("name").value;
	var c = document.getElementById("phone").value;
	var s = document.getElementById("sex").value;
	var d = document.getElementById("dj").value;
	var e = document.getElementById("No").value;
	var x = document.getElementById("txt").value;
	var ud = document.getElementById("ud").value;

	if (!m) {
		$.alert("请输入姓名");
		return false;
	}
	if (!c) {
		$.alert("请输入手机号");
		return false;
	}
	if (c.length !== 11) {
		$.alert("请输入正确的手机号码，长度11位");
		return false;
	}
	var data = getSignData();
	alert(data)
	data.m = m;
	data.c = c;
	data.s = s;
	data.d = d;
	data.e = e;
	data.x = x;
	data.ud=ud;
	data.u = getAccountNo();
	$.ajax({
		type: 'GET',
		url: getRemoteSite() + '/api/base_customer_create',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				setAuth(data.Model.No);
				$.router.load("_br/base_main.html");
			}
		},
		error: function(xhr, type, error) {
			if ("timeout" === type) {
				$.alert("网络请求超时，请检查设备信号后重试。");
			} else {
				$.alert('网络请求错误，' + type + "," + error);
			}
		},
		complete: function(xhr, status) {}
	});
}
$(function() {
	refreshData();
	$("#TJ").live('click', function() {
		register();
	})

})