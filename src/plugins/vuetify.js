import Vue from 'vue';
import Vuetify, { VTextField } from 'vuetify/lib';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import HeartIcon from '../components/HeartIcon.vue';

Vue.use(Vuetify, { components: { VTextField } });
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyDKii6D4Qt05eQwu7w_DIJpWz6FJFKQ7Uw',
});


export default new Vuetify({

  theme: {
    themes: {
      light: {
        primary: '#532594',
        secondary: '#5f5f5f',
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
