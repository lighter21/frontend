const state = {
  chats: [],
};
const actions = {};
const mutations = {
  pushNewChat(state, user) {
    if (state.chats.length < 3 && state.chats.indexOf(user) === -1)
      state.chats.push(user);
    if (state.chats.length === 3) {
      state.chats.pop();
      state.chats.push(user);
    }
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
