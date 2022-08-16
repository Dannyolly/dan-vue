<script setup lang='ts'>
import { toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
import { FormattedPost } from '@/types/post';
import { useRouter } from 'vue-router';
interface NotificationContentProps {
    info:FormattedPost
}
const { info  } = defineProps<NotificationContentProps>()
/* const { info} = toRefs(props) */
const { } = useState({})
const router = useRouter()
const goPersonFilePage = ()=>{
    router.push({
        
        /* name:'personProfile',
        params:{
            username:info.value.userInfo.username,
            info:JSON.stringify(info.value)
        }, */
        path:'personProfile',
        query:{
            username:info.userInfo.username,
            info:JSON.stringify(info)
        }
    })
}
</script>
<template>
  <div class="notification-content-container">
    <img @click="goPersonFilePage" :src="info.userInfo.icon" />
    <div class="detail">
        <div class="name"> {{info.userInfo.username}}</div>
        <div class="content">{{info.userInfo.introduction}}</div>
    </div>
    <!-- <div :style="{...middleStyle,flex:1,justifyContent:'end'}">
        <el-button   type="primary" round> Read </el-button>
    </div> -->
  </div>
</template>

<style lang="less" scoped>
img:hover{
    opacity: 0.6;
}
img{
    transition: opacity 0.2s ease-in 0s;
}
.notification-content-container:hover{
    background-color: rgb(247,249,249);
}
.notification-content-container{
    transition: all 0.2s;
    cursor: pointer;
    padding: 15px;
    height: 40px;
    display: flex;
    img{
        border-radius: 20px;
    }
    .detail{
        padding-left: 15px;
        .name{
            color: @fontColor1;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .content{
            color: @fontColor1;
            font-size: 13px;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    }
}

</style>