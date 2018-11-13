import * as Koa from "koa";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import { handleErrors } from "../middleware/error-handler";
import { PartnerController } from "../controllers/partner.controller";
import { TransactionController } from "../controllers/transaction.controller";
import {Container} from "inversify";

const container = new Container({
    defaultScope: "Singleton",
    autoBindInjectable: true
});

const app = new Koa();

const partnerRouter = container.get(PartnerController).router;
const transactionRouter = container.get(TransactionController).router;

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(partnerRouter.routes());
app.use(partnerRouter.allowedMethods());
app.use(transactionRouter.routes());
app.use(transactionRouter.allowedMethods());
app.use(handleErrors);

export default app;