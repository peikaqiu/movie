import Vue from 'vue'
import Router from 'vue-router'
import HotView from '../components/Hot/HotView'
import SerachView from '../components/Serach/SerachView'
import PersonView from '../components/Person/PersonView'

import Showing from '../components/Hot/Showing'
import Soon from '../components/Hot/Soon'
import MovieView from '../components/Serach/MovieView'
import ProgramView from '../components/Serach/ProgramView'

import wantView from '../components/Person/wantView'
import SeeingView from '../components/Person/SeeingView'
import OutView from '../components/Person/OutView'
import RatingView from '../components/Person/RatingView'
import HumanView from '../components/Person/HumanView'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  mode:'history',
  routes: [
    {
      path: '/hot',
      name: 'HotView',
      component: HotView,
      children:[
        {
          path: 'showing',
          name: 'Showing',
          component: Showing,
          /*children:[
            {
              path:'Message',
              name:'Message',
              component:Message,
            },
            {
              path:'MovieMessage',
              name:'MovieMessage',
              component:MovieMessage,
            }
          ]*/
        },
        {
          path: 'Soon',
          name: 'Soon',
          component: Soon
        }
      ]
    },
    {
      path: '/',
      redirect: '/hot'       					//访问初始页面=访问了HomeView
    },
    {
      path: '/serach',
      name: 'SerachView',
      component: SerachView,
      children:[
        {
          path: 'movie',
          name: 'MovieView',
          component: MovieView
        },
        {
          path: 'program',
          name: 'ProgramView',
          component: ProgramView
        }
      ]
    },
    {
      path: '/person',
      name: 'PersonView',
      component: PersonView,
      children:[
        {
          path: 'wantView',
          name: 'wantView',
          component: wantView
        },
        {
          path: 'SeeingView',
          name: 'SeeingView',
          component: SeeingView
        },
        {
          path: 'OutView',
          name: 'OutView',
          component: OutView
        },
        {
          path: 'RatingView',
          name: 'RatingView',
          component: RatingView
        },
        {
          path: 'HumanView',
          name: 'HumanView',
          component: HumanView
        }
      ]
    }
  ]
})
