<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      :src="require('../assets/icone.svg')"
      transition="scale-transition"
      width="40"
    />
    <v-spacer></v-spacer>
    <div class="text--center">
      <span class="title">Olá, Luzia</span>
      <p>Conta comigo</p>
    </div>
    <v-spacer></v-spacer>
    <v-avatar :size="46">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="require('../assets/logo.svg')"
        transition="scale-transition"
        width="46"
      />
    </v-avatar>
    <!-- <v-spacer></v-spacer>

    <v-btn to="/create-help" text>
      <span>create help</span>
    </v-btn>
        <v-btn to="/list-help" text>
      <span>list help</span>
    </v-btn>
    <v-btn @click="logout()" text>
      <span>logout</span>
    </v-btn> -->
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>
<style lang="scss" scoped>
.v-toolbar {
  // height: 115px !important;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}
.v-toolbar__content, .v-toolbar__extension {
  display: flex;
  flex-direction: row;
  height: 100% !important;
  justify-content: space-around;

}

.my-nav-bar {
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  position: fixed;
  top: 0;
  z-index: 5;
  height: 115px !important;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  contain: layout;
  display: block;
  background-color: #532594
}


</style>
 <!--v-sheet v-sheet--tile theme--dark v-toolbar v-app-bar v-app-bar--fixed primary-->
