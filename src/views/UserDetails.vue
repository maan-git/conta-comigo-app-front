<template>
  <div v-if="user.userDetails">
    <CardContainer :hideLogo="true">
      <div class="text-center">
        <p class="primary--text font-weight-bold title">
          {{user.userDetails.first_name}},
          {{$filters.calcAge(user.userDetails.birth_date)}} anos</p>
      </div>

      <v-flex class="how-to">
        <v-img width="350" class="img-center"
          center :src="user.userDetails.avatar"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="danger"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
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
      </v-flex>
      <p v-if="user.userDetailsError" class="block text-center mt-4 red--text">
        {{user.userDetailsError}}
      </p>
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
  computed: mapState(['user']),
  created() {
    this.$store.dispatch('user/getUserDetails');
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
