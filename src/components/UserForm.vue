<template>
  <div>
    <StepperHeader :currenctStep="register.step"
      :steps="[
        { label: 'Dados pessoais' },
        { label: 'Dados da conta' },
        { label: 'Endereço' },
        ]"
    />
    <v-stepper alt-labels v-model="register.step">
      <v-stepper-items>
        <v-stepper-content class="px-0" step="1">
          <!-- TODO imagem -->
          <v-form ref="steponedata" class="mt-3">
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Nome"
              :rules="[$vln.requiredRule('Nome'), $vln.moreThanRule(6)]"
              required
              v-model="nome"
            ></v-text-field>
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Sobrenome"
              :rules="[$vln.requiredRule('Nome'), $vln.moreThanRule(6)]"
              required
              v-model="sobrenome"
            ></v-text-field>
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="CPF"
              required
              v-model="cpf"
              v-mask="cpfMask"
              :rules="[$vln.requiredRule('CPF'), $vln.cpflRule()]"
            ></v-text-field>
            <!-- date picker -->
            <v-menu
              ref="dpnascimento"
              v-model="datanascimentomenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :disabled="disapleForm()"
                  v-model="datanascimento"
                  label="Data de nascimento"
                  readonly
                  v-on="on"
                  clearable
                  outlined
                  :rules="[$vln.requiredRule('Data de nascimento')]"
                  @click:clear="datanascimento = null"
                >{{register.datanascimento}}</v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="datanascimento"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveDate"
              ></v-date-picker>
            </v-menu>
            <!-- date picker -->
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Telefone para contato"
              required
              v-model="telefone"
              v-mask="'(##) #####-####'"
              :rules="[$vln.requiredRule('Telefone'),$vln.foneRule(11)]"
            >{{register.telefone}}</v-text-field>
            <span class="mb-0 grey--text text--darken-2">O número informado tem Whatsapp?</span>
            <v-switch
            :disabled="disapleForm()"
            v-model="whatsapp"
            class="ma-4" :label="whatsapp ? 'Sim' : 'Não'"></v-switch>

            <v-row justify="space-around">
              <v-col>
                <span class="mb-0 grey--text text--darken-2">Mora sozinho?</span>
                <v-switch
                :disabled="disapleForm()"
                v-model="moraso"
                class="ma-4" :label="moraso ? 'Sim' : 'Não'"></v-switch>
              </v-col>
              <v-col>
                <span class="mb-0 grey--text text--darken-2">É grupo de risco?</span>
                <v-switch
                  :disabled="disapleForm()"
                  v-model="grupoderisco"
                  class="ma-4"
                  :label="grupoderisco ? 'Sim' : 'Não'"></v-switch>
              </v-col>
            </v-row>
            <v-btn
              block
              rounded
              x-large
              color="primary"
              @click="stepOneClick()"
              :loading="register.loginLoading">Próximo</v-btn>
          </v-form>
        </v-stepper-content>
        <v-stepper-content class="px-0" step="2">
          <v-form ref="steptwodata" class="mt-3">
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Email"
              required
              :rules="[$vln.requiredRule('E-mail'), $vln.emailRule()]"
              v-model="email"
              ></v-text-field>
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Senha"
              required
              type="password"
              :rules="[$vln.requiredRule('Senha'), $vln.moreThanRule(6)]"
              v-model="password"
              ></v-text-field>
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Repetir Senha"
              required
              type="password"
              :rules="[$vln.requiredRule('Repitir Senha'), $vln.mustBeEqualPass(password),]"
              v-model="repassword"
              ></v-text-field>
              <v-checkbox
                :disabled="disapleForm()"
                v-model="checkbox"
                :rules="[$vln.requiredRule('Ler o contrato')]"
                label="Li e aceito os termos de uso do Conta Comigo app"
              ></v-checkbox>
            <v-btn
              block
              rounded
              x-large
              color="primary"
              @click="stepTwoClick()"
              :loading="register.createUserLoading">Registrar-se</v-btn>
            <p v-if="register.createUserError" class="block text-center mt-4 red--text">
              {{register.createUserError}}
            </p>
          </v-form>
        </v-stepper-content>
        <v-stepper-content class="px-0" step="3">
          <v-form ref="stepthreedata" class="mt-3">
            <!-- <vuetify-google-autocomplete
              :country="['br']"
              id="map"
              outlined
              placeholder=""
              label="Endereço"
              :rules="[$vln.requiredRule('Endereço')]"
              v-on:placechanged="getAddressData"
            ></vuetify-google-autocomplete> -->
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Cep"
              v-mask="cepMask"
              :rules="[$vln.requiredRule('Cep')]"
              required
              v-model="cep"
            ></v-text-field>
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Endereço"
              :rules="[$vln.requiredRule('Endereço')]"
              required
              v-model="endereco"
            ></v-text-field>
            <v-select
              item-value="id"
              item-text="description"
              :items="register.bairros"
              v-model="bairro"
              :readonly="register.bairros.length <= 1"
              outlined
              menu-props="auto"
              label="Bairro"
              :rules="[$vln.requiredRule('Bairro')]"
              required
            ></v-select>

            <!-- <v-text-field
              outlined
              :disabled="true"
              label="Bairro"
              :rules="[$vln.requiredRule('Bairro')]"
              required
              v-model="bairro"
            ></v-text-field> -->
            <v-text-field
              :readonly="true"
              outlined
              label="Cidade"
              :rules="[$vln.requiredRule('Cidade')]"
              required
              v-model="cidade"
            ></v-text-field>
            <v-text-field
              :readonly="true"
              outlined
              label="Estado"
              :rules="[$vln.requiredRule('Estado')]"
              required
              v-model="estado"
            ></v-text-field>
            <v-btn
              block
              rounded
              x-large
              color="primary"
              @click="stepThreeClick()"
              :loading="register.addressLoading">Próximo</v-btn>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import StepperHeader from './StepperHeader.vue';

export default {
  props: ['editavel'],
  components: { StepperHeader },
  computed: mapState(['register']),
  watch: {
    datanascimentomenu(val) {
      // eslint-disable-next-line no-unused-expressions
      val && setTimeout(() => {
        this.$refs.picker.activePicker = 'YEAR';
      });
    },
    cep(cep) {
      if (cep.length === 9) {
        this.$store.dispatch('register/findByZip', cep);
      }
    },
  },
  data() {
    return {
      nome: '',
      sobrenome: '',
      cpf: '',
      cpfMask: '###.###.###-##',
      datanascimento: null,
      datanascimentomenu: false,
      telefone: '',
      whatsapp: false,
      moraso: false,
      grupoderisco: false,

      cep: '',
      cepMask: '#####-###',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',

      username: '',
      email: '',
      password: '',
      repassword: '',
      checkbox: false,
    };
  },
  methods: {
    stepOneClick() {
      // if (this.$refs.steponedata.validate()) {
      //   this.$store.dispatch('register/registerStep1', {
      //     nome: this.nome,
      //     sobrenome: this.sobrenome,
      //     cpf: this.cpf,
      //     datanascimento: this.datanascimento,
      //     telefone: this.telefone,
      //     whatsapp: this.whatsapp,
      //     moraso: this.moraso,
      //     grupoderisco: this.grupoderisco,
      //   });
      // }
      this.$store.dispatch('register/setStep', 2);
    },
    stepTwoClick() {
      // if (this.$refs.steptwodata.validate()) {
      //   this.$store.dispatch('register/registerStep2', {
      //     cep: this.cep,
      //     endereco: this.endereco,
      //     bairro: this.bairro,
      //     cidade: this.cidade,
      //     estado: this.estado,
      //   });
      // }
      this.$store.dispatch('register/setStep', 3);
    },
    stepThreeClick() {
      // if (this.$refs.stepthreedata.validate()) {
      //   const data = {
      //     is_superuser: false,
      //     password: this.password,
      //     email: this.email,
      //     first_name: this.nome,
      //     last_name: this.sobrenome,
      //   };
      //   console.log('enviando data: ', data);
      //   this.$store.dispatch('register/createAccount', data);
      // }
      this.$store.dispatch('register/setStep', 1);
    },

    saveDate(date) {
      const mdate = new Date(date);
      const dia = mdate.getDay() < 0 ? `0${mdate.getDay()}` : mdate.getDay();
      const mes = (mdate.getMonth() + 1) < 0 ? `0${(mdate.getMonth() + 1)}` : (mdate.getMonth() + 1);
      this.$refs.dpnascimento.save(`${dia}-${mes}-${mdate.getFullYear()}`);
    },
    disapleForm() {
      return this.editavel && !this.register.loginLoading;
    },

    onInput(val) {
      // eslint-disable-next-line radix
      this.steps = parseInt(val);
    },

    getAddressData(map) {
      console.log('google places', map);
      // if (map.postal_code) this.cep = map.postal_code;
      // if (map.administrative_area_level_2) this.cidade = map.administrative_area_level_2;
      // if (map.administrative_area_level_1) this.estado = map.administrative_area_level_1;
      // if (map.name) this.endereco = map.name;
    },
  },
  created() {
    this.nome = this.register.nome ? this.register.nome : '';
    this.sobrenome = this.register.sobrenome ? this.register.sobrenome : '';
    this.cpf = this.register.cpf ? this.register.cpf : '';
    this.datanascimento = this.register.datanascimento ? this.register.datanascimento : '';
    this.telefone = this.register.telefone ? this.register.telefone : '';
    this.whatsapp = this.register.whatsapp ? this.register.whatsapp : '';
    this.moraso = this.register.moraso ? this.register.moraso : '';
    this.grupoderisco = this.register.grupoderisco ? this.register.grupoderisco : '';
    this.cep = this.register.cep ? this.register.cep : '';
    this.endereco = this.register.endereco ? this.register.endereco : '';
    this.bairro = this.register.bairro ? this.register.bairro : '';
    this.cidade = this.register.cidade ? this.register.cidade : '';
    this.estado = this.register.estado ? this.register.estado : '';
    this.$store.watch(
      (state) => state.register,
      (val) => {
        if (this.endereco !== val.endereco) this.endereco = val.endereco;
        if (this.bairros !== val.bairros) this.bairro = val.bairro;
        if (this.cidade !== val.cidade) this.cidade = val.cidade;
        if (this.estado !== val.estado) this.estado = val.estado;
      }, { deep: true },
    );
  },

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
