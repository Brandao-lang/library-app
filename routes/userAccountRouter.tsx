const bcrypt = require('bcryptjs')
var {MongoClient}  = require('mongodb')
var url =  `mongodb+srv://dbAdmin:${process.env.APP_PASS}@book-cluster.96icq.mongodb.net/BOOK-CLUSTER?retryWrites=true&w=majority`
var client = new MongoClient(url)
var db = client.db('BOOK_CLUSTER')
var ObjectId = require('mongodb').ObjectId;


module.exports = {
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
                "_id": userID._id,
                "all_books" : [],
            }
    
            await libraryCol.insertOne(libraryDocument)
        
        } catch (err) {
            console.log(`user signup api failed: ${err}`)
        
        } finally {
            await client.close()

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
            await client.close()
        }
    },
}