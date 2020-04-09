console.log('JS Client side is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')//start by id so start with #
const messageTwo = document.querySelector('#message-2')//start by id so start with #

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value

	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent =data.location
				messageTwo.textContent =data.forecast
			}

		})
	})
})