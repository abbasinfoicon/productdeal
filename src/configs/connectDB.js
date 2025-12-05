import mongoose from "mongoose";

const ConnectDB = async() => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            return;
        }

        // Check if connection is in progress
        if (mongoose.connection.readyState === 2) {
            // Wait for connection to complete
            await new Promise((resolve) => {
                mongoose.connection.once("connected", resolve);
            });
            return;
        }

        // const DB_OPTIONS = {
        //     dbName: "product",
        // };

        await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Connection Successful on ${process.env.DATABASE_URL}`);
    } catch (error) {
        console.warn("Database Connection Failed...!!!", error);
        throw error;
    }
};

export default ConnectDB;