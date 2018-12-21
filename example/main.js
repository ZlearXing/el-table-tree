import Vue from 'vue'
import tableTree from '../src/index.js'
import App from './App'

Vue.use(tableTree)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
  // render: h => h(tableTree)
})
// new Vue({
//   render(createElement) {
//     return createElement(App)
//   }
// }).$mount('#app')