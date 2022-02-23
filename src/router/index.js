import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'index',
    component: index,
  },
  {
    // 如果無對應的網址，就導回首頁。
    path: '*',
    redirect: '/'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "customer" */ '../views/Admin.vue'),
  },
  {
    path: '/customer',
    name: 'Customer',
    // component: Customer, 
    component: () => import(/* webpackChunkName: "customer" */ '../views/Customer.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    // meta: { requiredLogin: false }, // 不需驗證
  }
]

const router = new VueRouter({
  routes
})

// 導向頁面前的檢查機制
router.beforeEach((to, from, next) => {
  const IsLogin = localStorage.getItem('token') == 'ImLogin'
  const Selected = JSON.parse(localStorage.getItem("selected"));

  console.log('to.meta: ',to.meta)
  console.log('from: ',from)
  console.log('IsLogin: ',IsLogin);
  console.log('Selected: ',Selected);

  if(IsLogin == true){
    // alert("登入成功!!")
    if(to.name == 'Login'){
      next('/admin')
    }else if(to.name == 'Customer'){
      if(Selected == null || Selected.length == 0){
        // alert("+++++")
        next('/admin')
      }else{
        next()
        return
      }
    }else{
      next()
    }
  }else{
    // alert("尚未登入")
    if(to.name == 'Admin' || to.name == 'Customer'){
      next('/login')
      return
    }else{
      next()
    }
  }
});

export default router
