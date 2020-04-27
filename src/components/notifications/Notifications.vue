<template>
  <span v-if="show()">
    <v-snackbar v-model="notification" :timeout="0" top>
      {{notification.description}}
      <v-btn text color="accent"
        @click.native="removeNotification">
        Fechar
      </v-btn>
    </v-snackbar>
  </span>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Notifications',
  computed: mapGetters('notification', {
    notification: 'getVisibleNotification',
  }),
  methods: {
    show() {
      return this.notification !== null;
    },
    ...mapActions('notification', [
      'removeNotification',
    ]),
  },
};
</script>
