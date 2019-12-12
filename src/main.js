import Vue from 'vue'
import ImagerJs from './imager-js.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(ImagerJs),
}).$mount('#app')
