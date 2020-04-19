<template>
  <div>
    <v-row>
      <v-col>
        <v-btn large fab color="primary">
          <DefaultAvatar :src="user.userDetails.avatar" :size="56"/>
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field
          outlined
          label="Nome"
          required
          :rules="[$vln.requiredRule('Nome'), $vln.moreThanRule(2)]"
          v-model="user.user.first_name"
        ></v-text-field>
        <v-text-field
          outlined
          label="Sobrenome"
          required
          :rules="[$vln.requiredRule('Sobrenome'), $vln.moreThanRule(2)]"
          v-model="user.user.last_name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          label="CPF"
          required
          v-model="user.user.cpf"
          v-mask="cpfMask"
          :rules="[$vln.requiredRule('CPF'), $vln.cpflRule()]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-menu
          ref="dpnascimento"
          v-model="datanascimentomenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="datanascimento"
              label="Data de nascimento"
              readonly
              v-on="on"
              clearable
              outlined
              :rules="[$vln.requiredRule('Data de nascimento')]"
              @click:clear="datanascimento = null"
            >{{user.user.birth_date}}</v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="datanascimento"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="saveDate"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          label="Telefone para contato"
          required
          v-model="telefone"
          v-mask="'(##) #####-####'"
          :rules="[$vln.requiredRule('Telefone'),$vln.foneRule(11)]"
        >{{user.user.telefone}}</v-text-field>
        <v-checkbox
          v-model="user.user.is_phone_whatsapp"
          :label="'Whatsapp'"></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-checkbox
          v-model="user.user.live_alone"
          :label="'Mora só'"></v-checkbox>
      </v-col>
      <v-col>
        <v-checkbox
          v-model="user.user.is_at_risk_group"
          :label="'Grupo de risco'"></v-checkbox>
      </v-col>
    </v-row>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import DefaultAvatar from '@/components/DefaultAvatar.vue';

export default {
  components: {
    DefaultAvatar,
  },
  computed: mapState(['user']),
  date() {
    return {
      cpfMask: '###.###.###-##',
      datanascimento: null,
      datanascimentomenu: false,
    };
  },
  methods: {
    saveDate(date) {
      const mdate = new Date(date);
      const dia = mdate.getDay() < 0 ? `0${mdate.getDay()}` : mdate.getDay();
      const mes = (mdate.getMonth() + 1) < 0 ? `0${(mdate.getMonth() + 1)}` : (mdate.getMonth() + 1);
      this.$refs.dpnascimento.save(`${dia}-${mes}-${mdate.getFullYear()}`);
    },
  },
  created() {
    this.$store.dispatch('user/getUserDetails');
  },
};
</script>
