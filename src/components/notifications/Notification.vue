<template>
  <v-snackbar v-model="show" :timeout="0">
    {{notification.description}}
    <v-btn text color="accent"
      @click.native="$emit('onClose',
      notification)">
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>

export default {
  props: ['notification'],
  events: ['onClose'],
  name: 'Notification',
  components: {},
  // computed: mapState(['notification']),
  methods: {
    show() {
      return this.notification !== null;
    },
    input(value) {
      console.log(value);
    },
  },
};

</script>
