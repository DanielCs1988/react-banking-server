import * as Koa from "koa";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import { handleErrors } from "../middleware/error-handler";
import container from "./container";
import { PartnerController } from "../controllers/partner.controller";
import { TransactionController } from "../controllers/transaction.controller";

const app = new Koa();

const partnerRouter = container.get<PartnerController>('PartnerController').router;
const transactionRouter = container.get<TransactionController>('TransactionController').router;

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(partnerRouter.routes());
app.use(partnerRouter.allowedMethods());
app.use(transactionRouter.routes());
app.use(transactionRouter.allowedMethods());
app.use(handleErrors);

export default app;