const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

const directory_path = path.join(__dirname,'../public')
const view_path = path.join(__dirname,'../templates/views')
const partial_path = path.join(__dirname,'../templates/partials')

//setup handlebars engine
app.set('view engine', 'hbs')
//setup views location
app.set('views', view_path)
hbs.registerPartials(partial_path)
app.use(express.static(directory_path))

app.get('', (request,response) => {
	response.render('index', {
		title: 'Weather',
		name: 'Inon'
		})
})

app.get('/help', (request,response) => {
	response.render('help', {
		title: 'Help',
		name: 'Inon'
		})
})

app.get('/about', (request,response) => {
	response.render('about', {
		title: 'About',
		name: 'Inon'
		})
})

app.get('/weather', (request, response) => {
	console.log('gettint weather forecast')
	if(!request.query.address) {
		return response.send({
			error: 'You must provide an address'
		})
	}

	geocode.geocode(request.query.address, (error, {latitude, longitude, location}) => {
		if (error) {
			return response.send({error})
		}

		weather.forecast(latitude, longitude , (error, forecastData) => {
			if (error) {
				return console.log(error)
			}

			response.send({
				forecast: forecastData, 
				location: location,
				address: request.query.address
			})
		})
	})
})

app.get('/products', (request, response) => {
	if(!request.query.search) {
		return response.send({
			error: 'You must provide a search term'
		})
	}

	console.log(request.query.search)

	response.send({
		products: []
	})
})

app.get('/help/*', (request,response) => {
	response.render('404', {
		title: '404',
		name: 'Inon Ben Meleh',
		errorMessage: 'Help article not found'
	})
})

app.get('*', (request,response) => {
	response.render('404', {
		title: '404',
		name: 'Inon Ben Meleh',
		errorMessage: 'page not found'
	})
})


app.listen(3000, () => {
	console.log('Server is up on port 3000')
})