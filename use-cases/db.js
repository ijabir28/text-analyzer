const { MongoClient } = require("mongodb");

function createDBService() {
    const client = new MongoClient(process.env.MONGO_URI);
    const database = client.db('text-analyzer');

    const users = database.collection('users');
    const userTokens = database.collection('userTokens');

    function getUserByEmail(email) {
        return users.findOne({ email });
    }

    function createUserToken({ userId, userToken }) {
        return userTokens.updateOne({ _id: userId }, { $set: { userToken } }, { upsert: true });
    }

    function getUserByToken(userToken) {
        return userTokens.findOne({ userToken });
    }

    return {
        getUserByEmail,
        createUserToken,
        getUserByToken,
    }
}

module.exports = {
    createDBService
};