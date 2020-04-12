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
      newHelp: true,
    };
  },
  methods: {
    async listHelp() {
      await this.$store.dispatch('help/getHelp');
    },
  },
};
</script>
