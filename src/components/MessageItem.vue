<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
import { MoreFilled } from '@element-plus/icons-vue'
import IconButton from './IconButton.vue';
import { FormattedPost } from '@/types/post';
import { calculateDate } from '@/utils/Date';
import { useRouter } from 'vue-router';
interface MessageItemProps {
    info:FormattedPost,
    deleteData:()=>void
    appendData:(item:any)=>string,
    uuid:string,
    itemProps:Map<string,boolean>
}
const props = defineProps<MessageItemProps>()
const { info  ,deleteData , appendData , itemProps,uuid } = toRefs(props)
const {} = useState({})

const toTop = ()=>{
    deleteData.value()
    let uuid = appendData.value(info)
    if(!itemProps.value.has(uuid)){
        itemProps.value.set(uuid,true)
    }
}
const router = useRouter()
const goContent = (event:MouseEvent)=>{
 
    router.push({

        path:'messageContent',
        query:{
            username:info.value.userInfo.username,
            userInfo:JSON.stringify(info.value.userInfo),
            info:JSON.stringify(info.value)
        }
    })
}

const deleteD = (event:MouseEvent) =>{
   
    deleteData.value()
}
onMounted(()=>{
   
})

</script>
<template>
  <div   class="notification-content-container" :class="{top:itemProps.has(uuid)}">
    <div @click="goContent" style="display: flex;width: 70%;">
        <img :src="info.userInfo.icon" />
        <div  class="detail">
            <div class="name"> {{info.userInfo.username}}</div>
            <div class="content">{{info.userInfo.introduction}}</div>
        </div>
    </div>
    <div style="display: flex;flex: 1;justify-content: flex-end;">
        <div class="time">
        {{calculateDate(info.postDate)}}
        </div>
        <div class="more" >
            <el-dropdown trigger="click">
                <IconButton backgroundColor="#FFFFFF" :icon="MoreFilled" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click.prevent="toTop">置頂</el-dropdown-item>
                        
                        <div>
                            <el-dropdown-item @click.prevent="deleteD">移除</el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

.notification-content-container:hover{
    background-color: @list-item-hover;
    /* .more{
        display: block;
    } */
}
.notification-content-container{
    transition: all 0.2s;
    cursor: pointer;
    padding: 15px;
    height: 50px;
    display: flex;
    img{
        border-radius: 30px;
    }
    .detail{
        width: 100%;
        line-height: 23px;
        padding-left: 15px;
        .name{
            color: @title ;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .content{
            color: @text-color ;
            font-size: 13px;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    }
    .time{
        display: flex;
        padding-right: 10px;
        justify-content: right;
        font-weight: 500;
        font-size: 14px;
        line-height: 25px;
        color: @text-color ;
        font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .more{
        display: block;
        transform: translateY(-5px);
    }
}

.top{
    background-color: @list-item-hover;
}

</style>