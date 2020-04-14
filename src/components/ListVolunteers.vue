<template>
  <v-container class="list-volunteers text-center">
    <p class="title font-weight-medium primary--text text-left">Voluntarios</p>

    <div v-if="user.users">
      <Carousel
        :loop="true"
        :scrollPerPage="true"
        :paginationEnabled="false"
        :perPageCustom="[[320, 3], [600, 6], [800, 8]]"
        :paginationActiveColor="'#532594'"
        :spacePadding="20"
        :spacePaddingMaxOffsetFactor="1"
      >
        <Slide v-for="(user, i) in user.users" :key="i">
          <div class="volunteer" @click="volunteerDetails(user.id)">
            <div class="volunteer__img">
              <v-img width="60" height="60" :src="user.avatar"></v-img>
            </div>
            <span>{{user.first_name}}</span>
          </div>
        </Slide>
      </Carousel>
      <ButtonRouter
        url='/create-help'
        text='Preciso de ajuda!'
        heart=$heart>
      </ButtonRouter>
    </div>
    <!-- <p
      v-if="user && user.usersError"
      class="block text-center mt-4 red--text">{{help.usersError}}</p> -->
    <v-btn
      v-if="user.usersLoginLoading"
      text block x-large
      :loading="true" color="primary"></v-btn>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import ButtonRouter from '@/components/ButtonRouter.vue';

export default {
  components: {
    Carousel,
    Slide,
    ButtonRouter,
  },
  computed: mapState(['user']),
  methods: {
    volunteerDetails(id) {
      this.$router.push(`/volunteer-details?id=${id}`);
    },
  },
  created() {
    this.$store.dispatch('user/getUsers', 'limit=10');
  },
};
</script>
<style lang="scss" scoped>
.volunteer {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &__img {
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 100%;
    background-color: #532594;
  }
  span {
    margin-top: 15px;
    font-size: 14px;
    color: #5f5f5f;
    transition: all .5s ease-in-out;
  }
  &:hover {
    span {
      color: #532594;
    }
  }
}
</style>
