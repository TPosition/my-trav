import Vue from "vue";
import Vuex from "vuex";
import { State as AuthState } from "./auth/state";
import auth from "./auth";
import cart from "./cart";

Vue.use(Vuex);

export interface RootState {
  auth: AuthState;
}

export default new Vuex.Store({
  modules: {
    auth,
    cart,
  },
});
