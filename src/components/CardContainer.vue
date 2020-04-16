<template>
  <div class="card-container" :class="{'justify-space-between': $vuetify.breakpoint.xs}">
    <div v-if="!hideLogo" class="card-container__img text-center my-5">
      <div class="back-to" v-if="backTo">
        <v-btn :to="backTo" x-large icon color="white">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <img width="178" :src="require('../assets/logo_completa.svg')">
    </div>
    <div class="card-container__card" :class="{'mt-5' : hideLogo}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardContainer',
  props: ['hideLogo', 'backTo'],
};
</script>
<style lang="scss" scoped>
  .card-container {
    width:100%;
    max-width:500px;
    margin: 0 auto;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__card {
      background-color: white;
      border-radius: 54px;
      padding: 20px;
      max-width: 800px;
      margin-bottom: 100px;
    }
    &__img {
      position: relative;
      width: 100%;
      .back-to {
        position: absolute;
        left: 10px;
        bottom: 0;
      }
      img {
        margin: 0 auto;
      }
    }
    @media screen and ( max-width: 600px) {
      .card-container {
        &__img {
          height: 100%;
          display: flex;
        }
        &__card {
          align-self: stretch;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          margin-bottom: 0;
        }
      }
    }
  }
</style>
