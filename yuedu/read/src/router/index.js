import Vue from 'vue'
import VueRouter from 'vue-router'
import list from '../views/list'
import detail from '../views/detail'
Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'list',
    component: list
  },
  {
    path:"/",
    redirect:"/detail/6"
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: detail
  },
]
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode:"history",
  routes
})
export default router
