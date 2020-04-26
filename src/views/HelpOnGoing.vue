<template>
  <div v-if="help.helpDetails">
    <CardContainer :title="'Detalhes da Ajuda'">
      <v-card max-width="400" elevation="0">
        <!-- eslint-disable-next-line max-len -->
        <v-card-title v-text="`${help.helpDetails.helping_users[0].helper_user.first_name} ${help.helpDetails.helping_users[0].helper_user.last_name}, ${$filters.calcAge(help.helpDetails.helping_users[0].helper_user.birth_date)} anos`"
          class="primary--text"
        >
        </v-card-title>
        <v-img
          :src="help.helpDetails.helping_users[0].helper_user.avatar"
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
        <v-card-text class="grey--text text--darken-2">
          <v-row>
            <v-col>
              <v-btn icon color="primary" :href="`https://wa.me/${fakeFone}`" target="_blank">
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn text color="primary" :href="`callto:${fakeFone}`">
                <span class="subtitle-2">{{fakeFone}}</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                text color="primary"
                :href="`mailto:${help.helpDetails.helping_users[0].helper_user.email}`">
                <span class="subtitle-2">
                  {{help.helpDetails.helping_users[0].helper_user.email}}</span>
              </v-btn>
            </v-col>
          </v-row>
          <div class="title">{{help.helpDetails.category.description}}</div>
          <div class="subtitle-1">{{help.helpDetails.description}}</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

        <v-btn
          @click="applyToHelp()"
          rounded v-if="!newHelp"
          :disabled="!!help.helpDetailsDisable"
          :loading="help.helpDetailsLoading"
          color="danger"
        >
          <span class="white--text .font-weight-bold">
            Cancelar
          </span>
        </v-btn>
        </v-card-actions>
      </v-card>
    <p v-if="help.helpDetailsError"
       class="block text-center mt-4 red--text">{{help.helpDetailsError}}</p>
    <p v-if="help.helpDetailsSuccess"
       class="block text-center mt-4 success--text">
      Obrigado <b>{{user.user.first_name}}</b> pela força!</p>
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
      fakeFone: '5511999999999',
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

<style lang="scss" scoped>
</style>
