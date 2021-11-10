import { ActionTree } from "vuex";
import firebase from "firebase/compat/app";
import { Mutations } from "./mutations";
import { State } from "./state";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export enum Actions {
  ADD_TO_CART = "add_to_cart",
  UPDATE_CART = "update_cart",
  CHECKOUT = "checkout",
  RESET_CART = "reset_cart",
  UPDATE_HISTORY = "update_history",
}

const actions: ActionTree<State, any> = {
  [Actions.ADD_TO_CART](context, item) {
    return context.commit({
      type: Mutations.ADD_TO_CART,
      title: item.title,
      content: item.content,
      price: item.price,
      src: item.src,
      rating: item.rating,
      vote: item.vote,
      location: item.location,
    });
  },
  [Actions.CHECKOUT](context, { uid, data }) {
    return firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(data, { merge: true })
      .then(() => {
        context.commit({
          type: Mutations.RESET_CART,
        });
      });
  },
  [Actions.RESET_CART](context) {
    return context.commit({
      type: Mutations.RESET_CART,
    });
  },
  [Actions.UPDATE_HISTORY](context, { uid }) {
    return firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        context.commit({
          type: Mutations.UPDATE_HISTORY,
          ...documentSnapshot.data(),
        });
      });
  },
};

export default actions;
