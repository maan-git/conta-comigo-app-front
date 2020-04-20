<template>
  <div>
    <v-form>
      <v-row justify="space-between" class="mb-0 pa-4">
        <v-btn large fab color="primary">
          <DefaultAvatar :src="avatar" :size="56"/>
        </v-btn>
        <v-switch
          color="primary"
          v-model="edit"
          label="Editar"
        />
      </v-row>
      <v-row class="mb-0">
        <v-col :cols="12" :sm="6" class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="Nome"
            required
            :rules="[$vln.requiredRule('Nome'), $vln.moreThanRule(2)]"
            v-model="first_name"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" :sm="6" class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="Sobrenome"
            required
            :rules="[$vln.requiredRule('Sobrenome'), $vln.moreThanRule(2)]"
            v-model="last_name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12" :sm="6" class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="CPF"
            required
            v-model="cpf"
            v-mask="'###.###.###-##'"
            :rules="[$vln.requiredRule('CPF'), $vln.cpflRule()]"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" :sm="6" class="py-0">
          <v-menu
            :disabled="!edit"
            ref="dpnascimento"
            v-model="datanascimentomenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birth_date"
                label="Data de nascimento"
                readonly
                v-on="on"
                clearable
                outlined
                :rules="[$vln.requiredRule('Data de nascimento')]"
                @click:clear="birth_date = null"
              >{{birth_date}}</v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birth_date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="saveDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col :cols="8"  class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="Telefone para contato"
            required
            v-model="phone_number"
            v-mask="'(##) #####-####'"
            :rules="[$vln.requiredRule('Telefone'),$vln.foneRule(11)]"
          ></v-text-field>
        </v-col>
        <v-col class="py-0">
          <v-checkbox class=" pt-0"
            :readonly="!edit"
            v-model="user.user.is_phone_whatsapp" label=" " prepend-icon="mdi-whatsapp"
            ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 pr-0">
          <v-checkbox class="mt-0 pt-0"
            :readonly="!edit"
            v-model="user.user.live_alone"
            :label="'Mora só'"></v-checkbox>
        </v-col>
        <v-col class="py-0 pl-0">
          <v-checkbox class="mt-0 pt-0"
            :readonly="!edit"
            v-model="user.user.is_at_risk_group"
            :label="'Grupo de risco'"></v-checkbox>
        </v-col>
      </v-row>
      <v-row justify="end" class="px-5" v-if="edit">
        <v-btn large color="primary" rounded>Salvar</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DefaultAvatar from '@/components/DefaultAvatar.vue';

export default {
  name: 'TabPessoal',
  components: {
    DefaultAvatar,
  },
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
      avatar: null,
      first_name: '',
      last_name: '',
      phone_number: '',
      cpf: '',
      cpfMask: '###.###.###-##',
      birth_date: null,
      datanascimentomenu: false,
      is_phone_whatsapp: false,
      is_at_risk_group: false,
      live_alone: false,
      edit: false,
    };
  },
  created() {
    // this.$store.dispatch('user/getUserDetails');
    this.avatar = this.user.user.avatar;
    this.first_name = this.user.user.first_name;
    this.last_name = this.user.user.last_name;
    this.cpf = this.user.user.cpf;
    this.birth_date = this.user.user.birth_date;
    this.phone_number = String(this.user.user.phone_number).substr(3);
    this.is_phone_whatsapp = this.user.user.is_phone_whatsapp;
    this.is_at_risk_group = this.user.user.is_at_risk_group;
    this.live_alone = this.user.user.live_alone;
  },
};
</script>
