import { GetterTree } from "vuex";
import { State } from "./state";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export enum Getters {
  CartItems = "cart_items",
  GetHistory = "get_history",
}

const getters: GetterTree<State, any> = {
  [Getters.CartItems]: (state) => state.cart,
  [Getters.GetHistory]: (state) => state.history,
};

export default getters;
