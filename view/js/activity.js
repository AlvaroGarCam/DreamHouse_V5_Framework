function protecturl() {
	$.ajax({
		type : 'POST',
		url  : friendlyURL("?module=login&op=controluser"),
		data :  {token: localStorage.getItem('token')}
	})
	.done(function(data){
		if (data == "match"){
			console.log(data);
		}else if (data == "not_match"){
			toastr.options.timeOut = 2000;
			toastr.error("Debes realizar login");
			setInterval(function(){logout()}, 2000);
		}
	})
	.fail( function(response){
		console.log(response)	
	});
}

function protect_activity() {
	setInterval(function(){
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=login&op=activity"),
			success :  function(response){
				if(response == "inactivo"){
					toastr.options.timeOut = 2000;
					toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
					setInterval(function(){logout()}, 2000);
				}
			}
		});
	}, 600000);
}

function token_expires() {
	setInterval(function(){
		if(localStorage.getItem('token') == null){
			console.log('Not registred');
		} else {
			$.ajax({
				type : 'POST',
				url  : friendlyURL("?module=login&op=token_expires"),
				data :  {token: localStorage.getItem('token')}
			})
			.done(function(data){
				console.log(data);
				if (data == "activo"){
					console.log(data);
				}else if (data == "inactivo"){
					toastr.options.timeOut = 2000;
					toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
					setInterval(function(){logout()}, 2000);
				}					
			})
			.fail( function(response){
				console.log(response)	
			});
		}
	}, 600000);
}

function refresh_session() {
	setInterval(function(){
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=login&op=refresh_cookie"),
		}).done(function(data){			
			console.log("$Session updated");
		})
		.fail( function(response){
			console.log(response);	
		});
	}, 600000);
}

function refresh_token() {
	setInterval(function(){
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=login&op=refresh_token"),
			data :  {token: localStorage.getItem('token')}
		}).done(function(data){			
			localStorage.setItem("token", data);
		})
		.fail( function(response){
			console.log(response);	
		});
	}, 600000);
}

$(document).ready(function(){
	protect_activity();
	token_expires();
	refresh_token();
	refresh_session();
	protecturl();
});
