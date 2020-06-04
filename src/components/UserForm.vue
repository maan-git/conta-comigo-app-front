<template>
  <div>
    <StepperHeader :currenctStep="register.step"
      :steps="[
        { label: 'Dados pessoais' },
        { label: 'Endereço' },
        { label: 'Dados da conta' },
        ]"
      v-on:changeStep="changeStep"
    />
    <v-stepper alt-labels v-model="register.step">
      <v-stepper-items>
        <v-stepper-content class="px-0" step="1">
          <DadosPessoais ref="pessoais" v-on:openDialog="$refs.dialog.open()"/>
        </v-stepper-content>
        <v-stepper-content class="px-0" step="2">
          <Endereco ref="endereco" />
        </v-stepper-content>
        <v-stepper-content class="px-0" step="3">
          <DadosConta  ref="conta"/>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <CropDialog ref="dialog"/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DadosPessoais from './steps/DadosPessoais.vue';
import DadosConta from './steps/DadosConta.vue';
import Endereco from './steps/Endereco.vue';
import StepperHeader from './StepperHeader.vue';
import CropDialog from './CropDialog.vue';

export default {
  props: ['editavel'],
  components: {
    StepperHeader,
    DadosPessoais,
    DadosConta,
    Endereco,
    CropDialog,
  },
  computed: mapState(['register']),
  data() {
    return { };
  },
  methods: {
    disapleForm() {
      return this.editavel && !this.register.loginLoading;
    },
    changeStep(step) {
      if (step === 2) {
        this.$refs.pessoais.sendFormData();
      } else if (step === 3) {
        this.$refs.endereco.sendFormData();
      }
      this.$store.dispatch('register/setStep', step);
    },
    onInput(val) {
      // eslint-disable-next-line radix
      this.steps = parseInt(val);
    },
  },
  created() { },
};
</script>
<style lang="scss" scoped>
.v-stepper{
  box-shadow: none;
  &__header{
    box-shadow: none;
  }
  &__step {
    flex-basis: 0;
  }
  &__label {
    display: flex;
  }
}
</style>
