<template>
  <v-container class="home">
    <h3 class="primary--text">Pedidos recentes</h3>
    <ListHelp/>
    <v-btn text block color="primary">ver todos</v-btn>
    <h3 class="primary--text">Voluntarios</h3>
    <router-link
        to="/CreateHelp"
        tag="v-btn"
      >
      <v-btn
        rounded
        block
        color="primary"
        x-large
      >
        Preciso de ajuda!
        <v-icon>$heart</v-icon>
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ListHelp from '@/components/ListHelp.vue';

export default {
  name: 'Home',
  components: {
    ListHelp,
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: white;
  height: 100%;
}
</style>
