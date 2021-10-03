const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jenitha'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Jenitha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'You got the help',
        title: 'Help',
        name: 'Jeni'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You Must provide an address'
        })
    }

    // res.send({
    //     forecast: 'Its snowing',
    //     location: 'India',
    //     address: req.query.address
    // })
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not Found',
        title: '404',
        name: 'Jeni'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not Found',
        title: '404',
        name: 'Jeni'
    })
})

app.listen(3040, () => {
    console.log('Server is up on port 3040')
})