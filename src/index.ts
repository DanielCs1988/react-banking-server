import { connect } from "mongoose";
import "reflect-metadata";
import app from "./shared/server";

const port = process.env.PORT || 8080;

connect(process.env.MONGODB_URI!, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log(`Server is running on port ${port}...`));
    })
    .catch((error) => {
        console.log(`Could not connect to MongoDB.\nReason: ${error.stack}`);
        process.exit(1);
    });