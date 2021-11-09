import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { Actions as AuthActions, Getters as AuthGetters } from "@/store/auth";

@Component({})
export default class NavbarComponent extends Vue {
  @Getter(AuthGetters.IS_LOGGED_IN)
  private readonly IS_LOGGED_IN;

  @Action(AuthActions.SIGN_OUT)
  private signOut;

  data() {
    return {
      navItems: [
        { name: "Login", to: "/login", icon: "lock" },
        { name: "Register", to: "/register", icon: "key" },
      ],
    };
  }

  mounted() {
    if (!this.IS_LOGGED_IN) {
      this.$router.push({ name: "Login" });
    }
  }

  private logout() {
    this.signOut().then(() => {
      this.$router.push({
        name: "Login",
      });
    });
  }
}
