var {MongoClient}  = require('mongodb')
var url =  `mongodb+srv://dbAdmin:${process.env.APP_PASS}@book-cluster.96icq.mongodb.net/BOOK-CLUSTER?retryWrites=true&w=majority`
var client = new MongoClient(url)
var db = client.db('BOOK_CLUSTER')
var ObjectId = require('mongodb').ObjectId;

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
}