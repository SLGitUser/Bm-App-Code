
function register() {

	var m = document.getElementById("name").value;
	var c = document.getElementById("phone").value;
	var s = document.getElementById("sex").value;
	var d = document.getElementById("dj").value; 
	var e = document.getElementById("No").value; 
	var x = document.getElementById("txt").value; 
	if (!m) {
		$.alert("请输入姓名");
		return false;
	}
	if(!c){
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
	data.s=s;
	data.d=d;
	data.e=e;
	data.x=x;
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
$(function()
{
	$("#TJ").live('click',function(){
	register();
	})
	
})
