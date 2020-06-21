<template>
  <div class="login">
    <CardContainer backTo>
      <v-form ref="formForgotUserPass" class="ma-5 text-center"
        @keyup.enter.native="forgotUserPassClick()">
        <p class="primary--text font-weight-medium headline">Recuperar Senha</p>
        <v-text-field
          outlined
          v-model="email"
          label="Email"
          required
          :rules="[$vln.requiredRule('Email')]"
        ></v-text-field>
       <v-btn small class="mt-1" color="primary" to="/login" text>
          <span class="">Entrar</span>
        </v-btn>
        <v-btn
          class="my-4"
          block
          rounded
          x-large
          @click="forgotUserPassClick()"
          color="primary" :loading="loading">
          <span class="text-capitalize">Enviar</span>
        </v-btn>
        <v-btn small class="mt-1" color="primary" to="/create-account" text>
          <span class="">Cadastre-se e seja um voluntário</span>
        </v-btn>
        <!-- <p v-if="error" class="block text-center mt-4 red--text">
            {{user.forgotUserPassError}}</p>
        <p v-if="success" class="block text-center mt-4 primary--text">
            E-mail de recuperação de senha enviado para <b>{{this.email}}</b>. </p> -->
      </v-form>
    </CardContainer>
  </div>
</template>
<script>
import CardContainer from '@/components/CardContainer.vue';
import { guid } from '../utils/functions';

export default {
  name: 'Login',
  components: {
    CardContainer,
  },
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
      loading: false,
      success: false,
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    forgotUserPassClick() {
      if (this.$refs.formForgotUserPass.validate()) {
        this.loading = true;
        this.$store.dispatch('user/regeneratePass', this.email).then(s => {
          this.loading = false;
          this.$store.dispatch('notification/showNotification', {
            description: `E-mail de recuperação de senha enviado para ${this.email}.`,
            color: 'success',
            id: guid(),
            type: 0,
            status: 0,
          });
          if (this.$route.path !== '/login') this.$router.push('/login')
        }).catch(error => {
          this.loading = false;
          let msg = error.response.data.detail ? error.response.data.detail : error.response.statusText;
          this.$store.dispatch('notification/showNotification', {
            description: msg,
            color: 'danger',
            id: guid(),
            type: 0,
            status: 0,
          });
        });
      }
    },
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
