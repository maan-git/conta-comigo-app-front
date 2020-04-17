<template>
  <div>
    <div class="button white--text text-center mt-5 mb-0">
      <button @click="listHelp()">Aguardando voluntários</button>
      <button @click="listApproved()">Aceitos</button>
    </div>
    <div v-if="hidden">
      <CardContainer :hideLogo="true">
        <v-row>
          <v-col cols="12" sm="6" xs="12" v-for="(help) in help.helpList" :key="help.id_user">
            <HelpCard
              :avatar="help.request_user.avatar"
              :id="help.id"
              :name="help.request_user.first_name"
              :age="$filters.calcAge(help.request_user.birth_date)"
              :createdat="$filters.formatDate(help.created)"
              :description="help.category.description"
              :block="true"
            />
          </v-col>
        </v-row>
      </CardContainer>
    </div>
    <div v-if="!hidden">
      <CardContainer :hideLogo="true">
        <v-row>
          <v-col cols="12" sm="6" xs="12" v-for="(help) in help.helpList" :key="help.id_user">
            <HelpCard
              :avatar="help.request_user.avatar"
              :id="help.id"
              :name="help.request_user.first_name"
              :age="$filters.calcAge(help.request_user.birth_date)"
              :createdat="$filters.formatDate(help.created)"
              :description="help.category.description"
              :block="true"
            />
          </v-col>
        </v-row>
      </CardContainer>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import HelpCard from '@/components/HelpCard.vue';
import CardContainer from '@/components/CardContainer.vue';

export default {
  components: { CardContainer, HelpCard },
  computed: mapState(['help', 'user']),
  data() {
    return {
      hidden: true,
    };
  },
  methods: {
    async listHelp() {
      await this.$store.dispatch('help/getHelp', {
        userId: 1,
        limit: 10,
      });
      this.hidden = true;
    },
    async listApproved() {
      await this.$store.dispatch('help/getHelp', {
        userId: 1,
        limit: 10,
      });
      this.hidden = false;
    },
  },
  created() {
    this.listHelp();
  },
};
</script>
