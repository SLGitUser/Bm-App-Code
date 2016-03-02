$.init();

// 添加'refresh'监听器
$(document).on('refresh', '.pull-to-refresh-content', function(e) {
	//$.alert(111111111);
	 //模拟2s的加载过程
//	  setTimeout(function() {
//	      var cardNumber = $(e.target).find('.card').length + 1;
//	      var cardHTML = '<div class="card">' +
//	                        '<div class="card-header">card'+cardNumber+'</div>' +
//	                        '<div class="card-content">' +
//	                          '<div class="card-content-inner">' +
//	                              '这里是第' + cardNumber + '个card，下拉刷新会出现第' + (cardNumber + 1) + '个card。' +
//	                          '</div>' +
//	                        '</div>' +
//	                    '</div>';
//	
//	      $(e.target).find('.card-container').prepend(cardHTML);
//	      // 加载完毕需要重置
//	      $.pullToRefreshDone('.pull-to-refresh-content');
//	  }, 300);
	refreshData();
});


function refreshData() {


	var data = getSignData();
	data.m = getMoblieNo();

	console.log(data);

	$.ajax({
		type: 'GET',
		// http://123.56.185.114:8002/api/account?app=BEA&time=1456669504149&sign=c16f3826ee62405e4d24f19b8fa07911&m=18600000000&p=123456&_=1456669504153&callback=jsonp1
		url: getRemoteSite() + '/api/task_main_count',
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
				document.getElementById("activity-tuike-count").innerText = data.Model.TuikeAmount;
				document.getElementById("active-user-count").innerText = data.Model.ActiveCustomer;
				document.getElementById("total-sales-amount").innerText = data.Model.TotalSales;
				document.getElementById("user-task-count").innerText = data.Model.AlertCount;
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
	}).send();
}

$(function(){
refreshData();
	
});
