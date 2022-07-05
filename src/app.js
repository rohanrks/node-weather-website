const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const app = express()

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname , '../public')
const viewDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index',{
		title : 'Weather',
		msg : 'Get your Weather',
		author : 'Rohan Kumar',
	})
})

app.get('/help', (req, res) => {
	res.render('help',{
		title : 'Help',
		msg : 'Help page',
		author : 'Rohan Kumar',
	})
})

app.get('/about', (req, res) => {
	res.render('about',{
		title : 'About',
		msg : 'My name is Rohan kumar srichandan. I complited my BCA and pursuing my MCA in 4th sem. I did this project for my 4th semister project submission.',
		author : 'Rohan Kumar',
	})
})


app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error : 'You must have provide address'
		})
	}
	geoCode( req.query.address , (err, {lat, lang} = {}) =>{
		if(err){
			return res.send({
				error : err
			})
		}

		forecast( lat, lang, (error, {location,temperature,desc} = {}) =>{
			if(err){
				return res.send( {error} )
			}
			res.send({
				location,
				temperature,
				weather : desc
			})
		})
	})
})
	



app.listen(port, () => {
	console.log('Server is running with '+ port +' port')
})