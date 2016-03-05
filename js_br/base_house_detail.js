$.init();

// 添加'refresh'监听器
$(document).on('refresh', '.pull-to-refresh-content', function(e) {

	refreshData();
});


function refreshData() {

	var qs = getQueryStrings();

	var data = getSignData();
	data.houseId = qs["no"];
	data.u = getAccountNo();


	$.ajax({
		type: 'GET',
		url: getRemoteSite() + '/api/get_house_detail',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				console.info(data);
				var html = template('is_message', data);
				document.getElementById("message").innerHTML = html;
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
});