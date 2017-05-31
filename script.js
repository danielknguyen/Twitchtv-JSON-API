$(document).ready(function(){
	var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

	twitchUsers.map(function(data){
		$.ajax({
			url:'https://wind-bow.gomix.me/twitch-api/channels/' + data,
			dataType:'jsonp',
			data:{
				'callback':'?',
			},
			success: function(results){
				// console.log(results);
			
				if (results.logo != null) {
					imageSrc = results.logo;
				} else {
					imageSrc = 'https://vignette3.wikia.nocookie.net/java/images/0/0e/Camera_icon.gif/revision/latest?cb=20090227194712';
				}

				var logo = '<div class="img-div col-sm-2 col-md-2"><img class="user-icon" src="' + imageSrc + '"></div>';
				var userStatus = results.status;
				var userName = '<div class="user-div col-sm-2 col-md-2"><div class="user-username">' + results.display_name + '</div></div>';

				function trucateString(str) {
					var newString = "";
					if (str.length > 35) {
						newString = str.slice(0, 35) + ' ...';
					} else {
						newString = str;
					}
					return newString;
				};

				if (results.status != null) {
					userStatus = trucateString(userStatus);
				} else {
					userStatus = 'Offline';
				}

				var description = '<div class="user-description col-sm-8 col-md-8"><div class="twitch-description">' + userStatus + '</div></div>';

				var users = '<div id="twitch-online" class="col-sm-12 col-md-12 text-center">';

				users = users + logo + userName + description + '</div>';
				
				$('html').append(users);
			}
		})
	})

});		