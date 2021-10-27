const { default: axios } = require('axios')
const express = require('express')
const path = require("path")
const { MongoClient } = require('mongodb')

//Configurations
const port = 5000
const app = express()
app.use(express.json())
const url =  `mongodb+srv://dbAdmin:${process.env.REACT_APP_PASS}@book-cluster.96icq.mongodb.net/BOOK-CLUSTER?retryWrites=true&w=majority`
const client = new MongoClient(url)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'client/build/index.html'))
// })

app.post('/signup', async(request, response) => {
    const { username, email, password } = request.body
    
    try {
        await client.connect()
        console.log('connected to database successfully')
        const db = client.db('BOOK_CLUSTER')
        const col = db.collection('users')

        let userDocument = {
            "name" : `${username}`,
            "email" : `${email}`,
            "password" : `${password}`,
            "library": {
                "books": []
            }
        }

        const user = await col.insertOne(userDocument)
        const myDoc = await col.findOne({name: 'Steve'})
        console.log(myDoc)

    } catch (err) {
        console.log(err.stack)
    
    } finally {
        await client.close()
    }

    response.status(200).send('user added to db')
})

app.get('/login', async(request, response) => {
    const email = request.query.email
    const password = request.query.password

    try {
        await client.connect()
        console.log('connected to database successfully')
        const db = client.db('BOOK_CLUSTER')
        const col = db.collection('users')

        const user = await col.findOne({
            email: email,
            password: password
        })

        if (!user) {
            response.status(400).send('user not found')
        }

        console.log(user)
        response.status(200).send(user)

    } catch (err) {
        console.log(`login api failed: ${err}`)
    
    } finally {
        await client.close()
    }
})


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

app.put('/updateLibrary', async(request, response) => {
    
    //everything came undefiend, fix this issue
    const user = request.query.email
    const title = request.query.title
    console.log(title)
    console.log(user)
    
    const book = {
        title: request.query.title,
        author: request.query.author,
        pages: request.query.pages,
        image: request.query.image
    }

    try {
        await client.connect()
        console.log('connected to database successfully')
        const db = client.db('BOOK_CLUSTER')
        const col = db.collection('users')
        
        const addToLibrary = await col.updateOne (
            { email: user },
            {
                $addToSet: { library: {
                    books: book
                } }
            }
        )

        response.status(200).send('book added to library successfully')
        
    } catch (err) {
        console.log(`update library api failed: ${err}`)

    } finally {
        client.close()

    }



})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
