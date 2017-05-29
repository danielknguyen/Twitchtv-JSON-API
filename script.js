$(document).ready(function(){
	$.ajax({
		url:'https://wind-bow.gomix.me/twitch-api/streams/featured',
		dataType:'jsonp',
		data:{
			'callback':'?',
		},
		success: function(results){
			console.log(results);
		}
	})
});