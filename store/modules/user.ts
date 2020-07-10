import { ActionTree, ActionContext, MutationTree, GetterTree } from "vuex";

interface State {
  email: string | null;
  displayName: string | null;
  password: string | null;
}

const state: State = {
  email: '',
  displayName: '',
  password: 'admin',
};

const getters: GetterTree<State, any> = {
  displayName: ({ displayName }) => displayName,
  email: ({ email }) => email
};

interface Actions<S, R> extends ActionTree<S, R> {
  signIn: (context: ActionContext<S, R>, data: { email: string; password: string }) => void;
  changeDisplayName: (context: ActionContext<S, R>, name: string ) => void;
  changeEmail: (context: ActionContext<S, R>, email: string ) => void;
  changePassword: (context: ActionContext<S, R>, data: { currentPass: string; newPass: string }) => void;
};

const actions: Actions<State, any> = {
  signIn({ dispatch, commit, getters, rootGetters }, data) {
    // Todo
    commit("setEmail", data.email);
  },
  changeDisplayName({ commit }, name) {
    commit("setDisplayName", name);
  },
  changeEmail({ commit }, email) {
    commit("setEmail", email);
  },
  changePassword({ commit, state }, data) {
    if(state.password == data.currentPass) {
      commit("setPassword", data.newPass);
    }
  } 
}

const mutations: MutationTree<State> = {
  setDisplayName(state, data: string) {
    state.displayName = data;
  },
  setEmail(state, data: string) {
    state.email = data;
  },
  setPassword(state, data: string) {
    state.password = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
