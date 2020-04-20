<template>
  <div v-if="user.user" class="user-details">
    <CardContainer :title="'Perfil'" >
      <div class="text-center">
        <p class="primary--text font-weight-bold title">
          {{tabName}}</p>
      </div>
      <v-tabs @change="change">
        <v-tab>
          <v-icon left>mdi-account</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
        </v-tab>
        <v-tab-item>
          <TabPessoal/>
        </v-tab-item>
        <v-tab-item>
          <TabEndereco/>
        </v-tab-item>
        <v-tab-item>
          <TabConta/>
        </v-tab-item>
      </v-tabs>
    </CardContainer>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import CardContainer from '@/components/CardContainer.vue';
import TabPessoal from '@/components/detailstabs/TabPessoal.vue';
import TabEndereco from '@/components/detailstabs/TabEndereco.vue';
import TabConta from '@/components/detailstabs/TabConta.vue';

export default {
  components: {
    CardContainer, TabPessoal, TabEndereco, TabConta,
  },
  computed: mapState(['user']),
  data() {
    return {
      tabName: 'Dados Pessoais',
    };
  },
  methods: {
    change(tab) {
      console.log('change tab', tab);
      switch (tab) {
        case 0:
          this.tabName = 'Dados Pessoais';
          break;
        case 1:
          this.tabName = 'Endereço';
          break;
        case 2:
          this.tabName = 'Dados da Conta';
          break;
        default:
          break;
      }

      if (tab === 0) { this.tabName = 'Dados Pessoais'; }
      if (tab === 1) { this.tabName = 'Endereço'; }
      if (tab === 2) { this.tabName = 'Dados da Conta'; }
    },
  },
  created() {
    this.$store.dispatch('user/getCurrentUser');
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
