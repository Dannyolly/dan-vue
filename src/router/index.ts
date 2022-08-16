import {createRouter, createWebHistory, RouteRecordRaw, useRouter} from 'vue-router'
import {LocalStorageManager} from "@/utils/localStorage";
import { useUserStore } from '@/store/user';
import { UserInfo } from '@/types/user';

// 首頁
const Home = ()=>import('@/pages/Home/Home.vue')
const Message = ()=>import('@/pages/Message.vue')
const Notification = ()=>import('@/pages/Notification.vue')
const Mark = () =>import('@/pages/Mark.vue')
const Profile = () =>import('@/pages/Profile.vue')
const Setting = () =>import('@/pages/Setting.vue')
const SettingDetail =()=>import('@/pages/SettingDetail.vue');
const Login = ()=>import('@/pages/Login.vue')
const MainContent = () =>import('@/views/MainContent.vue')
const VirtualList = ()=>import('@/components/VirtualList/index.vue')
const PersonProfile = ()=>import('@/pages/PersonProfile.vue')
const MessageContent = ()=>import("@/pages/MessageContent.vue")
const PostDetail = () => import('@/pages/PostDetail.vue')
//const VirtualList = ()=>import('@/components/vlist2/index.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/',
    component: MainContent,
    children:[
      {
        path:'/',
        redirect:'/home',
      },
      {
        path: '/home',
        name: 'home',
        component:Home,
      },
      {
        path:'/message',
        name:'message',
        component:Message,
      },
      {
        path:'/notification',
        name:'notification',
        component:Notification,
      },
      {
        path:'/mark',
        name:'mark',
        component:Mark,
      },
      {
        path:'/profile',
        name:'profile',
        component:Profile,
      },
      {
        path:'/setting',
        name:'setting',
        component:Setting 
      },
      {
        path:'/setting/account',
        name:'settingAcount',
        component:SettingDetail
      },
      {
        path:'/personProfile',
        name:'personProfile',
        component:PersonProfile
      },
      {
        path:'/messageContent',
        name:'messageContent',
        component:MessageContent
      },
      {
        path:'/postDetail',
        name:'postDetail',
        component:PostDetail
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/vlist',
    name:'vlist',
    component:VirtualList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  let isAuthenticated = false;
  
  if(LocalStorageManager.getLocalStorageInfo('token')){
    isAuthenticated = true
    if(useUserStore().userInfo === undefined){
      useUserStore().setUserInfo( LocalStorageManager.getLocalStorageInfo('userInfo') as UserInfo)
    }
  }
  if(to.name === 'register' && !isAuthenticated){
      next()
  }
  else if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' })
  }else {
    next()
  }

})


export default router
