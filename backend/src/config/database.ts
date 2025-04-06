import mongoose from "mongoose";

const connectDatabase = (uri: string) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(uri)
        .then(() => console.log("Connected to mongodb database."))
        .catch((error) => console.log(`{Error connecting to database: ${error}}`));
}

export { connectDatabase };