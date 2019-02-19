import Vue from 'vue'
import tableTree from '../src/index.js'
import App from './App'

Vue.use(tableTree)

new Vue({
  el: '#app',
  // components: { App }, // vue1.0的写法
  render: h => h(App) // vue2.0的写法
})