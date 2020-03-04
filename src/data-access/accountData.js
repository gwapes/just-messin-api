const { MongoClient, ObjectID } = require('mongodb')

const saveUsers = async (user) => {
    const client = new MongoClient(`${process.env.ACCOUNT_DB_URL}`, { useUnifiedTopology: true })
    try{
        await client.connect()
        var result = await client.db('account').collection('users').insertOne(user)
    }
    catch(ex) {
        console.error(ex)
        throw 'There was a problem connecting to MongoDB.'
    }
    finally {
        await client.close()
    }

    return result.ops[0]
}

module.exports = { saveUsers }