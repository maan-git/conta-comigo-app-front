import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import HeartIcon from '../components/HeartIcon.vue';

Vue.use(Vuetify);

export default new Vuetify({

  theme: {
    themes: {
      light: {
        primary: '#532594', // #E53935
        // secondary: colors.red.lighten4, // #FFCDD2
        // accent: colors.indigo.base, // #3F51B5
      },
    },
  },
  icons: {
    values: {
      heart: {
        component: HeartIcon,
      },
    },
  },
});
