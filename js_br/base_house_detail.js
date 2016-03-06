$.init();
//添加'refresh'监听器
$(document).on('refresh', '.pull-to-refresh-content', function(e) {

	refreshData();
});

//切换收藏状态
function changeCollect(){
	var qs = getQueryStrings();
	var data = getSignData();
	data.u = getAccountNo();
	data.h = qs["no"];
	$.ajax({
		type: 'GET',
		url: getRemoteSite() + '/api/collect_house',
		data: data,
		contentType: "application/json",
		dataType: 'jsonp',
		timeout: 10000,
		success: function(data, status, xhr) {
			if (data.HasError) {
				$.alert(data.Errors.join(","));
			} else {
				console.info(data+"     "+data.Result);
				if(data.Result.toString()==="false"){
					$("#star").removeClass("icon-star");
					$("#star").addClass("icon-card");
				}else{
					$("#star").removeClass("icon-card");
					$("#star").addClass("icon-star");
				}
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
		}
	});
}

//刷新数据
function refreshData() {

	var qs = getQueryStrings();

	var data = getSignData();
	data.id = qs["no"];
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
				data.Model.AddrPic = getPicUrl()+data.Model.AddrPic;
				data.Model.From = data.Model.From.toString();
				data.Model.Clinch = data.Model.Clinch.toString();
				data.Model.See = data.Model.See.toString();
				data.Model.NeedSee = data.Model.NeedSee.toString();
				data.Model.NeedSeeThirty = data.Model.NeedSeeThirty.toString();
				console.info(data);
				var html = template('is_message', data.Model);
				document.getElementById("message").innerHTML = html;
				document.getElementById("abc").src = data.Model.AddrPic;
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
	$("#star").click(function(){
		changeCollect();
	});
}

$(function() {
	refreshData();
});