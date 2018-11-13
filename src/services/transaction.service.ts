import { injectable } from "inversify";
import { ITransaction } from "../shared/models";
import { TransactionModel, TransactionRepository } from "../repository/transaction.repository";
import { Model } from "mongoose";
import { pick } from 'lodash';

@injectable()
export class TransactionService {
    private readonly transactionRepository: Model<TransactionModel>;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository.Model;
    }

    readonly getAllTransactions = () => {
        return this.transactionRepository.find({});
    };

    readonly getTransactionById = (id: string) => {
        return this.transactionRepository.findById(id);
    };

    readonly createTransaction = (transaction: ITransaction) => {
        const transactionFields = pick(transaction, [
            'amount', 'recipientName', 'recipientAccount', 'ccy', 'timing'
        ]);
        const newTransaction = new this.transactionRepository({
            ...transactionFields,
            date: new Date().getTime()
        });
        return newTransaction.save();
    };
}