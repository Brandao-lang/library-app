const axios = require('axios')

module.exports = {
   fetchResults: async(request, response) => {
        const title = request.query.title
        let author = request.query.author
        const apiArr = []

        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&filter=ebooks&maxResults=40&key=${process.env.APIKEY}`
        ).then(res => {
            if(!res.data) {
                response.status(400).send('no results')
            }
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
                    publishedDate: res.data.items[i].volumeInfo.publishedDate,
                    id: res.data.items[i].id
                })
            }
    
            response.status(200).send(apiArr)
        
        }).catch(err => {
            console.log(`GOOGLE API FAIL: ${err}`)
            response.status(400).send('no results')
        })
    }
}