import { GetterTree } from "vuex";
import { State } from "./state";

export enum Getters {
  CartItems = "cart_items",
}

const getters: GetterTree<State, any> = {
  [Getters.CartItems]: (state) => state.cart,
};

export default getters;
