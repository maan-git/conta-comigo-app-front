<template>
    <v-container>
        <div>
            <div>
                <div class="help-card--header__avatar">
                    <img />
                </div>
                <div>
                    <label>Luis Mauro</label>
                    <span>Pagar Contas na Lotérias</span>
                </div>
                <div>
                    <span>23/11</span>
                    <span>18m</span>
                </div>
            </div>
            <div>
                <ButtonRouter
                    url='/create-help'
                    text='Conta Comigo'
                    heart=$heart>
                </ButtonRouter>
            </div>
        </div>
    </v-container>
</template>

<script>
import ButtonRouter from '@/components/ButtonRouter.vue';

export default {
  name: 'ListItensCard',
  components: {
    ButtonRouter,
  },
};
</script>
<style scoped>

</style>
