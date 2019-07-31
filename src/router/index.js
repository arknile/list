import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import toolTemplate from '@/components/toolTemplate'
import toolNavigator from '@/components/toolNavigator'
import overview from '@/components/detail'
import toolRatings from '@/components/toolRatings'
import feedbackTemplate from '@/components/feedbackTemplate'
import toolReview from '@/components/toolReview'
import reviewTemplate from '@/components/reviewTemplate'

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
        },
        {
          path: 'reviews',
          component: toolReview
        },
        {
          path: 'writeReview',
          component: reviewTemplate
        }
      ]
    }
  ]
})
