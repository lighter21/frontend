import { ApiService } from "@/api/api.service";
import {
  CHECK_AUTH,
  PURGE_AUTH,
  PURGE_ERRORS,
  SET_AUTH,
  SET_ERRORS,
  SET_LOADING,
} from "@/store/mutations.type";
import { LOGIN, LOGOUT, REGISTER } from "@/store/actions.type";

const state = {
  error: null,
  loading: false,
  isAuthenticated: false,
  user: {},
};
const actions = {
  async [REGISTER](context, credentials) {
    context.commit(PURGE_ERRORS);
    context.commit(SET_LOADING, true);

    await ApiService.post("auth/register", credentials)
      .then((response) => context.commit(SET_AUTH, response.data.user))
      .catch((response) => {
        context.commit(PURGE_AUTH);
        context.commit(SET_ERRORS, response.data.errors);
      });
    context.commit(SET_LOADING, false);
  },

  async [LOGIN](context, credentials) {
    context.commit(SET_LOADING, true);
    await ApiService.get("auth/sanctum/csrf-cookie").catch(() => {
      context.commit(SET_ERRORS, "Nie uzyskano autoryzacji");
    });

    await ApiService.post("auth/login", credentials)
      .then(({ data }) => {
        context.commit(SET_AUTH, data);
        context.commit(SET_LOADING, false);
      })
      .catch(({ response }) => {
        context.commit(SET_ERRORS, response.data.errors);
        context.commit(SET_LOADING, false);
      });
  },

  async [LOGOUT](context) {
    context.commit(SET_LOADING, true);
    await ApiService.post("auth/logout")
      .then(() => {
        context.commit(PURGE_AUTH);
      })
      .catch((response) => {
        context.commit(SET_ERRORS, response.data.errors);
      });
  },
  async [CHECK_AUTH](context) {
    await ApiService.get("auth/user")
      .then(({ data }) => {
        context.commit(SET_AUTH, data);
      })
      .catch(() => {
        context.commit(PURGE_AUTH);
      });
  },
};
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_ERRORS](state, error) {
    state.error = error;
  },
  [PURGE_ERRORS](state) {
    state.error = null;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
  },

  [PURGE_AUTH](state) {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = {};
  },
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
