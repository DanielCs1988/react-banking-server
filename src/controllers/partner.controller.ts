import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost,
    requestBody,
    requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import { PartnerService } from "../services/partner.service";
import { IPartner } from "../shared/models";

@controller('/partners')
export class PartnerController extends BaseHttpController {

    constructor(@inject('PartnerService') private partnerService: PartnerService) {
        super();
    }

    @httpGet('/')
    private async getPartners() {
        try {
            return await this.partnerService.getAllPartners();
        } catch (error) {
            return this.badRequest('Database error!');
        }
    }

    @httpGet('/:id')
    private async getPartnerById(@requestParam('id') id: string) {
        try {
            const partner = await this.partnerService.getPartnerById(id);
            return partner ? partner : this.notFound();
        } catch (error) {
            return this.badRequest('Database error!');
        }
    }

    @httpPost('/')
    private async createPartner(@requestBody() partner: IPartner) {
        try {
            return await this.partnerService.createPartner(partner);
        } catch (error) {
            return this.badRequest(error.name === 'ValidationError' ? error.message : 'Database error!');
        }
    }
}