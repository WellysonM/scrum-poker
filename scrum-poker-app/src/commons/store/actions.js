import axios from 'axios'
import {actionTypes, mutationTypes} from '@/commons/constants'

export default {

    async [actionTypes.INSERIR_USUARIO](context, usuario) {
        return await axios.post('usuarios/', usuario)
    },

    async [actionTypes.BUSCAR_USUARIOS]({commit}) {
        const {data} = await axios.get('usuarios/')
        commit(mutationTypes.SET_USUARIOS, data)
    },

    async [actionTypes.BUSCAR_USUARIO](context, nome) {
        const {data} = await axios.get(`usuarios?nome=${nome}`)
        return data[0]
    },

    async [actionTypes.ATUALIZAR_USUARIO](context, usuario) {
        return await axios.put(`usuarios/${usuario.id}`, usuario)
    }
}
