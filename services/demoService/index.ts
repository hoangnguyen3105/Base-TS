import { api } from '../api';

class DemoService {
  private DEMO_DATA_URL = 'posts';

  get demoDataUrl() {
    return this.DEMO_DATA_URL;
  }

  constructor() {}

  //Get List Demo Api
  getListDemoApi = (args: any) => {
    return {
      url: this.demoDataUrl,
      args,
      fetcher: api.get,
    };
  };

  updateListDemoApi = (args: any) => {
    return api.post(this.demoDataUrl, args);
  };
}

export default DemoService;
