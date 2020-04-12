<template>
  <v-container class="text-center">
    <p class="title font-weight-medium primary--text text-left">Pedidos recentes</p>
    <div v-if="help.helpList">
      <Carousel
        :loop="true"
        :scrollPerPage="true"
        :paginationEnabled="false"
        :perPageCustom="[[320, 1], [600, 2], [768, 3]]"
        :paginationActiveColor="'#532594'"
        :spacePadding="20"
        :spacePaddingMaxOffsetFactor="1"
        >
        <Slide  v-for="(help) in help.helpList" :key="help.id_user">
          <HelpCard
            :avatar="help.request_user.avatar"
            :id="help.id"
            :name="help.request_user.first_name"
            :age="$filters.calcAge(help.created)"
            :createdat="$filters.formatDate(help.created)"
            :description="help.category.description"
          />
        </Slide>
      </Carousel>
      <v-btn text color="primary">Ver todos</v-btn>
    </div>
    <p
      v-if="help.helpCategoryError"
      class="block text-center mt-4 red--text">{{help.helpListError}}</p>
    <v-btn
      v-if="help.helpListLoading"
      text block x-large
      :loading="true" color="primary"></v-btn>
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
  methods: {
    async listHelp() {
      await this.$store.dispatch('help/getHelp');
    },
  },
  created() {
    this.listHelp();
  },
};
</script>
<style lang="scss" scoped>
.VueCarousel {
  max-width: 700px;
  margin: 0 auto;
  &-slide {
    margin: 10px 0px;
  }
}
</style>
