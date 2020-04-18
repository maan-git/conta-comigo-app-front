<template>
  <div v-if="user.userDetails" class="user-details">
    <CardContainer :title="'Perfil'" >
      <div class="text-center">
        <p class="primary--text font-weight-bold title">
          {{user.userDetails.first_name}},
          {{$filters.calcAge(user.userDetails.birth_date)}} anos</p>
      </div>

      <v-flex class="how-to">

        <v-btn large fab color="primary" @click="$emit('openDialog')">
          <DefaultAvatar :src="user.userDetails.avatar" :size="60"/>
        </v-btn>

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
import DefaultAvatar from '@/components/DefaultAvatar.vue';

export default {
  components: {
    CardContainer, DefaultAvatar,
  },
  computed: mapState(['user']),
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
