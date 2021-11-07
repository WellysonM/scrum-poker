<template>
  <div>
    <v-snackbar
        v-model="notificacao.mostrar"
        :color="notificacao.cor"
        :right="right"
        :top="top"
        dark>
      <div style="display: flex; text-align: center">
        <v-icon
            class="mr-3"
            color="white">
          mdi-bell-plus
        </v-icon>
        <div class="mt-1">{{ notificacao.mensagem }}</div>
      </div>
      <!--      <v-icon-->
      <!--          @click="notificacao.mostrar = false"-->
      <!--          size="16">-->
      <!--        mdi-close-circle-->
      <!--      </v-icon>-->
    </v-snackbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'notifications',
  data: () => ({
    top: true,
    right: true,
  }),
  computed: {
    ...mapState(['notificacao'])
  }
}
</script>
