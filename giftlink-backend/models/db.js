// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    // Return existing database instance if already connected
    if (dbInstance) {
        return dbInstance;
    }

    try {
        // Create MongoDB client
        const client = new MongoClient(url);

        // Task 1: Connect to MongoDB
        await client.connect();

        console.log("Connected to MongoDB");

        // Task 2: Connect to database giftDB and store in variable dbInstance
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;

    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

module.exports = connectToDatabase;