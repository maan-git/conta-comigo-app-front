<template>
  <div v-if="help.helpDetails">
    <CardContainer :hideLogo="true">
      <div class="text-center">
        <p class="primary--text font-weight-bold title">Agora é só aguardar!</p>
      </div>

      <v-flex class="how-to">
        <v-img width="350" class="img-center"
          center :src="require('../assets/intro/step1.svg')"></v-img>
        <div class="text-center margin-text">
          <span
            class="subtitle-1 grey--text"
          >{{help.helpDetails.description}}</span>
        </div>
      </v-flex>
      <v-btn
        rounded v-if="!newHelp"
        class="v-btn v-btn--block v-btn--contained
        v-btn--rounded theme--light v-size--x-large primary">
        OK
      </v-btn>

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
  computed: mapState(['help']),
  data() {
    return {
      newHelp: false,
      id_help: this.id,
    };
  },
  created() {
    this.$store.dispatch('help/requestHelpDetails', this.$route.query.id);
  },
};
</script>
