const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
 
    const url = 'http://api.weatherstack.com/current?access_key=2537ad17f3142c3dfe91d2f2a1f46c4c&query='+longitude+','+latitude+'&units=f'
    //console.log(url)

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect the location services', undefined)
        }else if(body.error){
            callback('Unable to find locations', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently  "+ body.current.temperature + " degress out. It feels like "+ body.current.feelslike +" degress out. The humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast