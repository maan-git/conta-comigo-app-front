<template>
  <v-container>
    <HelpForm :newHelp="newHelp"></HelpForm>
  </v-container>
</template>
<script>
import HelpForm from '@/components/HelpForm.vue';
import { mapState } from 'vuex';


export default {
  components: {
    HelpForm,
  },
  computed: mapState(['help']),
  data() {
    return {
      newHelp: false,
      id_help: this.id,
    };
  },
  created() {
    console.log('Help here!');
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
  },
};
</script>
