import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { Actions as AuthActions, Getters as AuthGetters } from "@/store/auth";
import { Actions as CartActions } from "@/store/cart";

@Component({})
export default class HomeComponent extends Vue {
  private selectedCards: Array<number> = [];

  private cards: Array<any> = [
    {
      title: "gerogea",
      content:
        "George Town is the colorful, multicultural capital of the Malaysian island of Penang.",
      src: require("@/assets/images/geroge-town.jpg"),
      price: "RM60",
    },
    {
      title: "geroge",
      content: "George Town is the colorful,  the Malaysian island of Penang.",
      src: require("@/assets/images/geroge-town.jpg"),
      price: "RM60",
    },
  ];

  @Action(AuthActions.SIGN_OUT)
  private signOut;

  @Getter(AuthGetters.USER)
  private readonly user;

  @Action(CartActions.CHECKOUT)
  private fireCheckout;

  data() {
    return {
      carousels: [
        {
          src: require("@/assets/images/geroge-town.jpg"),
        },
        {
          src: require("@/assets/images/langkawi.jpg"),
        },
      ],
    };
  }

  private logout() {
    this.signOut().then(() => {
      this.$router.push({
        name: "Login",
      });
    });
  }

  private checkout() {
    const timestamp: string = Date.now().toString();
    const cart = {};
    const addItems = this.selectedCards.map((val) => this.cards[val]);

    cart[timestamp] = {
      timestamp: timestamp,
      items: { ...addItems },
    };

    this.fireCheckout({
      uid: this.user.uid,
      data: {
        cart,
      },
    });
  }
}
