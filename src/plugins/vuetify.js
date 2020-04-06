import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import HeartIcon from '../components/HeartIcon.vue';

Vue.use(Vuetify);

export default new Vuetify({

  theme: {
    themes: {
      light: {
        primary: '#532594',
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
