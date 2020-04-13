<template>
  <v-app :class="purple()">
    <!--  -->
    <SideMenu ref="sidemenu"/>
    <NavBar v-on:toogle="toogleMenu()"/>
    <v-content class="content-width">
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
  created() {
    this.$store.dispatch('register/resetForm');
  },
};
</script>
<style lang="scss" scoped>
.theme--light.purple {
  background-color: #532594;
  background-image: url('./assets/pattern.svg');
  transition: all .3s ease-in-out;
}
.content-width {
  width: 100%;
  max-width: 1000px;
  align-self: center;
}
</style>
