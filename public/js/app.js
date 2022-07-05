const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
    const location = search.value
	msgTwo.textContent = 'Loading...'
	msgOne.textContent = ''

	fetch('/weather?address='+location).then((res) => {
		res.json().then( (data) => {
			
			if(data.error){
				msgOne.textContent = data.error
				msgTwo.textContent = ''
			}else{
			    msgOne.textContent = 'Forcast : '+ data.weather 
				msgTwo.textContent = 'Temperature : '+data.temperature
			}
		})
	})	
})