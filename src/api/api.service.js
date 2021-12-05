import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export const ApiService = {
  init() {
    // TODO: Przenieść adresy na bazowe api serwisy
    axios.defaults.baseURL = "http://api.stuck.loc/";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
    };

    Vue.use(VueAxios, axios);
  },
  get(endpoint) {
    return Vue.axios.get(endpoint).catch((error) => {
      throw new Error(error);
    });
  },
  post(endpoint, payload) {
    return Vue.axios.post(endpoint, payload);
  },
};
