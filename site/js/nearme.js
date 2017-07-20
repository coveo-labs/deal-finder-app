let updateTimeout;

document.addEventListener('DOMContentLoaded', function () {

	let root = document.getElementById('search');
	let longitude = 0;
	let latitude = 0;

	Coveo.SearchEndpoint.endpoints['default'] = new Coveo.SearchEndpoint({
		restUri: window.url,
		accessToken: window.key
	});

	Coveo.init(root, {
		ResultLink: {
			onClick: function (e, result) {
				e.preventDefault();
			}
		}
	});

	updateCoords();

	/**
	 * Gets the location of the user
	 * 
	 * @param {function} callback - The callback function with the data
	 * @returns {boolean} Returns false if no location was found
	 */
	function getLocation(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(callback,
				function (err) {
					$('#error').text("Failed to get location: " + err.message);
				});

		} else {
			return false;
		}
	}


	/**
	 * Updates the current search with the lastest coords
	 * 
	 * @param {any} callback - The callback function when everything is updated
	 */
	function updateCoords(callback) {
		getLocation(function (data) {
			longitude = data.coords.longitude;
			latitude = data.coords.latitude;
			Coveo.$$(root).on('doneBuildingQuery', function (e, args) {
				args.queryBuilder.queryFunctions.push({
					'function': `round(dist(@latitude,@longitude, ${latitude}, ${longitude}))`,
					'fieldName': 'distance'
				});
				args.queryBuilder.rankingFunctions.push({
					'expression': '1/@distance * 1000000',
					'normalizeWeight': false
				});
				args.queryBuilder.requiredFields.push('company_name', 'deal_type', 'description', 'longitude', 'latitude')
				args.queryBuilder.expression = new Coveo.ExpressionBuilder();
				args.queryBuilder.expression.add("@distance<" + $("#radius").val())
			});
			$('#search').coveo('executeQuery');
			if (callback) {
				callback();
			}
		});
	}

	//Update every slider tick
	$('#radius').on('change', function () {
		if (updateTimeout) {
			clearTimeout(updateTimeout);
		}
		updateTimeout = setTimeout(function () {
			updateCoords()
		}, 500);
	});

	//Update every minute, in case the user moves
	setInterval(function () {
		updateCoords()
	}, 1000 * 60);

});