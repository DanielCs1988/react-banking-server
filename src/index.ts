import { json } from "body-parser";
import * as cors from 'cors';
import { connect } from "mongoose";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/transaction.controller";
import "./controllers/partner.controller";
import {handleErrors} from "./middleware/error-handler";
import container from "./shared/container";

const port = process.env.PORT || 8080;

const server = new InversifyExpressServer(container);

server.setConfig(app => {
    app.use(cors());
    app.use(json());
    app.use(handleErrors);
});

const app = server.build();

connect(process.env.MONGODB_URI!, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log(`Server is running on port ${port}...`));
    })
    .catch((error) => {
        console.log(`Could not connect to MongoDB.\nReason: ${error.stack}`);
        process.exit(1);
    });