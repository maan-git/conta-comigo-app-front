<template>
  <v-container class="home" @load="listHelp()">
    <ListHelp/>
    <ListVolunteers/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import ListHelp from '@/components/ListHelp.vue';
import ListVolunteers from '@/components/ListVolunteers.vue';
// import ListHelpAssociate from '@/components/ListHelpAssociate.vue';

export default {
  name: 'Home',
  components: {
    // ListHelpAssociate,
    ListHelp,
    ListVolunteers,
  },
  computed: mapState(['help', 'user']),
  methods: {
    async listHelp() {
      await this.$store.dispatch('help/getHelp', this.user.user.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: white;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
</style>
