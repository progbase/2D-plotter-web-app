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

// const baseURL = 'http://localhost:3001';
const baseURL = '';

export default new PlotterApi(baseURL);
