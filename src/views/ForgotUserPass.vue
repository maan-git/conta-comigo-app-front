<template>
  <div class="login">
    <CardContainer>
      <v-form ref="formLogin" class="ma-5 text-center" @keyup.enter.native="loginClick()">
        <p class="primary--text font-weight-medium headline">Recuperar Senha</p>
        <v-text-field
          outlined
          v-model="email"
          label="Email"
          required
          :rules="[$vln.requiredRule('Email')]"
        ></v-text-field>
       <v-btn small class="mt-1" color="primary" to="/login" text>
          <span class="">Login</span>
        </v-btn>
        <v-btn
          class="my-4"
          block
          rounded
          x-large
          @click="forgotLoginPassClick()"
          color="primary" :loading="user.loginLoading">
          <span class="text-capitalize">Enviar</span>
        </v-btn>
        <v-btn small class="mt-1" color="primary" to="/create-account" text>
          <span class="">Cadastre-se e seja um voluntário</span>
        </v-btn>
        <p v-if="user.loginError" class="block text-center mt-4 red--text">{{user.loginError}}</p>
      </v-form>
    </CardContainer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CardContainer from '@/components/CardContainer.vue';

export default {
  name: 'Login',
  components: {
    CardContainer,
  },
  computed: mapState(['user']),
  watch: {
    email(email) {
      if (email) {
        this.email = email.toLowerCase();
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginClick() {
      if (this.$refs.formLogin.validate()) {
        this.$store.dispatch('user/login', { username: this.email, password: this.password });
      }
    },
  },
  created() {
    this.$store.dispatch('register/resetForm');
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped).card-mobile {
  border-radius: 54px;
  justify-self: stretch;
}
</style>
