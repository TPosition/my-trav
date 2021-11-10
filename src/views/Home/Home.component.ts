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
  private selectedForeignCards: Array<number> = [];
  private amount = 0;

  private cards: Array<any> = [
    {
      title: "George Town",
      content:
        "George Town is the colorful, multicultural capital of the Malaysian island of Penang.",
      src: require("@/assets/images/geroge-town.jpg"),
      price: "79",
      rating: 5,
      vote: "1024",
      location: "Malaysia, Penang",
    },
    {
      title: "Langkawi",
      content:
        "Langkawi, the Jewel of Kedah, is a district and an archipelago of 99 islands in the Malacca Strait.",
      src: require("@/assets/images/langkawi.jpg"),
      price: "169",
      rating: 5,
      vote: "739",
      location: "Malaysia, Kedah",
    },
    {
      title: "Petronas Twin Towers",
      content:
        "The Petronas Towers, or the Petronas Twin Towers, are twin skyscrapers in Malaysia.",
      src: require("@/assets/images/petronas-towers.jpg"),
      price: "59",
      rating: 5,
      vote: "603",
      location: "Malaysia, Kuala Lumpur",
    },
    {
      title: "Batu Caves",
      content:
        "Batu Caves is a limestone hill that has a series of caves and cave temples in Gombak.",
      src: require("@/assets/images/malaysia-batucaves.jpg"),
      price: "79",
      rating: 5,
      vote: "933",
      location: "Malaysia, Selangor",
    },
    {
      title: "Legoland",
      content:
        "Legoland is a park that features attractions and other events for entertainment purposes.",
      src: require("@/assets/images/malaysia-legoland.jpg"),
      price: "89",
      rating: 5,
      vote: "782",
      location: "Malaysia, Johor",
    },
  ];

  private foreignCards = [
    {
      title: "Tokyo Skytree",
      content:
        "Tokyo Skytree, the tallest structure in Japan in 2010, is a broadcasting and observation tower.",
      src: require("@/assets/images/tokyo-skytree.jpg"),
      price: "799",
      rating: 5,
      vote: "724",
      location: "Tokyo, Sumida",
    },
    {
      title: "N seoul tower",
      content:
        "N Seoul Tower is a communication and observation tower located on Namsan Mountain.",
      src: require("@/assets/images/n-seoul-tower.jpg"),
      price: "799",
      rating: 5,
      vote: "785",
      location: "South Korea, Seoul",
    },
    {
      title: "Peshawar",
      content:
        "Peshawar is the capital of the Pakistani province of Khyber Pakhtunkhwa and its largest city.",
      src: require("@/assets/images/pakistan-peshawar.jpg"),
      price: "399",
      rating: 5,
      vote: "612",
      location: "Pakistan, Khyber Pakhtunkhwa",
    },
    {
      title: "Red Square",
      content:
        "Red Square is one of the oldest and largest squares in Moscow, the capital of Russia.",
      src: require("@/assets/images/russia-redsquare.jpg"),
      price: "599",
      rating: 5,
      vote: "542",
      location: "Russia, Moscow",
    },
    {
      title: "The blue Mosque",
      content:
        "Sultan Ahmed Mosque, also known as the Blue Mosque, is an Ottoman-era historical imperial mosque.",
      src: require("@/assets/images/turkey-thebluemosque.jpg"),
      price: "599",
      rating: 5,
      vote: "389",
      location: "Russia, Moscow",
    },
  ];

  data() {
    return {
      carousels: [
        {
          color: "white--text",
          line_1: "If you're not barefoot, then you're overdressed.",
          line_2: "Traveling is the spice of life.",
          src: require("@/assets/images/banner2.jpg"),
        },
        {
          color: "white--text",
          line_1:
            "There's nothing like a beautiful sunset to end a healthy day.",
          line_2: "Take a trip now!",
          src: require("@/assets/images/banner1.jpg"),
        },
        {
          color: "white--text",
          line_1: "A sweet escape.",
          line_2: "Even sweeter prices.",
          src: require("@/assets/images/banner3.jpg"),
        },
        {
          color: "white--text",
          line_1: "It is not the mountain we conquer but ourselves.",
          line_2: "Traveling opens door to creating memories.",
          src: require("@/assets/images/banner4.jpg"),
        },
        {
          color: "white--text",
          line_1: "There's Snow Buddy Like You!",
          line_2: "Let It Snow, Let It Snow.",
          src: require("@/assets/images/banner5.jpg"),
        },
      ],
    };
  }

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

  private updateCart() {
    this.resetCart();

    const addItems = this.selectedCards.map((val) => this.cards[val]);
    addItems.map((val) => this.addToCart(val));

    const addForeignItems = this.selectedForeignCards.map(
      (val) => this.foreignCards[val]
    );
    addForeignItems.map((val) => this.addToCart(val));
    console.log(this.cartItem);
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
    this.$router.push({ name: "History" });
  }
}
