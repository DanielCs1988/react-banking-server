import {inject, injectable} from "inversify";
import {PartnerService} from "../services/partner.service";
import * as Router from "koa-router";

@injectable()
export class PartnerController {
    readonly router: Router;

    constructor(@inject('PartnerService') private partnerService: PartnerService) {
        this.router = this.setupRouter();
    }

    private setupRouter = () => {
        const router = new Router({ prefix: '/partners' });
        router.get('/', this.getPartners);
        router.get('/:id', this.getPartnerById);
        router.post('/', this.createPartner);
        return router;
    };

    private getPartners = async ctx => {
        try {
            ctx.body = await this.partnerService.getAllPartners();
        } catch (error) {
            ctx.throw(400, 'Database error!');
        }
    };

    private  getPartnerById = async ctx => {
        try {
            const id = ctx.params.id;
            const partner = await this.partnerService.getPartnerById(id);
            if (partner) {
                ctx.body = partner;
            } else {
                ctx.throw(404, 'Partner not found!');
            }
        } catch (error) {
            ctx.throw(400, 'Database error!');
        }
    };

    private createPartner = async ctx => {
        try {
            const partner = ctx.request.body;
            ctx.body = await this.partnerService.createPartner(partner);
        } catch (error) {
            ctx.throw(400, error.name === 'ValidationError' ? error.message : 'Database error!');
        }
    };
}