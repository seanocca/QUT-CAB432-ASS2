$(document).ready(function(){

	let data = $("form").serialize();

	if (data){
		$.ajax({
			type: "GET",
			url: "http://52.65.6.140:8000/tweets/"+ data,
			success: function(response){
				$("#chart").append("response");
			}
		})
	}

});