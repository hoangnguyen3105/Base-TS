import BaseWalletService from './BaseWalletService';

let instance: any;

export default class MetamaskService extends BaseWalletService {
  constructor(props?: any) {
    super(props);
  }

  getInstance = () => {
    if (instance == null) {
      instance = new MetamaskService();
      instance.constructor = null;
    }
    return instance;
  };

  removeInstance = () => {
    instance = null;
  };
}
