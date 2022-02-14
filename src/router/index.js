import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Quiz from "../views/Quiz.vue"
import Result from "../views/Result.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/quiz",
    name: "quiz",
    component: Quiz,
  },
  {
    path: "/result",
    name: "result",
    component: Result,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
