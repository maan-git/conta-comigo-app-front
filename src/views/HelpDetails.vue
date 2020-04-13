<template>
  <div v-if="help.helpDetails">
    <CardContainer :hideLogo="true">
      <div class="text-center">
        <p class="primary--text font-weight-bold title">
          {{help.helpDetails.request_user.first_name}},
          {{$filters.calcAge(help.helpDetails.created)}} anos</p>
      </div>

      <v-flex class="how-to">
        <v-img width="350" class="img-center"
          center :src="help.helpDetails.request_user.avatar"></v-img>
        <div class="text-center margin-text">
          <ul>
            <li>
              <span
            class="subtitle-1 grey--text"
          >Criado em {{$filters.formatDate(help.helpDetails.created)}}</span>
            </li>
            <li>
              <span
            class="subtitle-1 grey--text"
          >{{help.helpDetails.category.description}}</span>
            </li>
          </ul>
          <span
            class="subtitle-1 grey--text"
          >Descrição: </span>
          <br />
          <span
            class="subtitle-1 grey--text"
          >{{help.helpDetails.description}}</span>
        </div>
      </v-flex>
      <v-btn
        @click="applyToHelp()"
        rounded v-if="!newHelp"
        :disabled="!!help.helpDetailsDisable"
        :loading="help.helpDetailsLoading"
        class="v-btn v-btn--block v-btn--contained
        v-btn--rounded theme--light v-size--x-large primary">
        Conta Comigo
        <v-icon right dark>$heart</v-icon>
      </v-btn>
    <p v-if="help.helpDetailsError"
       class="block text-center mt-4 red--text">{{help.helpDetailsError}}</p>
    <p v-if="help.helpDetailsSuccess"
       class="block text-center mt-4 blue--text">
      Obrigado <b>{{user.user.first_name}}</b> pele força!</p>
    </CardContainer>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import CardContainer from '@/components/CardContainer.vue';


export default {
  components: {
    CardContainer,
  },
  computed: mapState(['help', 'user']),
  data() {
    return {
      newHelp: false,
      id_help: this.id,
    };
  },
  methods: {
    async requestHelp() {
      await this.$store.dispatch('help/getHelp');
    },
    async applyToHelp() {
      await this.$store.dispatch('help/applyToHelpRequest', this.$route.query.id);
    },
  },
  created() {
    this.$store.dispatch('help/requestHelpDetails', this.$route.query.id);
  },
};
</script>

<style lang="scss">
.margin-text{
  margin:12% 0;
}
.img-center{
  margin:0 auto;
}
</style>
