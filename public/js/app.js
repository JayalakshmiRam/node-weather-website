// const { response } = require("express")

console.log('Client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)  => {
//     response.json().then((data) => {
//         //console.log(data)
//     })
// })

fetch('http://localhost:3040/weather?address=india').then((res) => {

    if(res.error){
       console.log(data.error)
    }else{
        res.json().then((data) => {
            // console.log(data.location)
            // console.log(data.forecast)
        })
    }    
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Hai from js file'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)

    messageTwo.textContent = 'Loading..'
    messageTwo.textContent = ''


    fetch('http://localhost:3040/weather?address=' + location).then((res) => {
    
        res.json().then((data) => {

            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            

            // console.log(data.location)
            // console.log(data.forecast)
        })
    })
})