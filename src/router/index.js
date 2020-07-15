import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CountDownDemo from '@/components/CountDownDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CountDownDemo',
      component: CountDownDemo
    },
    {
      path: '/CountDownDemo',
      name: 'CountDownDemo',
      component: CountDownDemo
    },

  ]
})
