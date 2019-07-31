import Vue from 'vue'
import Router from 'vue-router'
import overview from '@/components/detail'
import toolNavigator from '@/components/toolNavigator'
import toolRatings from '@/components/toolRatings'
import toolTemplate from '@/components/toolTemplate'
import login from '@/components/login'
import home from '@/components/home'
import feedbackTemplate from '@/components/feedbackTemplate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/addTool',
      name: 'Blank',
      component: toolTemplate
    },
    {
      path: '/tool/:id',
      name: 'toolInfo',
      component: toolNavigator,
      children: [
        {
          path: '/',
          component: overview
        },
        {
          path: 'ratings',
          component: toolRatings
        },
        {
          path: 'writeFeedback',
          component: feedbackTemplate
        }
      ]
    }
  ]
})
