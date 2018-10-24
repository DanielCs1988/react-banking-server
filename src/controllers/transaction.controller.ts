import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost,
    requestBody,
    requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import { TransactionService } from "../services/transaction.service";
import { ITransaction } from "../shared/models";

@controller('/transactions')
export class TransactionController extends BaseHttpController {

    constructor(@inject('TransactionService') private transactionService: TransactionService) {
        super();
    }

    @httpGet('/')
    private async getTransactions() {
        try {
            return await this.transactionService.getAllTransactions();
        } catch (error) {
            return this.badRequest('Database error!');
        }
    }

    @httpGet('/:id')
    private async getTransactionById(@requestParam('id') id: string) {
        try {
            const transaction = await this.transactionService.getTransactionById(id);
            return transaction ? transaction : this.notFound();
        } catch (error) {
            return this.badRequest('Database error!');
        }
    }

    @httpPost('/')
    private async createTransaction(@requestBody() transaction: ITransaction) {
        try {
            return await this.transactionService.createTransaction(transaction);
        } catch (error) {
            return this.badRequest(error.name === 'ValidationError' ? error.message : 'Database error!');
        }
    }
}