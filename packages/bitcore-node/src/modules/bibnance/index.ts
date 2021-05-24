import { BaseModule } from '..';
import { BnbRoutes } from './api/bnb-routes';
import { BNBStateProvider } from './api/csp';
import { BnbVerificationPeer } from './p2p/BnbVerificationPeer';
import { BnbP2pWorker } from './p2p/p2p';

export default class ETHModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.P2P.register('BNB', BnbP2pWorker);
    services.CSP.registerService('BNB', new BNBStateProvider());
    services.Api.app.use(BnbRoutes);
    services.Verification.register('BNB', BnbVerificationPeer);
  }
}
