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
    resetHistory(state);

    if (mutation.cart) {
      const ordered = Object.keys(mutation.cart)
        .sort()
        .reverse()
        .reduce((obj, key) => {
          obj[key] = mutation.cart[key];
          return obj;
        }, {});

      for (const key in ordered) {
        state.history.push({
          timestamp: ordered[key].timestamp,
          items: { ...ordered[key].items },
        });
      }
    }
  },
};

export default mutations;
