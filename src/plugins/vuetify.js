import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: localStorage.getItem("theme") === "dark",
    themes: {
      light: {
        primary: colors.grey.lighten3,
        secondary: colors.yellow.darken3,
        //secondary: "f7931a",
        accent: colors.shades.black,
        error: colors.red.accent3,
        background: colors.indigo.lighten5
      },
      dark: {
        primary: colors.grey.darken4,
        secondary: colors.yellow.darken3,
        text: colors.black
      }
    }
  }
});
