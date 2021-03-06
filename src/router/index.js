import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Schedule from '@/view/schedule/schedule.vue'
import ScheduleJquery from '@/view/schedule-jquery/schedule-jquery.vue'
import ScheduleJqueryMore from '@/view/schedule-jquery-more/schedule-jquery-more.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/schedule-jquery',
      name: 'scheduleJquery',
      component: ScheduleJquery
    },
    {
      path: '/schedule-jquery-more',
      name: 'scheduleJqueryMore',
      component: ScheduleJqueryMore
    }
  ]
})
