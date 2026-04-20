
import admin from "firebase-admin" 
import { createRequire } from "module";
const require = createRequire(import.meta.url);


let isConnected = false
let serviceAccountKey;

export const connectToDb = async () => {
    if(isConnected) {
        console.log("Database is already connected")
        return;
    }

    try {
        if(process.env.NODE_ENV === "production") {
            serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        } else {
            serviceAccountKey = require("../../serviceAccountkey.json");
        }
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountKey)
        })

        isConnected = true
        console.log("Database connected successfully")
    } catch (err) {
        console.error("Error connecting to database", err.message)
    }
}

export const db = () => admin.firestore();