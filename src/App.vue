<template>
  <v-app :class="purple()">
    <!--  -->
    <NavBar v-on:toogle="toogleMenu()"/>
    <SideMenu ref="sidemenu"/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './components/NavBar.vue';
import SideMenu from './components/SideMenu.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    SideMenu,
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
    toogleMenu() {
      this.$refs.sidemenu.toogleMenu();
    },
  },
};
</script>
<style lang="scss" scoped>
.theme--light.purple {
  background-color: #532594;
  background-image: url('./assets/pattern.svg');
}
</style>
