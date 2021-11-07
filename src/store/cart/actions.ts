import { ActionTree } from "vuex";
import firebase from "firebase/compat/app";
// import { Mutations } from "./mutations";
import { State } from "./state";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export enum Actions {
  ADD_TO_CART = "add_to_cart",
  UPDATE_CART = "update_cart",
  CHECKOUT = "checkout",
}

function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const actions: ActionTree<State, any> = {
  [Actions.CHECKOUT](context, { uid, data }) {
    return firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(data, { merge: true });
  },
};

export default actions;
