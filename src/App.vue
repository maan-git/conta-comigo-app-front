<template>
  <v-app :class="{'purple': true}">
    <NavBar v-if="user.user"/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },
  computed: mapState(['user']),
  data: () => ({}),
  methods: {
    showNavBar() {
      return (this.$router.history.current.name !== 'Login' && this.$router.history.current.name !== 'CreateAccount');
    },
  },
};
</script>
<style lang="css" scoped>
.theme--light.purple {
  background-color: #532594;
  background-image: url('./assets/pattern.svg');
}
</style>
