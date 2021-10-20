const { default: axios } = require('axios')
const express = require('express')
const path = require("path")

const app = express()
const port = 5000

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'client/build/index.html'))
// })



//This endpoint is run when a book search is entered, generates and returns an array of books retrieved from the API
app.get('/fetchResults', async(request, response) => {
    const title = request.query.title
    const author = request.query.author
    const apiArr = []

     await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&filter=ebooks&maxResults=40&key=${process.env.REACT_APP_APIKEY}`
     ).then(res => {
        const responseLength = res.data.items.length
        
        for (let i = 0; i < responseLength; i++) {
            apiArr.push({
                bookTitle: res.data.items[i].volumeInfo.title, 
                author:  res.data.items[i].volumeInfo.authors,
                description: res.data.items[i].volumeInfo.description,
                pageCount: res.data.items[i].volumeInfo.pageCount,
                publisher: res.data.items[i].volumeInfo.publisher, 
                averageRating: res.data.items[i].volumeInfo.averageRating,
                imageLinks: res.data.items[i].volumeInfo.imageLinks.smallThumbnail,
                publishedDate: res.data.items[i].volumeInfo.publishedDate
            })
        }

        response.status(200).send(apiArr)
    }).catch(err => {
        console.log(`GOOGLE API FAIL: ${err}`)
    })
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
