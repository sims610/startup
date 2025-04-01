const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const favoriteCollection = db.collection('favorite');
const likeCollection = db.collection('like');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addLike(like) {
    return likeCollection.insertOne(like);
}

async function addFavorite(favorite) {
    return favoriteCollection.insertOne(favorite);
}

async function getFavorites(user) {
    const query = { favorite: { userName: user} };
    const cursor = favoriteCollection.find(query);
    return cursor.toArray();
}

async function getLikes(){
    return likeCollection.find();
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addLike,
    addFavorite,
    getFavorites,
    getLikes,
};