<template>
  <CardContainer :hideLogo="true">
    <v-form class="ma-5" ref="requestform">
      <p class="primary--text font-weight-medium headline">
        {{newHelp ? "Cadastrar Ajuda" : " Visualizar Ajuda"}}
      </p>
      <p class="subtitle-1 mb-5 mt-1">
        {{newHelp ? "Selecione o tipo de ajuda e uma breve descrição do"
        +"que você precisa e logo um voluntário irá oferecer ajuda." : ""}}
      </p>
      <v-chip
        class="ma-2"
        color="primary"
        href="#"
        :active="!newHelp"
        label
      >
        <v-icon left>mdi-account-circle-outline</v-icon>
        {{ id_user }}
      </v-chip>
      <v-select
        item-text="description"
        item-value="id"
        :items="help.helpCategory"
        label="Selecione a Categoria"
        v-model="requestCategory"
        outlined
        required
        :rules="[$vln.requiredRule('Selecionar a categoria')]"
        :disabled = "!newHelp"
      ></v-select>
      <v-textarea
        outlined
        v-model="requestDescription"
        label="Descrição"
        :disabled = "!newHelp"
        :rules="[$vln.requiredRule('Descrição'), $vln.moreThanRule(20)]"
        required
      ></v-textarea>
      <v-btn
        rounded
        v-if="newHelp"
        class="mt-5"
        block
        @click="requestHelpSave()"
        color="primary" x-large>Salvar</v-btn>
      <v-btn
        rounded
        v-if="!newHelp"
        class="mt-5"
        block
        @click="requestHelpSave()"
        color="primary"
        x-large>Editar</v-btn>
      <v-btn rounded v-if="!newHelp" class="mt-5" block outlined color="red" x-large>
        <v-icon dark>mdi-heart
      </v-icon>Conta Comigo!</v-btn>
    </v-form>
  </CardContainer>
</template>

<style lang="scss" scoped>
.subtitle-1{
  line-height: 1.2rem;
  color: #5f5f5f;
}
</style>

<script>
import { mapState } from 'vuex';
import CardContainer from '@/components/CardContainer.vue';

export default {
  computed: mapState(['help']),
  components: {
    CardContainer,
  },
  props: ['newHelp', 'id_user', 'description', 'category', 'id_help'],
  data() {
    return {
      requestDescription: '',
      requestCategory: '',
    };
  },
  methods: {
    requestHelpSave() {
      if (this.$refs.requestform.validate()) {
        this.$store.dispatch('help/requestHelpSave', {
          category: this.requestCategory,
          description: this.requestDescription,
        });
      }
    },
  },
  created() {
    if ((this.description) && (this.category)) {
      this.requestDescription = this.description;
      this.requestCategory = this.category;
    }
    this.$store.dispatch('help/getHelpCategory');
  },
};
</script>
