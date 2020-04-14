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
          <v-row>
            <v-col cols="3" class="text-center">
              <v-btn
                fab
                color="primary"
                @click="dialog = true"
              ></v-btn>
              <p class="mt-1 mb-0 text-center primary--text">Editar</p>
            </v-col>
            <v-col class=" d-flex justify-start align-center">
              <p class="secondary--text">Adicione uma foto para o seu perfil</p>
            </v-col>
          </v-row>
          <v-form ref="steponedata" class="mt-3">
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Nome"
              :rules="[$vln.requiredRule('Nome'), $vln.moreThanRule(2)]"
              required
              v-model="nome"
            ></v-text-field>
            <v-text-field
              :disabled="disapleForm()"
              outlined
              label="Sobrenome"
              :rules="[$vln.requiredRule('Nome'), $vln.moreThanRule(2)]"
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
                v-model="lieAceito"
                :rules="[$vln.requiredRule('Ler o contrato')]"
                label="Li e aceito os termos de uso do Conta Comigo app"
              ></v-checkbox>
            <v-btn
              block
              rounded
              x-large
              color="primary"
              @click="stepTwoClick()"
              :loading="register.createUserLoading">Próximo</v-btn>
            <p v-if="register.createUserError" class="block text-center mb-0 mt-4 red--text">
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
              :loading="register.createUserLoading">Registrar-se</v-btn>
            <p v-if="register.createUserError" class="block text-center mb-0 mt-4 red--text">
              {{register.createUserError}}
            </p>

          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog v-model="dialog" max-width="520">
      <v-card max-width="520" raised>
        <v-card-title class="headline primary--text">
          Use Google's location service?</v-card-title>
        <v-card-text>
          <v-file-input
            v-model="selectedFile"
            accept="image/png, image/jpeg"
            label="File"
            placeholder="Select a file"
            outlined
            :show-size="1024"
            class="my-4"
            @change="setupCropper"
          ></v-file-input>
          <v-row v-if="objectUrl">
            <v-col cols="12" sm="6" class="text-center">
              <div class="overline">Original</div>
              <div class="image-container elevation-4">
                <img class="image-preview" ref="source" :src="objectUrl">
              </div>
              <div class="d-flex justify-center">
                <v-btn icon small @click="resetCropper">
                  <v-icon small>mdi-aspect-ratio</v-icon>
                </v-btn>
                <div class="mx-2">
                  <v-btn icon small @click="rotateLeft">
                    <v-icon small>mdi-rotate-left</v-icon>
                  </v-btn>
                  <v-btn icon small @click="rotateRight">
                    <v-icon small>mdi-rotate-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="text-center">
              <div class="overline">Preview</div>
              <div class="image-container elevation-4">
                <img class="image-preview" :src="previewCropped">
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary"
            :disabled="!objectUrl"
            @click="dialog = false"
          >
            <span>Submit</span>
            <!-- <v-icon small>$heart</v-icon> -->
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Cropper from 'cropperjs';
import debounce from 'lodash/debounce';
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
    email(email) {
      if (email) {
        this.email = email.toLowerCase();
      }
    },
  },
  data() {
    return {
      cropper: null,
      objectUrl: null,
      previewCropped: null,
      selectedFile: null,
      debouncedUpdatePreview: debounce(this.updatePreview, 257),

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
      dialog: false,
    };
  },
  methods: {
    stepOneClick() {
      if (this.$refs.steponedata.validate()) {
        this.$store.dispatch('register/registerStep1', {
          nome: this.nome,
          sobrenome: this.sobrenome,
          cpf: this.cpf,
          datanascimento: this.datanascimento,
          telefone: this.telefone,
          whatsapp: this.whatsapp,
          moraso: this.moraso,
          grupoderisco: this.grupoderisco,
        });
      }
    },
    stepTwoClick() {
      if (this.$refs.steptwodata.validate()) {
        this.$store.dispatch('register/registerStep2', {
          email: this.email,
          password: this.password,
          lieAceito: this.lieAceito,
        });
      }
    },
    stepThreeClick() {
      if (this.$refs.stepthreedata.validate()) {
        const data = {
          neighborhood_id: this.bairro,
          address: this.endereco,
          zip: this.cep.replace(/-/g, ''),
        };
        this.$store.dispatch('register/registerStep3', data);
      }
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

    setupCropper(selectedFile) {
      if (this.cropper) {
        this.cropper.destroy();
      }

      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl);
      }

      if (!selectedFile) {
        this.cropper = null;
        this.objectUrl = null;
        this.previewCropped = null;
        return;
      }

      this.objectUrl = window.URL.createObjectURL(selectedFile);
      this.$nextTick(this.setupCropperInstance);
    },
    setupCropperInstance() {
      this.cropper = new Cropper(this.$refs.source, {
        aspectRatio: 1,
        crop: this.debouncedUpdatePreview,
      });
    },
    updatePreview() {
      const canvas = this.cropper.getCroppedCanvas();
      this.previewCropped = canvas.toDataURL('image/png');
    },
    resetCropper() {
      this.cropper.reset();
    },
    rotateLeft() {
      this.cropper.rotate(-90);
    },
    rotateRight() {
      this.cropper.rotate(90);
    },
  },
  created() {
    this.nome = this.register.nome ? this.register.nome : '';
    this.sobrenome = this.register.sobrenome ? this.register.sobrenome : '';
    this.email = this.register.email ? this.register.email : '';
    this.cpf = this.register.cpf ? this.register.cpf : '';
    this.datanascimento = this.register.datanascimento ? this.register.datanascimento : '';
    this.telefone = this.register.telefone ? this.register.telefone : '';
    this.whatsapp = this.register.whatsapp;
    this.moraso = this.register.moraso;
    this.grupoderisco = this.register.grupoderisco;
    this.cep = this.register.cep ? this.register.cep : '';
    this.endereco = this.register.endereco ? this.register.endereco : '';
    this.bairro = this.register.bairro ? this.register.bairro : '';
    this.cidade = this.register.cidade ? this.register.cidade : '';
    this.estado = this.register.estado ? this.register.estado : '';
    this.lieAceito = this.register.lieAceito;
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

.image-container {
  display: inline-block;
}

.image-preview {
  display: block;
  max-height: 229px;
  max-width: 100%;
}
</style>
<style lang="scss">
  @import './../../node_modules/cropperjs/dist/cropper.css';
</style>
