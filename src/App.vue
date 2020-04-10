<template>
  <v-app :class="purple()">
    <!--  -->
    <NavBar v-if="user.user" v-on:toogle="toogleMenu()"/>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-btn
                text
                block
                color="primary"
                @click="$store.dispatch('user/logout')">Logout</v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
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
  data: () => ({
    drawer: false,
  }),
  methods: {
    purple() {
      if (this.$router.history.current.name !== 'Home') {
        return 'purple';
      }
      return '';
    },
    toogleMenu() {
      console.log('toogleMenu');
      this.drawer = !this.drawer;
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
