import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import drVueEcharts from './plugins/drVueEcharts'
import '@/commons/theme'
import '@/globals/http/axios'
import '@/globals/vendors'
import store from '@/commons/store'

Vue.config.productionTip = false

new Vue({
    store,
    vuetify,
    drVueEcharts,
    render: h => h(App)
}).$mount('#app')
