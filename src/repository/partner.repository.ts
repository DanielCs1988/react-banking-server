import { Document, model, Schema } from 'mongoose';
import { injectable } from "inversify";
import { IPartner } from "../shared/models";

export interface PartnerModel extends Document, IPartner { }

@injectable()
export class PartnerRepository {
    private readonly PartnerSchema = new Schema({
        name: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        account: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        }
    });

    private readonly model = model<PartnerModel>('Partner', this.PartnerSchema);

    constructor() {
        this.PartnerSchema.set('toJSON', {
            virtuals: true,
            versionKey: false,
            transform(_, ret) { delete ret._id; }
        });
    }

    get Model() {
        return this.model;
    }
}