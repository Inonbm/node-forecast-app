
const request = require('request')

const forecast = (latitude,longitude, callback) => {

	let url = 'https://api.darksky.net/forecast/b263015f82747041f32bd08ca9ad864f/' + encodeURIComponent(latitude + ',' + longitude)

	request({url: url, json: true}, (error,response) => {
		if (error) {
			error = 'error'
			callback('unable to connect to weather services', {error,undefined})
		}
		else if (response.body.error) {
			error = 'error'
			callback ('Unable to find location, Try another search', {error, undefined})
		}
		else {
			callback(undefined, response.body.currently.summary)
		}
	})
}

module.exports = 
{
	forecast: forecast
}