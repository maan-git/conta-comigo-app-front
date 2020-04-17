<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card flat>
          <v-card-text>{{ item.content }}<ListItensCard /></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import ListItensCard from '@/components/ListItensCard.vue';

export default {
  name: 'ListHelpExtended',
  components: {
    ListItensCard,
  },
  data: () => ({
    item: [
      {
        tab: 'teste 1',
        content: ['teste content'],
      },
      {
        tab: 'teste 2',
        content: ['teste content 2'],
      },
    ],
  }),
};
</script>
