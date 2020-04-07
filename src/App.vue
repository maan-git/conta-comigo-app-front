<template>
  <v-app :class="purple()">
    <!--  -->
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
    purple() {
      if (this.$router.history.current.name !== 'Home') {
        return 'purple';
      }
      return '';
    },
  },
  beforeCreate() {
    this.$store.dispatch('user/getCurrentUser');
  },
};
</script>
<style lang="scss" scoped>
.theme--light.purple {
  background-color: #532594;
  background-image: url('./assets/pattern.svg');
}
</style>
