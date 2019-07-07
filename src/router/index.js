import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '../components/Layouts/Layouts.vue'
import BlogList from '../components/Layouts/BlogList.vue'
import DeleteBlog from '../components/Layouts/DeleteBlog.vue'
import AddBlog from '../components/Layouts/AddBlog.vue'
import Login from '../components/Login/Login.vue'
import Blog from '../components/Blog/Blog.vue'
import Search from '../components/Search/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/layouts',
      component: Layouts,
      children: [
        {
          path: 'bloglist',
          component: BlogList
        },
        {
          path: 'delete',
          component: DeleteBlog
        },
        {
          path: 'add',
          component: AddBlog
        },
        {
          path: '',
          redirect: 'bloglist'
        }
      ]
    },    
    {
      path: '/blog',
      component: Blog
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/layouts'
    }
  ]
})
