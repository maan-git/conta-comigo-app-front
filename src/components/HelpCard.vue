<template>
  <div class="help-card">
    <div class="help-card--header">
      <div class="help-card--header__avatar">
        <v-img width="46" height="46" :src="require('../assets/logo.png')"></v-img>
      </div>
      <div class="help-card--header__text">
        <p>
          {{createdat}}<br>{{timeago}}
        </p>
      </div>
    </div>
    <div class="help-card--content">
      <p class="help-card--content__title">{{name}}, {{age}}</p>
      <p class="help-card--content__text">{{mydescription}}</p>
    </div>
    <div class="help-card--footer">
    <v-btn
      :to="getUrl()"
      block
      rounded
      color="primary">Conta Comigo
      <v-icon right dark>$heart</v-icon>
    </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id', 'description', 'name', 'age', 'createdat'],
  data() {
    return {
      timeago: 'há 10 minutos',
      mydescription: '',
      myimg: '../assets/icone.svg',
    };
  },
  methods: {
    getUrl() {
      return `/help-details?id=${this.id}`;
    },
  },
  created() {
    if (this.description.length > 120) {
      this.mydescription = `${this.description.substr(0, 120)}...`;
    } else {
      this.mydescription = this.description;
    }
  },
};
</script>
<style lang="scss" scoped>
.help-card {
  max-width: 200px;
  min-height: 216px;
  height: 100%;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0px 0px 3px 0 rgba(0, 0, 0, 0.16);
  $quadsize: 46px;
  $txtcolor: #5f5f5f;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  // margin: 10px 30px;

  &--header {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__avatar {
      width: $quadsize;
      height: $quadsize;
      border-radius: 100%;
      overflow: hidden;
      background-color: #532594;
    }
    &__text{
      color: $txtcolor;
      font-size: 12px;
      text-align: right;
      font-weight: 500;
      p {
        margin-bottom: 0;
      }
    }
  }
  &--content {
    color: $txtcolor;
    font-size: 12px;
    text-align: left;
    &__title {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
