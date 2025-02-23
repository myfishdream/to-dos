//路由配置文件代码
import {createRouter,createWebHistory} from 'vue-router'

import oneday from '../pages/oneday.vue'
import important from '../pages/important.vue'
import plan from '../pages/plan.vue'
import all from '../pages/all.vue'

const router = createRouter({
	history:createWebHistory(), // 路由工作模式
	routes:[
		{
			name:'oneday',
			path:'/oneday',
			component:oneday
		},
		{
			name:'important',
			path:'/important',
			component:important
		},
		{
			name:'plan',
			path:'/plan',
			component:plan
		},
		{
			name:'all',
			path:'/all',
			component:all
		}
	]
})
export default router