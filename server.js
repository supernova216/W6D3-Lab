const express = require('express')
const cors = require('cors')
const app = express()   

app.use(express.static(`${__dirname}/public`))
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '31c34202fc114feaa3c66ba66e60b654',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const students = ['Jimmy', 'Timothy', 'Jimothy']

// app.get('/api/students',(req,res)=>{
// try{
//   nonexistentFunction()
//   }
//   catch (err) {
//     rollbar.error(err) 
//   }
// })

app.get('/api/students', (req, res) => {
  res.status(200).send(students)
})



// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



app.listen(4001,
   () => console.log(`server running on 4001`))