import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { Actions as AuthActions, Getters as AuthGetters } from "@/store/auth";

@Component({})
export default class HomeComponent extends Vue {
  @Action(AuthActions.SIGN_OUT)
  private signOut;

  private logout() {
    this.signOut().then(() => {
      this.$router.push({
        name: "Login",
      });
    });
  }
}
