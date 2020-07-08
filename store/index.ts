import Vuex, { ActionTree, ActionContext, MutationTree, GetterTree } from "vuex";
import user from "./modules/user";

interface State {
  showLoader: boolean;
}

const state: State = {
  showLoader: false,
}

const getters: GetterTree<State, any> = {
  showLoader: ({ showLoader }) => showLoader,
}

interface Actions<S, R> extends ActionTree<S, R> {
  setShowLoader: (context: ActionContext<S, R>, show: boolean) => void;
}

const actions: Actions<State, any> = {
  setShowLoader({ commit }, show) {
    commit("SET_SHOW_LOADER", show);
  },
}

const mutations: MutationTree<State> = {
  SET_SHOW_LOADER(state, show: boolean) {
    state.showLoader = show;
  },
}

const store = () => new Vuex.Store({
  strict: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    user,
  },
});

export default store;
