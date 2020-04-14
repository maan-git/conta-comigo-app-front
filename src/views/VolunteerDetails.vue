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
          center :src="help.userDetails.request_user.avatar"></v-img>
        <div class="text-center margin-text">
          <ul>
            <li>
              <span
            class="subtitle-1 grey--text"
          >Criado em {{$filters.formatDate(user.userDetails.created)}}</span>
            </li>
          </ul>
        </div>
      </v-flex>
    <p v-if="help.helpDetailsError"
       class="block text-center mt-4 red--text">{{help.userDetailsError}}</p>
    <p v-if="help.helpDetailsSuccess"
       class="block text-center mt-4 blue--text">
      Obrigado <b>{{user.userDetails.first_name}}</b> pele força!</p>
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
  data() {
    return {
      newHelp: false,
      id_help: this.id,
    };
  },
  created() {
    this.$store.dispatch('user/getUserDetails', `id={this.$route.query.userId}`);
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
