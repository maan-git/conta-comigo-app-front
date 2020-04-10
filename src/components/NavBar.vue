<template>
  <v-app-bar app color="primary" dark prominent dense>
    <div class="nav-container">
      <v-btn text fab large @click="$emit('toogle')">
        <v-img
          alt="conta comigo"
          class="shrink mr-2"
          contain
          :src="require('../assets/icone.svg')"
          transition="scale-transition"
          width="45"
        />
      </v-btn>
      <div class="nav-container__text">
        <p class="title mb-0">Olá, {{user.user.first_name}}
          <br>
          <span class="subtitle-1">Conta comigo!</span>
        </p>
      </div>
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
    </div>
  </v-app-bar>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['user']),
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
  created() {
    console.log('user.user', this.user.user);
  },
};
</script>
<style lang="scss" scoped>
.v-toolbar {
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}

.nav-container {
  width: 90%;
  height: 60px;
  margin: 10px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__text {
    text-align: center;
    vertical-align: middle;
  }
}

</style>
