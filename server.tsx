const { default: axios } = require('axios')
const express = require('express')
const path = require("path")

const app = express()
const port = 5000

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'client/build/index.html'))
// })



//This endpoint is run when a book search is entered
app.get('/fetchResults', async(request, response) => {
    const title = request.query.title
    const author = request.query.author
    const apiArr = []

     await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&filter=ebooks&maxResults=40&key=${process.env.APIKEY}`
     ).then(res => {
        const responseLength = res.data.items.length
        
        for (let i = 0; i < responseLength; i++) {
            const bookName = res.data.items[i].volumeInfo.title
            const bookAuthor = res.data.items[i].volumeInfo.authors
            const bookDescription = res.data.items[i].volumeInfo.description
            const bookPageCount = res.data.items[i].volumeInfo.pageCount
            const bookPublisher = res.data.items[i].volumeInfo.publisher
            const bookRating = res.data.items[i].volumeInfo.averageRating
            const bookImg = res.data.items[i].volumeInfo.imageLinks.smallThumbnail 
            const bookPublished = res.data.items[i].volumeInfo.publishedDate

            apiArr.push({
                bookTitle: bookName, 
                author: bookAuthor,
                description: bookDescription,
                pageCount: bookPageCount,
                publisher: bookPublisher, 
                averageRating: bookRating,
                imageLinks: bookImg,
                publishedDate: bookPublished
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
