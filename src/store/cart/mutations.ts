import { MutationTree } from "vuex";
import { Item, State } from "./state";

export enum Mutations {
  ADD_TO_CART = "add_to_cart",
  RESET_CART = "reset_cart",
}

const resetCart = (state: State) => {
  state.cart = [];
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
};

export default mutations;
