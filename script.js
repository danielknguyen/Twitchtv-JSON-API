$(document).ready(function(){

	var twitchUsers = ["esl_sc2", "ogamingsc2", "freecodecamp", "noobs2ninjas"];
	var isOnline = 'streams/';
	var isOffline = 'channels/';

	twitchUsers.forEach(function(user){
		runTwitchSearch(user);
	})

	function runTwitchSearch(user){
		$.ajax({
			url:'https://wind-bow.gomix.me/twitch-api/' + isOnline + user,
			dataType:'jsonp',
			data: {
				'callback':'?',
			},
			success: function(results){
				console.log(results);
				
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
					var newUser = $('.twitch-search').val().toLowerCase();
					twitchUsers.push(newUser);
					$('.twitch-search').val('');

				} else {
					$.ajax({
						url: 'https://wind-bow.gomix.me/twitch-api/' + isOffline + user,
						dataType: 'JSONP',
						data: {
							'callback':'?'
						},
						success: function(results){
							console.log(results);

							var channelUnavailable = results.message;

							if (results.status === 400 || results.status === 401 || results.status === 403 || results.status === 404 || results.status === 422 || results.status === 429 || results.status === 500 || results.status === 503) {

								$('.user-success').hide();
								return false;

								$('.user-error')
									.text(channelUnavailable)
									.show();
									
							} else {
								$('.user-error')
									.hide();
							}

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
							var newUser = $('.twitch-search').val().toLowerCase();
							twitchUsers.push(newUser);
							$('.twitch-search').val('');

							
						}
					})
				}
			}
		}) 
	}
	
	$('.twitch-search').keypress(function(e) {

		var key = e.which || e.keyCode;
		if(event.keyCode === 13) {
			e.preventDefault();
			var newUser = $('.twitch-search').val().toLowerCase();
			if (newUser === "") {
				return false;

			} else if (twitchUsers.indexOf(newUser) > -1) {
				$('.user-success').hide();
				$('.user-error')
					.text('*Twitch user already exist on the list*')
					.show();
			} else {
				runTwitchSearch(newUser);
				$('.user-error').hide();
				$('.user-success').show();
			}
		}

	})

	$('.button-search').on('click',function(e){
		e.preventDefault();
		var newUser = $('.twitch-search').val().toLowerCase();
		if (newUser === "") {
			return false;

		} else if (twitchUsers.indexOf(newUser) > -1) {
			$('.user-error')
				.text('*Twitch user already exist on the list*')
				.show();
		} else {
			runTwitchSearch(newUser);
			$('.user-error').hide();
			$('.user-success').show();
		}
	})
});		