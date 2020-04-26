<template>
  <div class="request-helps">
    <CardContainer title="Pedidos" backTo="/">
      <div class="request-button my-3">
        <v-btn color="primary"
        :outlined="hidden"
        :text="!hidden"
        :disabled="hidden"
        x-large
        rounded
        @click="listHelp()"><b>Aguardando<br />voluntários</b></v-btn>
        <v-btn color="primary"
        :outlined="!hidden"
        :text="hidden"
        :disabled="!hidden"
        x-large
        rounded
        @click="listApproved()"><b>Aceitos</b></v-btn>
      </div>
      <div v-if="help && help.helpList.length">
        <v-row v-if="hidden" class="row-list">
          <v-col
            cols="12"
            :sm="smSize()"
            xs="12" v-for="(help) in help.helpList"
            :key="help.id_user"
          >
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
              :timeago="$filters.calcTimeCard(help.created)"
            />
          </v-col>
        </v-row>
        <v-row v-else class="row-list">
          <v-col
            cols="12"
            :sm="smSize()"
            xs="12"
            v-for="(help) in help.helpList" :key="help.id_user"
          >
            <HelpCard
              v-if="help.helping_users[0]"
              :avatar="help.request_user.avatar"
              :id="help.id"
              :name="help.request_user.first_name"
              :age="$filters.calcAge(help.request_user.birth_date)"
              :createdat="$filters.formatDate(help.created)"
              :description="help.category.description"
              :timeago="$filters.calcTimeCard(help.created)"
              :block="true"
              :templateAccount="true"
              :nameAssociate="help.helping_users[0].helper_user.first_name"
              :stateAssociate="help.helping_users[0].status.description"
              :imageAssociate="help.helping_users[0].helper_user.avatar"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <p class="title danger--text text-center pa-5">Sem pedidos disponíveis</p>
      </div>
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
  props: {
    ne: { type: Boolean },
    btnDisable: { type: Boolean, default: false },
  },
  data() {
    return {
      hidden: true,
      dataListHelp: null,
      dataListApproved: null,
    };
  },
  methods: {
    smSize() {
      return (this.help.helpList && this.help.helpList.length > 2) ? 6 : 12;
    },
    async listHelp() {
      this.dataListHelp = null;
      this.dataListHelp = {
        limit: 20,
        statusId: 1,
        cityId: this.user.user.addresses[0].city.id,
      };
      if (this.ne) this.dataListHelp.userIdNe = this.user.user.id;
      else this.dataListHelp.userId = this.user.user.id;


      await this.$store.dispatch('help/getHelp', this.dataListHelp);
      this.hidden = true;
      console.log('help.helpList', this.help.helpList);
    },
    async listApproved() {
      this.dataListApproved = null;
      this.dataListApproved = {
        limit: 20,
        statusId: 20,
      };
      if (this.ne) {
        this.dataListApproved.userIdNe = this.user.user.id;
        this.dataListApproved.cityId = this.user.user.addresses[0].city.id;
      } else this.dataListApproved.userId = this.user.user.id;

      await this.$store.dispatch('help/getHelp', this.dataListApproved);
      this.hidden = false;
      console.log('help.helpList', this.help.helpList);
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
