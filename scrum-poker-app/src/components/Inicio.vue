<template>
  <div class="background">>
    <div style="margin-top: 40px;">
      <v-btn
          :color="'white'"
          class="ma-2"
          outlined
          @click="mostrarCartas">
        Mostrar Cartas
      </v-btn>
      <v-btn
          :color="'white'"
          class="ma-2"
          outlined
          @click="abrirModalGrafico">
        Mostrar Gráfico
      </v-btn>
    </div>
    <v-container fluid style="margin-top: 2vw">
      <v-layout justify-space-around wrap>
        <v-flex v-for="usuario in usuarios" :key="usuario.id" :class="cartaCss" class="mx-2 card" lg1 md2 py-6>
          <v-card :class="cartaCss === 'flip' ? 'front' : 'back'" class="mx-auto face"
                  color="#3993ff"
                  dark max-height="170"
                  max-width="120" min-height="170"
                  min-width="120" outlined>
            <v-card-text class="text-body-1 font-weight-bold">
              {{ usuario.nome }}
            </v-card-text>
            <v-card-text v-if="cartaCss === 'flip'" class="text-h2 font-weight-bold">
              {{ usuario.carta ? usuario.carta : '?' }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-item-group style="position: absolute; bottom: 5%">
      <v-container>
        <v-row>
          <v-col
              v-for="carta in tamanhos"
              :key="carta">
            <v-item v-slot="{ active, toggle }">
              <v-card
                  :color="active ? '#4caf50' : 'info'"
                  class="d-flex align-center"
                  dark
                  max-height="80"
                  max-width="70" min-height="80"
                  min-width="70" @click="toggle"
                  v-on:click="selecionarCarta(carta)">
                <v-scroll-y-transition>
                  <div
                      v-if="active"
                      class="text-h3 flex-grow-1 text-center">
                    {{ carta.valor }}
                  </div>
                  <div
                      v-else
                      class="text-h3 flex-grow-1 text-center">
                    {{ carta.valor }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <notificacao/>
    <modal-novo-usuario :dialog="dialog"
                        @abrirModal="abrirModal"
                        @cancelar="fecharModal"
                        @confirmar="inserirUsuario"/>
    <modal-grafico :dialog="dialogGrafico"
                   @abrirModal="abrirModalGrafico"
                   @confirmar="fecharModalGrafico"/>
  </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import {actionTypes, mutationTypes} from '@/commons/constants'
import notificacao from './Notifications'
import modalNovoUsuario from './ModalNovoUsuario'
import modalGrafico from './ModalGrafico'

export default {
  name: 'Inicio',
  components: {notificacao, modalNovoUsuario, modalGrafico},
  data: () => ({
    cartaCss: '',
    cartaSelecionada: '',
    dialog: false,
    dialogGrafico: false,
    tamanhos: [
      {valor: 'XS'},
      {valor: 'S'},
      {valor: 'M'},
      {valor: 'L'},
      {valor: 'XL'},
      {valor: '?'}
    ],
  }),
  computed: {
    ...mapState(['usuarios'])
  },
  async mounted() {
    await this.buscarUsuarios()
  },
  methods: {
    ...mapMutations([mutationTypes.SET_NOTIFICACAO]),
    abrirModal() {
      this.dialog = true
    },
    abrirModalGrafico() {
      this.dialogGrafico = true
    },
    abrirNotificacaoSucesso(nome) {
      this.notificacao = {
        cor: '#4caf50',
        mensagem: nome + ' acabou de entrar!',
        mostrar: true
      }
      this.setNotificacao(this.notificacao)
    },
    abrirNotificacaoErro() {
      this.notificacao = {
        cor: 'error',
        mensagem: 'Ops... algo deu errado, contate seu administrador',
        mostrar: true
      }
      this.setNotificacao(this.notificacao)
    },
    async inserirUsuario(nome) {
      try {
        await this.$store.dispatch(actionTypes.INSERIR_USUARIO, {nome: nome, carta: ""})
        this.abrirNotificacaoSucesso(nome)
        this.fecharModal()
      } catch (e) {
        this.abrirNotificacaoErro()
        this.fecharModal()
      }
      await this.buscarUsuarios()
    },
    async buscarUsuarios() {
      await this.$store.dispatch(actionTypes.BUSCAR_USUARIOS)
    },
    fecharModal() {
      this.dialog = false
    },
    fecharModalGrafico() {
      this.dialogGrafico = false
    },
    mostrarCartas() {
      if (this.cartaCss === '') {
        this.cartaCss = 'flip'
      } else {
        this.cartaCss = ''
      }
    },
    async selecionarCarta(carta) {
      let usuario = await this.$store.dispatch(actionTypes.BUSCAR_USUARIO, localStorage.nome)
      usuario.carta = carta.valor
      console.log(usuario)
      await this.$store.dispatch(actionTypes.ATUALIZAR_USUARIO, usuario)
      await this.buscarUsuarios()
    }
  }
}
</script>
<style>
.background {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url("../image/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.face {
  text-align: center;
}

.front {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  transform: rotateY(180deg);
}

.back {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-image: url("../image/card back.png");
}

.card {
  display: flex;
  justify-content: center;
  transform-style: preserve-3d;
  transition: all .5s ease;
}

.flip {
  transform: rotateY(180deg);
}
</style>
