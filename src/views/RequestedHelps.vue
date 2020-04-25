<template>
  <div class="request-helps">
    <CardContainer title="Pedidos" backTo="/">
      <div class="request-button my-3">
        <v-btn color="primary"
        :outlined="hidden"
        :text="!hidden"
        :disabled="hidden"
        large
        rounded
        @click="listHelp()"><b>Aguardando<br />voluntários</b></v-btn>
        <v-btn color="primary"
        :outlined="!hidden"
        :text="hidden"
        :disabled="!hidden"
        large
        rounded
        @click="listApproved()"><b>Aceitos</b></v-btn>
      </div>
      <v-row v-if="hidden" class="row-list">
        <v-col cols="12" sm="6" xs="12" v-for="(help) in help.helpList" :key="help.id_user">
          <HelpCard
            :avatar="help.request_user.avatar"
            :id="help.id"
            :name="help.request_user.first_name"
            :age="$filters.calcAge(help.request_user.birth_date)"
            :createdat="$filters.formatDate(help.created)"
            :description="help.category.description"
            :block="true"
            :templateAccount="false"
            :btnDisable="btnDisable"
          />
        </v-col>
      </v-row>
      <v-row v-else class="row-list">
        <v-col cols="12" sm="6" xs="12" v-for="(help) in help.helpList" :key="help.id_user">
          <HelpCard
            v-if="help.helping_users[0]"
            :avatar="help.request_user.avatar"
            :id="help.id"
            :name="help.request_user.first_name"
            :age="$filters.calcAge(help.request_user.birth_date)"
            :createdat="$filters.formatDate(help.created)"
            :description="help.category.description"
            :block="true"
            :templateAccount="true"
            :nameAssociate="help.helping_users[0].helper_user.first_name"
            :stateAssociate="help.helping_users[0].status.description"
            :imageAssociate="help.helping_users[0].helper_user.avatar"
          />
        </v-col>
      </v-row>
    </CardContainer>
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
      btnDisable: false,
    };
  },
  methods: {
    async listHelp() {
      const data = {
        limit: 20,
        statusId: 1,
        cityId: this.user.user.addresses[0].city.id,
      };
      if (this.$route.query.userRequest) {
        data.userId = this.user.user.id;
        this.btnDisable = true;
      } else {
        data.userIdNe = this.user.user.id;
      }
      await this.$store.dispatch('help/getHelp', data);
      this.hidden = true;
    },
    async listApproved() {
      const data = {
        limit: 20,
        statusId: 20,
        cityId: this.user.user.addresses[0].city.id,
      };
      if (this.$route.query.userRequest) {
        data.userId = this.user.user.id;
      } else {
        data.userIdNe = this.user.user.id;
      }
      await this.$store.dispatch('help/getHelp', data);
      this.hidden = false;
    },
  },
  created() {
    this.listHelp();
  },
  beforeDestroy() {
    this.$store.dispatch('help/clearHelpState');
  },
};
</script>
<style scoped>
.request-helps{
  height: 100%;
}
.request-button{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.row-list{
  min-height: 500px;
}
</style>
