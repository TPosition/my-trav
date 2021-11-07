import Vue from "vue";
import Component from "vue-class-component";
import { Actions as AuthActions } from "@/store/auth";
import { Action } from "vuex-class";

@Component({})
export default class RegisterComponent extends Vue {
  private email = "";
  private password = "";
  private passwordRepeat = "";
  private validationErrors: Array<string> = [];

  @Action(AuthActions.SIGN_UP_WITH_EMAIL_AND_PASSWORD)
  private signUpWithEmailAndPassword;

  resetError() {
    this.validationErrors = [];
  }

  validate() {
    this.resetError();
    if (this.email === "") {
      this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
    }
    if (/.+@.+/.test(this.email) !== true) {
      this.validationErrors.push("<strong>E-mail</strong> must be valid.");
    }
    if (!this.password) {
      this.validationErrors.push("<strong>Password</strong> cannot be empty");
    }
    if (/.{6,}/.test(this.password) !== true) {
      this.validationErrors.push(
        "<strong>Password</strong> must be at least 6 characters long"
      );
    }
    if (!(this.password === this.passwordRepeat)) {
      this.validationErrors.push("<strong>Passwords</strong> did not match");
    }
    if (this.validationErrors.length <= 0) {
      this.signUp();
    }
  }

  signUp() {
    this.signUpWithEmailAndPassword({
      email: this.email,
      password: this.password,
    }).then(() => {
      this.$router.push({ name: "Home" });
    });
  }
}
