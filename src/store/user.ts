import { UserInfo } from "@/types/user"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('home', ()=>{
    const userInfo = ref<UserInfo>()
    function setUserInfo(info:UserInfo){
        userInfo.value = info
    }

    return {
        userInfo,
        setUserInfo
    }
})

/* export const useHomeStore = defineStore('home',{
    state: () => ({ 
        userInfo:{} as UserInfo
     }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    setUserInfo(info:UserInfo){
        this.userInfo = info
    }
  },
})
 */