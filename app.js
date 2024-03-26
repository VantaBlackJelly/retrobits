//HTTP handlers
const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 3000

//Image / SVG manipulation


//      Async / Await example because I can never remember how to do it
//________________________________________________________________________
//Define an asynchronous function to be called upon a homepage GET request
// async function getRandomActivity(){

//     try{

//         //Store response from api promise in variable
//         let response = await axios.get('http://www.boredapi.com/api/activity/')
        
//         //Return for use in higher scope
//         return response.data

//     }
//     catch(err){

//         console.log(err)

//     }

// }
//________________________________________________________________________


// // returns a window with a document and an svg root node
// const window = createSVGWindow()
// const document = window.document

// // register window and document
// registerWindow(window, document)

// const canvas = SVG(document.documentElement)

// canvas.rect(100, 100).fill('yellow').move(50,50)

//Homepage 
app.get('/api/v1/hello/', (req, res) => 
    {
        try {
                // console.log(`${res.statusCode}`)
                res.send("Hello World!!!")
            } 
        catch (error) {
                console.log(error)
                res.sendStatus(500)
            }
        }
)

//Start web server on desinated PORT
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))