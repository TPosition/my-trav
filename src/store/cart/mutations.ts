import { MutationTree } from "vuex";
import { Item, State } from "./state";

export enum Mutations {
  ADD_TO_CART = "add_to_cart",
  RESET_CART = "reset_cart",
  UPDATE_HISTORY = "update_history",
}

const resetCart = (state: State) => {
  state.cart = [];
};

const resetHistory = (state: State) => {
  state.history = [
    {
      items: {},
      timestamp: "",
    },
  ];
};

const mutations: MutationTree<State> = {
  [Mutations.ADD_TO_CART](state: State, mutation) {
    const item = {
      title: mutation.title,
      content: mutation.content,
      price: mutation.price,
      src: mutation.src,
    } as Item;
    state.cart.push(item);
  },
  [Mutations.RESET_CART](state: State) {
    resetCart(state);
  },
  [Mutations.UPDATE_HISTORY](state: State, mutation) {
    console.log(mutation.cart);
    resetHistory(state);
    if (mutation.cart) {
      for (const key in mutation.cart) {
        state.history.push({
          timestamp: mutation.cart[key].timestamp,
          items: { ...mutation.cart[key].items },
        });
      }
      console.log(state);
    }
  },
};

export default mutations;
