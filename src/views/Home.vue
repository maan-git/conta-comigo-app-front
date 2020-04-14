<template>
  <v-container class="home">
    <!-- <ListHelpAssociate /> -->
    <ListHelp/>
    <ListVolunteers/>
  </v-container>
</template>

<script>
// @ is an alias to /src
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
