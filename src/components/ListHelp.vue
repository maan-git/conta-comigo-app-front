<template>
  <v-container>
    <div v-if="help.helpList">
      <Carousel :loop="true" :scrollPerPage="2" :paginationEnabled="false">
        <Slide  v-for="(help, i) in help.helpList" :key="help.id_user">
          <HelpCard
            :name="`Maria do Carmo ${i}`"
            :age="'65'"
            :createdat="'23/02'"
            :description="help.description"
          />
        </Slide>
      </Carousel>
    </div>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
import HelpCard from '@/components/HelpCard.vue';
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    HelpCard,
    Carousel,
    Slide,
  },
  computed: mapState(['help']),
  data() {
    return {
      newHelp: false,
    };
  },
  async beforeCreate() {
    await !this.$store.dispatch('user/getCurrentUser');
  },
  methods: {
    async listHelp() {
      await this.$store.dispatch('help/listHelp');
    },
  },
  created() {
    this.listHelp();
  },
};
</script>
<style lang="scss" scoped>
.VueCarousel {
  max-width: 600px;
  margin: 0 auto;
  &-slide {
    margin: 30px 6px;
  }
}
</style>
