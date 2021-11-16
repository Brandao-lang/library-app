var { MongoClient } = require('mongodb')
var bcrypt = require('bcryptjs')
var url =  process.env.DB_STRING
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

            let userDocument = {
                "name" : `${username}`,
                "email" : `${email}`,
                "password" : `${hashed}`,
                "all_books": []
            }
            
            await userCol.insertOne(userDocument)
            
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
    }
}