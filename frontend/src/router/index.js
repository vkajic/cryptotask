import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/components/Full'

// Views
import Tasks from '@/views/Tasks'
import TaskDecision from '@/views/TaskDecision'
import TaskDetail from '@/views/TaskDetail'
import PostTask from '@/views/PostTask'
import FindWork from '@/views/FindWork'
import Rules from '@/views/Rules'
import Funds from '@/views/Funds'

Vue.use(Router)

export default new Router({
	//mode: 'hash',
	//linkActiveClass: 'open active',
	//scrollBehavior: () => ({ y: 0 }),
	routes:
	[
		{
      path: '/',
      name: 'Page',
      component: Full,
      children:
			[
        {
          path: '',
          name: 'Tasks',
          component: Tasks
        },
				{
          path: 'taskdecision/:id',
          name: 'TaskDecision',
          component: TaskDecision
        },
				{
          path: 'taskdetail/:id/:submit',
          name: 'TaskDetail',
          component: TaskDetail
        },
				{
          path: 'posttask',
          name: 'PostTask',
          component: PostTask
        },
				{
          path: 'findwork',
          name: 'FindWork',
          component: FindWork
        },
				{
					path: 'rules',
          name: 'Rules',
          component: Rules
				},
        {
					path: 'funds/:type',
          name: 'Funds',
          component: Funds
				}
			]
		}
	]
})
