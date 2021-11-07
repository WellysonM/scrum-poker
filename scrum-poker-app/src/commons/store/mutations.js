import {mutationTypes} from '@/commons/constants'

export default {

    [mutationTypes.SET_NOTIFICACAO](state, notificacao) {
        state.notificacao = notificacao
    },

    [mutationTypes.SET_USUARIOS](state, usuarios) {
        state.usuarios = usuarios
    }
}
