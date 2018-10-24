import {inject, injectable} from "inversify";
import { TransactionService } from "../services/transaction.service";
import * as Router from "koa-router";

@injectable()
export class TransactionController {
    readonly router: Router;

    constructor(@inject('TransactionService') private transactionService: TransactionService) {
        this.router = this.setupRouter();
    }

    private setupRouter = () => {
        const router = new Router({ prefix: '/transactions' });
        router.get('/', this.getTransactions);
        router.get('/:id', this.getTransactionById);
        router.post('/', this.createTransaction);
        return router;
    };

    private getTransactions = async ctx => {
        try {
            ctx.body = await this.transactionService.getAllTransactions();
        } catch (error) {
            ctx.throw(400, 'Database error!');
        }
    };

    private getTransactionById = async ctx => {
        try {
            const id = ctx.params.id;
            const transaction = await this.transactionService.getTransactionById(id);
            if (transaction) {
                ctx.body = transaction;
            } else {
                ctx.throw(404, 'Transaction not found!');
            }
        } catch (error) {
            ctx.throw(400, 'Database error!');
        }
    };

    private createTransaction = async ctx => {
        try {
            const transaction = ctx.request.body;
            ctx.body = await this.transactionService.createTransaction(transaction);
        } catch (error) {
            ctx.throw(400, error.name === 'ValidationError' ? error.message : 'Database error!');
        }
    };
}