import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { colors } from "vuetify/lib";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#f7f7f7",
        secondary: "#3662D8",
        accent: "#BCCEFF",
        error: colors.red.accent3,
        background: colors.indigo.lighten5,
        info: colors.teal.darken1,
      },
      dark: {
        primary: colors.blue.darken4,
        background: colors.indigo.base,
        info: colors.teal.lighten1,
      },
    },
  },
};

export default new Vuetify(opts);
