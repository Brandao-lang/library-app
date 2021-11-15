const path = require("path")
const express = require('express')
const controller = require('./routes/controller.tsx')

//Configurations
const app = express()
app.use(express.json())



app.get('/fetchResults', controller.fetchResults)
app.get('/getLibrary', controller.getLibrary)
app.get('/login', controller.login)
app.post('/signup', controller.signup)
app.put('/updateLibrary', controller.updateLibrary)
app.put('/bookStatus', controller.bookStatus)
app.delete('/removeBook', controller.removeBook)


app.use(express.static('client/build'));
app.get('*', function (req, res) {
    const index = path.join(__dirname, 'client', 'build', 'index.html');
    res.sendFile(index);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
