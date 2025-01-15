const { MongoClient, ObjectId } = require("mongodb");

async function createDBService() {

    const client = new MongoClient(process.env.MONGO_URI);
    const database = client.db('text-analyzer');

    const users = database.collection('users');
    const userTokens = database.collection('userTokens');
    const texts = database.collection('texts');

    function getUserByEmail(email) {
        return users.findOne({ email });
    }

    function createUserToken({ userId, userToken }) {
        return userTokens.updateOne({ _id: userId }, { $set: { userToken } }, { upsert: true });
    }

    function getUserByToken(userToken) {
        return userTokens.findOne({ userToken });
    }

    async function storeText(userId, text) {
        const storedText = await texts.insertOne({ userId, text });
        if (!storedText.acknowledged) {
            return {
                error: { code: "STORING_ERROR", message: "Error while storing text" }
            }
        }
        return {
            textId: storedText.insertedId,
        };
    }

    async function getTextByUserId(userId) {
        return texts.find({ userId }).project({ userId: 0 }).toArray();
    }

    async function getTextById(userId, textId) {
        const textDetails = await texts.findOne({ userId, _id: ObjectId.createFromHexString(textId) });

        if(!textDetails) {
            return {
                error: { code: "TEXT_NOT_FOUND", message: "Text not found" }
            }
        }

        return {
            text: textDetails.text
        }

    }

    return {
        getUserByEmail,
        createUserToken,
        getUserByToken,
        storeText,
        getTextByUserId,
        getTextById,
    }
}

module.exports = {
    createDBService
};