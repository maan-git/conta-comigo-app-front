<template>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      :color="'#532594'"
    >
      <div class="text-center mt-5">
        <img width="178" :src="require('../assets/logo_completa.svg')">
      </div>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-btn
              color="primary"
              block
              right
              elevation="0"
              to="/"
              @click="toogleMenu()">Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              color="primary"
              block
              right
              elevation="0"
              @click="$store.dispatch('user/logout')">Logout</v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  data() { return { drawer: false }; },
  methods: {
    toogleMenu() {
      this.drawer = !this.drawer;
    },
    logout() {

    },
  },
};
</script>
<style lang="scss" scoped>
.v-navigation-drawer--absolute {
  z-index: 10000;
}
</style>
