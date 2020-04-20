<template>
  <div>
    <v-form>
      <v-switch
        color="primary"
        v-model="edit"
        label="Editar"
      />
      <v-row class="mb-0">
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="Email"
            required
            :rules="[$vln.requiredRule('E-mail'), $vln.emailRule()]"
            v-model="email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end" class="px-5" v-if="edit">
        <v-btn large color="primary" rounded>Salvar</v-btn>
      </v-row>
      <v-row>
        <v-col :cols="12" class="py-0">
          <v-switch
            color="primary"
            v-model="editPass"
            label="Editar Senha"
          />
        </v-col>
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="!editPass"
            outlined
            label="Senha"
            required
            type="password"
            :rules="[$vln.requiredRule('Senha'), $vln.moreThanRule(6)]"
            v-model="password"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="!editPass"
            outlined
            label="Repetir Senha"
            required
            type="password"
            :rules="[$vln.requiredRule('Repitir Senha'), $vln.mustBeEqualPass(password),]"
            v-model="repassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end" class="px-5" v-if="editPass">
        <v-btn large color="primary" rounded>Salvar Senha</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'TabPessoal',
  components: {},
  computed: mapState(['user']),
  methods: {
    saveDate(date) {
      const mdate = new Date(date);
      const dia = mdate.getDay() < 0 ? `0${mdate.getDay()}` : mdate.getDay();
      const mes = (mdate.getMonth() + 1) < 0 ? `0${(mdate.getMonth() + 1)}` : (mdate.getMonth() + 1);
      this.$refs.dpnascimento.save(`${dia}-${mes}-${mdate.getFullYear()}`);
    },
  },
  data() {
    return {
      email: '',
      password: '123456',
      repassword: '123456',
      edit: false,
      editPass: false,
    };
  },
  created() {
    // this.$store.dispatch('user/getUserDetails');
    this.email = this.user.user.email;
  },
};
</script>
