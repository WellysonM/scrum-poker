<template>
  <v-dialog v-model="dialog" max-width="340" persistent>
    <v-card>
      <v-card-title class="headline">Insira seu nome de usuário</v-card-title>
      <v-card-actions>
        <v-text-field
            v-model="nome"
            name="novo usuário"
            type="text"
        />
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white gray--text" depressed @click="cancelar">cancelar</v-btn>
        <v-btn color="white green--text" depressed @click="confirmar">confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalNovoUsuario',
  data: () => ({
    nome: ''
  }),
  props: {
    dialog: {
      required: true
    }
  },
  mounted() {
    if (!localStorage.nome) {
      this.abrirModal()
    }
  },
  watch: {
    nome(novoUsuario) {
      localStorage.nome = novoUsuario;
    }
  },
  methods: {
    abrirModal() {
      this.$emit('abrirModal')
    },
    confirmar() {
      this.$emit('confirmar', this.nome)
    },
    cancelar() {
      this.$emit('cancelar')
    }
  }
}
</script>
