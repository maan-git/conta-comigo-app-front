<template>
  <div>
    <v-form ref="enderecoform" class="mt-3">
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
        outlined
        label="Cep"
        v-mask="cepMask"
        :rules="[$vln.requiredRule('Cep')]"
        required
        v-model="cep"
      ></v-text-field>
      <v-text-field
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
        @click="sendFormData()"
        :loading="register.createUserLoading">Registrar-se</v-btn>
      <p v-if="register.createUserError" class="block text-center mb-0 mt-4 red--text">
        {{register.createUserError}}
      </p>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['register']),
  watch: {
    cep(cep) {
      if (cep.length === 9) {
        this.$store.dispatch('register/findByZip', cep);
      }
    },
  },
  data() {
    return {
      cep: '',
      cepMask: '#####-###',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
    };
  },
  methods: {
    formValidation() {
      return this.$refs.enderecoform.validate();
    },
    sendFormData() {
      if (this.$refs.enderecoform.validate()) {
        const data = {
          neighborhood_id: this.bairro,
          address: this.endereco,
          zip: this.cep.replace(/-/g, ''),
        };
        this.$store.dispatch('register/registerStep3', data);
      }
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
