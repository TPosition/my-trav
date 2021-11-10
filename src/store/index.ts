import Vue from "vue";
import Vuex from "vuex";
import { State as AuthState } from "./auth/state";
import auth from "./auth";
import cart from "./cart";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export interface RootState {
  auth: AuthState;
}

export default new Vuex.Store({
  modules: {
    auth,
    cart,
  },
  plugins: [createPersistedState()],
});
