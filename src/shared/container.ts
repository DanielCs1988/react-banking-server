import {Container} from "inversify";
import {TransactionRepository} from "../repository/transaction.repository";
import {PartnerRepository} from "../repository/partner.repository";
import {TransactionService} from "../services/transaction.service";
import {PartnerService} from "../services/partner.service";
import {PartnerController} from "../controllers/partner.controller";
import {TransactionController} from "../controllers/transaction.controller";

const container = new Container();

container.bind<TransactionRepository>('TransactionRepository').to(TransactionRepository).inSingletonScope();
container.bind<PartnerRepository>('PartnerRepository').to(PartnerRepository).inSingletonScope();

container.bind<TransactionService>('TransactionService').to(TransactionService).inSingletonScope();
container.bind<PartnerService>('PartnerService').to(PartnerService).inSingletonScope();

container.bind<PartnerController>('PartnerController').to(PartnerController).inSingletonScope();
container.bind<TransactionController>('TransactionController').to(TransactionController).inSingletonScope();

export default container;