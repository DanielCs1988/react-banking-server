import { injectable } from "inversify";
import { IPartner } from "../shared/models";
import { PartnerModel, PartnerRepository } from "../repository/partner.repository";
import { Model } from "mongoose";
import { pick } from 'lodash';

@injectable()
export class PartnerService {
    private readonly partnerRepository: Model<PartnerModel>;

    constructor(partnerRepository: PartnerRepository) {
        this.partnerRepository = partnerRepository.Model;
    }

    readonly getAllPartners = () => {
        return this.partnerRepository.find({});
    };

    readonly getPartnerById = (id: string) => {
        return this.partnerRepository.findById(id);
    };

    readonly createPartner = (partner: IPartner) => {
        const partnerFields = pick(partner, ['account', 'name']);
        const newPartner = new this.partnerRepository({
            ...partnerFields
        });
        return newPartner.save();
    };
}