<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { UserInfo } from '@/types/user';
import { Position ,Picture } from '@element-plus/icons-vue';
import { FormattedPost } from '@/types/post';
interface MessageContentProps {}
const props = defineProps<MessageContentProps>()
const { } = toRefs(props)
const { input } = useState({
  input:''
})
const route = useRoute()
const userInfo = ref<UserInfo>()
const info = ref<FormattedPost>()
const router = useRouter()
const goContent = (event:MouseEvent)=>{
    router.push({
        
        /* name:'messageContent',
        params:{
            username:info.value.userInfo.username,
            userInfo:JSON.stringify(info.value.userInfo),
            info:JSON.stringify(info.value.userInfo)
        }, */
        path:'/personProfile',
        query:{
            username:info.value.userInfo.username,
            userInfo:JSON.stringify(info.value.userInfo),
            info:JSON.stringify(info.value)
        }
    })
}
const LeftContent = ()=> {
    return (
      //@ts-ignore
      <img onClick={goContent} 
      style={{cursor:'pointer',borderRadius:'50%',width:'30px',height:'30px',marginRight:'10px'}} 
      src={info.value?.userInfo.icon} 
      />
    )
}

onMounted(()=>{
 
  
  //@ts-ignore
  userInfo.value = JSON.parse(route.query.userInfo)
  //@ts-ignore
  info.value = JSON.parse(route.query.info)

  console.log(userInfo.value , info.value);

})
</script>
<template>
  <div class="message-content-container">
    <MiddleTopHeader :LeftContent="LeftContent" :name="(userInfo?.username as string)" back-btn />
    <div style="width: 100%;display: flex;justify-content: flex-end;padding-right: 20px;padding-left: 20px;">
      <div class="content" style="color: aliceblue;background-color: rgb(29,155,240);width: fit-content;padding: 10px;">
        {{info?.introduction}}
      </div>
      <div>
        <img src="../assets/icon.png" style="margin-left: 10px;border-radius: 20px;width: 40px;height: 40px">
      </div>
    </div>
    <div class="bottom-container">
      
        <el-input style="width: 70%;" v-model="input" />
        <el-icon style="cursor: pointer;padding-left: 20px;color:rgb(29,155,240);font-size: 24px;">
          <Picture/>
        </el-icon>
        <el-icon style="cursor: pointer;padding-left: 20px;color:rgb(29,155,240);font-size: 24px;">
          <Position/>
        </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
img:hover{
  opacity: 1;
}
:deep(.el-input__inner){
  height:35px 
}
:deep(.el-input__wrapper){
  border-radius: 40px;
  box-shadow: 0 0 0 2px #CDCDCD inset ;
}
.message-content-container{

  height: calc(100% - 60px - 4px);
  padding-bottom: 60px;
  border: 2px solid #F4F4F4;
  position: relative;
  display: flex;
  align-items: flex-end;
  .content{
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: 15px;
    }
  .bottom-container{
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 50px;
    border: 2px solid #F4F4F4;
    border-left-width: 0px;
    border-right-width: 0px;
    display: flex;
    justify-content:center;
    align-items: center;
    
  }
}

// ipad
@media screen and (min-width:600px)  {
   .message-content-container{
     width: 80%;
   }
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .message-content-container{
      width: 100%;
    }
    
}

</style>