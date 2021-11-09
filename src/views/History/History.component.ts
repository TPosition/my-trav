import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { Getters as AuthGetters } from "@/store/auth";
import { Actions as CartActions, Getters as CartGetters } from "@/store/cart";

@Component({})
export default class HistoryComponent extends Vue {
  @Getter(AuthGetters.USER)
  private readonly user;

  @Action(CartActions.UPDATE_HISTORY)
  private updateHistory;

  @Getter(CartGetters.GetHistory)
  private readonly history;

  mounted() {
    this.updateHistory({ uid: this.user.uid });
  }

  private toDate(timestamp: string) {
    const date = new Date(Number(timestamp));

    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  }
}
