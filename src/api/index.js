import axios from 'axios';

class PlotterApi {
  constructor(url) {
    this.base = url;
  }

  startDS(image) {
    return axios.post(`${this.base}/session/start`, { image });
  }

  endDS() {
    return axios.post(`${this.base}/session/end`);
  }

  connect() {
    return axios.post(`${this.base}/connect`);
  }

  disconnect() {
    return axios.post(`${this.base}/disconnect`);
  }
}

export default new PlotterApi('http://localhost:3001');
