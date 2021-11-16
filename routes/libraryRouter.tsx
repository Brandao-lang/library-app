var { MongoClient } = require('mongodb')
var url =  process.env.DB_STRING
var client = new MongoClient(url)
var db = client.db('BOOK_CLUSTER')
var ObjectId = require('mongodb').ObjectId;

module.exports = {
    getLibrary: async(request, response) => {
        const id = request.query.userID
    
        try {
            await client.connect()
            const userCol = db.collection('users')
    
            const library = await userCol.findOne({
                _id: ObjectId(`${id}`)
            })
            
            response.status(200).send(library.all_books)
    
        } catch (err) {
            console.log(`get library API failed: ${err}`)
    
        } finally {
            await client.close()
    
        }
    },
    
    updateLibrary: async(request, response) => {
        const { title, author, pages, image, bookID, userID } = request.body
        
        try {
           await client.connect()
           const userCol = db.collection('users')
            
            const addToLibrary = await userCol.updateOne (
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
            await client.close()
    
        }
    },
    
    removeBook: async(request, response) => {
        const index = request.query.topIndex
        const id = request.query.userID
    
        try {
            await client.connect()
            const userCol = db.collection('users')
    
            const library = await userCol.findOne({
                _id: ObjectId(`${id}`)
            })
            
            const newArr = [...library.all_books]
            newArr.splice(index, 1)
    
            const updateLibrary = await userCol.updateOne (
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
            await client.close()
    
        }
        
    },

    bookStatus: async(request, response) => {
        const { status, rating, userID, topIndex } = request.body
    
        try {
            await client.connect()
            const userCol = db.collection('users')

            await userCol.updateOne(
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
            await client.close()
        
        }

        response.status(200).send('ok')
    }
}