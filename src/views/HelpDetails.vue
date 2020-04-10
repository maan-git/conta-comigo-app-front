<template>
  <v-container>
    <HelpForm :newHelp="newHelp"></HelpForm>
  </v-container>
</template>
<script>
import HelpForm from '@/components/HelpForm.vue';

export default {
  components: {
    HelpForm,
  },
  data() {
    return {
      newHelp: false,
      id: this.id,
    };
  },
  created() {
    console.log('Help here!');
    this.id = this.$route.query.id;
  },
};
</script>
