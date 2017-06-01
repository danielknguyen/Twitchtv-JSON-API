$(document).ready(function(){
	var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var isOnline = 'streams/';
	var isOffline = 'channels/';

	twitchUsers.map(function(data){
		$.ajax({
			url:'https://wind-bow.gomix.me/twitch-api/' + isOnline + data,
			dataType:'jsonp',
			data: {
				'callback':'?',
			},
			success: function(results){
				// console.log(results);
				if (results.stream != null) {
					if (results.stream.channel.logo != null) {
					imageSrc = results.stream.channel.logo;
					} else {
						imageSrc = 'https://vignette3.wikia.nocookie.net/java/images/0/0e/Camera_icon.gif/revision/latest?cb=20090227194712';
					}

					var logo = '<div class="img-div col-sm-2 col-md-2"><img class="user-icon" src="' + imageSrc + '"></div>';
					var userStatus = trucateString(results.stream.channel.status);
					var userName = '<div class="user-div col-sm-2 col-md-2"><div class="user-username"><a class="twitch-link" target="_blank" href="' + results.stream.channel.url + '">' + results.stream.channel.display_name + '</a></div></div>';

					function trucateString(str) {
						var newString = "";
						if (str.length > 35) {
							newString = str.slice(0, 35) + ' ...';
						} else {
							newString = str;
						}
						return newString;
					};
					
					var description = '<div class="user-description col-sm-8 col-md-8"><div class="twitch-description">' + userStatus + '</div></div>';

					var users = '<div id="twitch-online" class="col-sm-12 col-md-12 text-center">';

					users = users + logo + userName + description + '</div>';
					
					$('#twitch-container').append(users);
				} else {
					$.ajax({
						url: 'https://wind-bow.gomix.me/twitch-api/' + isOffline + data,
						dataType: 'JSONP',
						data: {
							'callback':'?'
						},
						success: function(results){
							// console.log(results);

							if (results.logo != null) {
								imageSrc = results.logo;
							} else {
								imageSrc = 'https://vignette3.wikia.nocookie.net/java/images/0/0e/Camera_icon.gif/revision/latest?cb=20090227194712';
							}

							var logo = '<div class="img-div col-sm-2 col-md-2"><img class="user-icon" src="' + imageSrc + '"></div>';
							var userStatus = 'Offline';
							var userName = '<div class="user-div col-sm-2 col-md-2"><div class="user-username"><a class="twitch-link" target="_blank" href="' + results.url + '">' + results.name + '</a></div></div>';
							var description = '<div class="user-description col-sm-8 col-md-8"><div class="twitch-description">' + userStatus + '</div></div>';

							var users = '<div id="twitch-offline" class="col-sm-12 col-md-12 text-center">';

							users = users + logo + userName + description + '</div>';

							$('#twitch-container').append(users);
						}
					})
				}
			}
		})
	}) 
});		