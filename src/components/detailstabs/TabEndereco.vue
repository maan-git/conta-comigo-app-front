<template>
  <div>
    <v-form>
      <v-row justify="end" class="mb-0 pa-4">
        <v-switch
          color="primary"
          v-model="edit"
          label="Editar"
        />
      </v-row>
      <v-row class="mb-0">
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="Cep"
            v-mask="cepMask"
            :rules="[$vln.requiredRule('Cep')]"
            required
            v-model="cep"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="!edit"
            outlined
            label="Endereço"
            :rules="[$vln.requiredRule('Endereço')]"
            required
            v-model="endereco"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="(bairros.length <= 1)"
            item-value="id"
            item-text="description"
            :items="bairros"
            v-model="bairro"
            outlined
            menu-props="auto"
            label="Bairro"
            :rules="[$vln.requiredRule('Bairro')]"
            required
          ></v-text-field>
        </v-col>
        <v-col :cols="12" class="py-0">
          <v-text-field
            :readonly="true"
            outlined
            label="Cidade"
            :rules="[$vln.requiredRule('Cidade')]"
            required
            v-model="cidade"
          ></v-text-field>
        </v-col>
        <v-col class="py-0">
          <v-text-field
            :readonly="true"
            outlined
            label="Estado"
            :rules="[$vln.requiredRule('Estado')]"
            required
            v-model="estado"
          ></v-text-field>
        </v-col>
      </v-row>
      <p v-if="user.userError"
       class="block text-center mt-4 red--text">{{user.userError}}</p>
      <v-row justify="end" class="px-5" v-if="edit">
        <v-btn
          large
          color="primary"
          rounded
          :loading="user.userLoading"
          @click="updateData"
        >Salvar</v-btn>
      </v-row>
      <p v-if="user.userError"
       class="block text-center mt-4 red--text">{{user.userError}}</p>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'TabPessoal',
  components: {},
  computed: mapState(['user', 'register']),
  watch: {
    cep(cep) {
      if (cep.length === 9) {
        this.$store.dispatch('register/findByZip', cep);
      }
    },
  },
  methods: {
    resetData() {
      this.edit = false;
    },
    updateData() {
      if (this.$refs.pessoalform.validate()) {
        console.log('validated');
      }
    },
  },
  data() {
    return {
      cep: '',
      cepMask: '#####-###',
      endereco: '',
      bairro: '',
      bairros: [],
      cidade: '',
      estado: '',
      edit: false,
    };
  },
  created() {
    // this.$store.dispatch('user/getUserDetails');
    this.cep = this.user.user.addresses[0].zip_code;
    // this.endereco = this.user.user.addresses[0].address;
    // this.bairros = [this.user.user.addresses[0].neighborhood];
    // this.bairro = this.user.user.addresses[0].neighborhood.description;
    // this.bairros = [this.user.user.addresses[0].neighborhood];
    // this.cidade = this.user.user.addresses[0].city.description;
    // this.estado = this.user.user.addresses[0].state.description;

    this.$store.watch(
      (state) => state.register,
      (val) => {
        if (this.endereco !== val.endereco) this.endereco = val.endereco;
        if (this.bairros !== val.bairros) {
          this.bairros = val.bairros;
          console.log('this.bairros', this.bairros);
          if (this.bairros.length === 1) {
            this.bairro = this.bairros[0].description;
          } else this.bairros = '';
        }
        if (this.cidade !== val.cidade) this.cidade = val.cidade;
        if (this.estado !== val.estado) this.estado = val.estado;
      }, { deep: true },
    );
  },
};
</script>
