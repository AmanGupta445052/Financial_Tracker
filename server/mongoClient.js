// server/mongoClient.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

let dbInstance = null;

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    dbInstance = client.db(process.env.DB_NAME);
    return dbInstance;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
