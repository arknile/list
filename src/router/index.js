import Vue from 'vue'
import Router from 'vue-router'
import Head from '@/components/Head'
import Test from '@/components/test'
import Img from '@/components/ImageUpload/ImageUpload'
import overview from '@/components/detail'
import toolNavigator from '@/components/toolNavigator'
import toolRatings from '@/components/toolRatings'
import toolTemplate from '@/components/toolTemplate'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Head
    },
    {
      path: '/2',
      name: 'Blank',
      component: Test
    },
    {
      path: '/3',
      name: 'Blank',
      component: Img
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/:id',
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
        }
      ]
    }
  ]
})
