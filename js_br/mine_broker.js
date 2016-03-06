$.init();

// 添加'refresh'监听器
$(document).on('refresh', '.pull-to-refresh-content', function(e) {

	refreshData();
	refreshData2();
});


function refreshData() {


	var data = getSignData();
	data.m = getMoblieNo();
	data.u = getAccountNo();

	console.log(data);

	$.ajax({
		type: 'get',
		url: getRemoteSite() + '/api/get_mine_detail',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				console.info(data);
				var html = template('mine', data.Model);
				document.getElementById("mine-list-all").innerHTML = html;
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
		
		
		

function refreshData2() {


	var data = getSignData();
	data.m = getMoblieNo();
	data.u = getAccountNo();

	console.log(data);
		
		
		
		$.ajax({
		type: 'get',
		url: getRemoteSite() + '/api/get_mine_firmall',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				console.info(data);
				var html = template('firmall', data);
				document.getElementById("firm-list-all").innerHTML = html;
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



function save() {
	var data = getSignData();
	data.m = getMoblieNo();
	data.u = getAccountNo();
	data.n = firmNo;

	console.log(data);
		
		
		
		$.ajax({
		type: 'get',
		url: getRemoteSite() + '/api/get_mine_save',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				console.info(data);
				var html = template('firmall', data);
				document.getElementById("firm-list-all").innerHTML = html;
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



$(function() {
	refreshData();
	refreshData2();
});