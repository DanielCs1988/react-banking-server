import { Document, model, Schema } from 'mongoose';
import { injectable } from "inversify";
import { ITransaction } from "../shared/models";

export interface TransactionModel extends Document, ITransaction { }

@injectable()
export class TransactionRepository {
    private readonly TransactionSchema = new Schema({
        amount: {
            type: Number,
            required: true
        },
        recipientName: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        recipientAccount: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        ccy: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        date: {
            type: Number,
            required: true
        },
        timing: {
            type: Number,
            required: false
        }
    });

    private readonly model = model<TransactionModel>('Transaction', this.TransactionSchema);

    constructor() {
        this.TransactionSchema.set('toJSON', {
            virtuals: true,
            versionKey: false,
            transform(_, ret) { delete ret._id; }
        });
    }

    get Model() {
        return this.model;
    }
}