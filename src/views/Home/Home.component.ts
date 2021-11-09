import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { Actions as AuthActions, Getters as AuthGetters } from "@/store/auth";
import { Actions as CartActions, Getters as CartGetters } from "@/store/cart";
import CheckoutBtn from "@/components/Checkout/Checkout.component.vue";

@Component({
  components: {
    CheckoutBtn,
  },
})
export default class HomeComponent extends Vue {
  private selectedCards: Array<number> = [];
  private amount = 0;

  private cards: Array<any> = [
    {
      title: "gerogea",
      content:
        "George Town is the colorful, multicultural capital of the Malaysian island of Penang.",
      src: require("@/assets/images/geroge-town.jpg"),
      price: "60",
    },
    {
      title: "geroge",
      content: "George Town is the colorful,  the Malaysian island of Penang.",
      src: require("@/assets/images/geroge-town.jpg"),
      price: "60",
    },
  ];

  @Action(AuthActions.SIGN_OUT)
  private signOut;

  @Getter(AuthGetters.USER)
  private readonly user;

  @Action(CartActions.CHECKOUT)
  private fireCheckout;

  @Action(CartActions.ADD_TO_CART)
  private addToCart;

  @Action(CartActions.RESET_CART)
  private resetCart;

  @Getter(CartGetters.CartItems)
  private readonly cartItem;

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

  private updateCart() {
    this.resetCart();
    const addItems = this.selectedCards.map((val) => this.cards[val]);
    addItems.map((val) => this.addToCart(val));
  }

  private updateAmount() {
    this.amount = 0;
    let val = 0;
    this.cartItem.map((item) => (val += Number(item.price)));
    this.amount = val;
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
    cart[timestamp] = {
      timestamp: timestamp,
      items: { ...this.cartItem },
    };
    this.fireCheckout({
      uid: this.user.uid,
      data: {
        cart,
      },
    });
  }

  private paymentSuccessEvent() {
    this.checkout();
  }
}
