
const request = require('request')

const geocode = (address, callback) => {
	const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW5vbiIsImEiOiJjazhhNDB0YzcwMHNjM2dwY2phZ3B4ZWk5In0.BTArzayckxUFwqk-b8Evow'
console.log('someone asked for' + geocodeurl)
	request({url: geocodeurl, json: true}, (error,response) => {
		if (error) {
			console.log(geocodeurl + 'is an error')
			callback('unable to connect to location services', undefined)
		}
		else if (response.body.features.length == 0) {
			error = 'feature length == 0'
			callback ('Unable to find location, Try another search', {error,undefined})
		}
		else if (response.body.error) {
			console.log(geocodeurl + 'is a body error')
			error = 'body error'
			callback ('Unable to find location, Try another search', {error, undefined})
		}
		else {
			console.log('Searching for location')
			callback(undefined, {
				longitude: response.body.features[0].center[1],
				latitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			})
		}
	})
}

module.exports = 
{
	geocode: geocode
}