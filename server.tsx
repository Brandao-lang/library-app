const path = require("path")
const express = require('express')
const getDataRouter = require('./routes/getDataRouter.tsx')
const libraryRouter = require('./routes/libraryRouter.tsx')
const userAccountRouter = require('./routes/userAccountRouter.tsx')

//Configurations
const app = express()
app.use(express.json())



app.get('/fetchResults', getDataRouter.fetchResults)
app.get('/getLibrary', libraryRouter.getLibrary)
app.get('/login', userAccountRouter.login)
app.post('/signup', userAccountRouter.signup)
app.put('/updateLibrary', libraryRouter.updateLibrary)
app.put('/bookStatus', libraryRouter.bookStatus)
app.delete('/removeBook', libraryRouter.removeBook)


app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'client/build/index.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
