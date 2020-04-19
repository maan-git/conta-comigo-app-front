<template>
  <div v-if="user.userDetails" class="user-details">
    <CardContainer :title="'Perfil'" >
      <div class="text-center">
        <p class="primary--text font-weight-bold title">
          {{user.userDetails.first_name}},
          {{$filters.calcAge(user.userDetails.birth_date)}} anos</p>
      </div>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
        </v-tab>
        <v-tab-item>
          <TabPessoal/>
        </v-tab-item>
      </v-tabs>


        <div class="text-center margin-text">
          <p class="subtitle-1 grey--text">
            Cadastrou-se em {{$filters.formatDate(user.userDetails.date_joined)}}
          </p>
          <p class="subtitle-1 grey--text">
            Grupo de risco: {{$filters.isRiskGroup(user.userDetails.is_at_risk_group)}}
          </p>
          <p class="subtitle-1 grey--text">
            Telefone: {{user.userDetails.phone_number}}
          </p>
        </div>
      <p v-if="user.userDetailsError" class="block text-center mt-4 red--text">
        {{user.userDetailsError}}
      </p>
    </CardContainer>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import CardContainer from '@/components/CardContainer.vue';
import TabPessoal from '@/components/detailstabs/TabPessoal.vue';

export default {
  components: {
    CardContainer, TabPessoal,
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

<style lang="scss" scoped>
.user-details {
  width: 100%;
  height: 100%;
}
.margin-text{
  margin:12% 0;
}
.img-center{
  margin:0 auto;
}
</style>
