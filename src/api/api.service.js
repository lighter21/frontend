import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { print } from 'graphql';

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

  graphqlUploadQuery(resource, queryBody, queryVariables = {}, file = null) {
    let operations = {
      query: print(queryBody),
      variables: queryVariables,
    };
    let map = {
      0: ["variables.file"],
    };

    let formData = new FormData();
    formData.append("operations", JSON.stringify(operations));
    formData.append("map", JSON.stringify(map));
    formData.append("0", file);
    return Vue.axios
      .post(resource, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};
