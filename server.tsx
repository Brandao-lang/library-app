// const path = require("path")
const express = require('express')
const controller = require('./routes/controller.tsx')

//Configurations
const port = 5000
const app = express()
app.use(express.json())

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'client/build/index.html'))
// })

app.get('/fetchResults', controller.fetchResults)
app.get('/getLibrary', controller.getLibrary)
app.get('/login', controller.login)
app.post('/signup', controller.signup)
app.put('/updateLibrary', controller.updateLibrary)
app.put('/bookStatus', controller.bookStatus)
app.delete('/removeBook', controller.removeBook)


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
