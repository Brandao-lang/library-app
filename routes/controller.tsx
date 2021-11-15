const { MongoClient } = require('mongodb')
const axios = require('axios')
var bcrypt = require('bcryptjs')

const url =  process.env.DB_STRING
const client = new MongoClient(url)
const db = client.db('BOOK_CLUSTER')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getLibrary: async(request, response) => {
        const id = request.query.userID
    
        try {
            await client.connect()
            const libraryCol = db.collection('library')
    
            const library = await libraryCol.findOne({
                _id: ObjectId(`${id}`)
            })
            
            response.status(200).send(library)
    
        } catch (err) {
            console.log(`get library API failed: ${err}`)
    
        } finally {
            client.close()
    
        }
    },
    
    updateLibrary: async(request, response) => {
        const { title, author, pages, image, bookID, userID } = request.body
        
        try {
           await client.connect()
           const libraryCol = db.collection('library')
            
            const addToLibrary = await libraryCol.updateOne (
                {_id: ObjectId(`${userID}`)},
                {
                    $addToSet: {
                        all_books: {
                            title,
                            author,
                            pages,
                            image,
                            status: 'Not Started',
                            rating: 0,
                            bookID
                        }
                    }
                }
            )
    
            response.status(200).send('book added to library successfully')
            
        } catch (err) {
            console.log(`update library api failed: ${err}`)
    
        } finally {
            client.close()
    
        }
    },
    
    removeBook: async(request, response) => {
        const index = request.query.topIndex
        const id = request.query.userID
    
        try {
            await client.connect()
            const libraryCol = db.collection('library')
    
            const library = await libraryCol.findOne({
                _id: ObjectId(`${id}`)
            })
            
            const newArr = [...library.all_books]
            newArr.splice(index, 1)
    
            const updateLibrary = await libraryCol.updateOne (
                {_id: ObjectId(`${id}`)},
                {
                    $set: {
                        all_books: newArr
                    }
                }
            )
                
            response.status(200).send('book successfully deleted')
    
        } catch (err) {
            console.log(`remove book API failed: ${err}`)
    
        } finally {
            client.close()
    
        }
        
    },

    bookStatus: async(request, response) => {
        const { status, rating, userID, topIndex } = request.body
    
        try {
            await client.connect()
            const libraryCol = db.collection('library')

            await libraryCol.updateOne(
                {_id: ObjectId(`${userID}`)},
                
                {
                    $set: {
                        [`all_books.${topIndex}.status`] : status,
                        [`all_books.${topIndex}.rating`] : rating
                    }
                }
            )
            
        } catch (err) {
            console.log(`book status api failed : ${err}`)

        } finally {
            client.close()
        
        }

        response.status(200).send('ok')
    },

    //Signup/Login endpoints
    signup: async(request, response) => {
        const { username, email, password } = request.body
        
        const hashed = bcrypt.hashSync(password, 10)

        try {
            await client.connect()
            const userCol = db.collection('users')
            const libraryCol = db.collection('library')

            let userDocument = {
                "name" : `${username}`,
                "email" : `${email}`,
                "password" : `${hashed}`
            }
            await userCol.insertOne(userDocument)

            const userID = await userCol.findOne({email})

            let libraryDocument = {
                "id": userID._id,
                "all_books" : []
            }
    
            await libraryCol.insertOne(libraryDocument)
        
        } catch (err) {
            console.log(`user signup api failed: ${err}`)
        
        } finally {
            client.close()

        }
    
        response.status(200).send('user added to db')
    },

    login: async(request, response) => {
        const email = request.query.email
        const password = request.query.password
    
        try {
            await client.connect()
            const userCol = db.collection('users')
    
            const user = await userCol.findOne({
                email
            })

            const verify = bcrypt.compareSync(password, user.password)
            if (!verify) {
                return response.status(400).send('invalid password')
            } else if (!user) {
                return response.status(400).send('user not found')
            }
            
            return response.status(200).send(user)
    
        } catch (err) {
            console.log(`login api failed: ${err}`)
            return response.status(400).send('login failed')
        
        } finally {
            client.close()
        }
    },
    
    //Search Results endpoint
    fetchResults: async(request, response) => {
        const title = request.query.title
        let author = request.query.author
        const apiArr = []

        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&filter=ebooks&maxResults=40&key=${process.env.APP_APIKEY}`
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
