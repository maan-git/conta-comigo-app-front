<template>
  <v-container class="home">
    <ListHelp/>
    <ListVolunteers/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ListHelp from '@/components/ListHelp.vue';
import ListVolunteers from '@/components/ListVolunteers.vue';

export default {
  name: 'Home',
  components: {
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
