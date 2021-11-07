<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <v-card>
      <grafico :dados-grafico="dadosGrafico"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white green--text" depressed @click="confirmar">confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import grafico from './Grafico'
import {mapState} from 'vuex'

export default {
  name: 'ModalGrafico',
  components: {grafico},
  data: () => ({
    nome: '',
    dadosGrafico: []
  }),
  props: {
    dialog: {
      required: true
    }
  },
  computed: {
    ...mapState(['usuarios'])
  },
  watch: {
    'usuarios'() {
      console.log(this.usuarios)
      this.formatarUsuarios()
      console.log(this.dadosGrafico)
    }
  },
  methods: {
    formatarUsuarios() {
      this.dadosGrafico = []
      this.usuarios.forEach(usuario => {
        if (usuario.carta === '') {
          usuario.carta = '?'
        }
        if (this.dadosGrafico.length === 0) {
          this.dadosGrafico.push({
            name: usuario.carta,
            value: 1
          })
        } else {
          for (const dados of this.dadosGrafico) {
            if (dados.name === usuario.carta) {
              dados.value++
              break
            }
            let result = this.dadosGrafico.find(value => value.name === usuario.carta)
            if (dados.name !== usuario.carta && (result === undefined || result === null)) {
              this.dadosGrafico.push({
                name: usuario.carta,
                value: 1
              })
              break
            }
          }
        }
      })
    },
    confirmar() {
      this.$emit('confirmar')
    }
  }
}
</script>
