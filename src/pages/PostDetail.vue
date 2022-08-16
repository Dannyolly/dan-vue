<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted ,watch} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import { FormattedPost } from '@/types/post';
import { useRoute, useRouter } from 'vue-router';
import { loadData } from '@/utils/FakePost';
import Post from '@/components/Post.vue';
import RightBar from './Home/RightBar.vue';
import VirtualList from '@/components/VirtualList/VirtualList.vue';
import { VirtualListMethod } from '@/types/virtualList';
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num'
import { 
    ChatRound,
    Upload,
    Link,
    Pointer,
    CollectionTag,
} from '@element-plus/icons-vue';
import {
    useUserStore
}from '@/store/user'
import Publish from '@/components/Publish.vue';
import { ElNotification } from 'element-plus';
interface PostDetailProps {}
const props = defineProps<PostDetailProps>()
const { } = toRefs(props)
const { post, dataList, username } = useState({
    post:{} as FormattedPost | undefined,
    dataList: [] as FormattedPost[],
    username:''
})
const interactContainer =[
    {
        index:0,
        Tag:ChatRound,
    },
    {
        index:1,
        Tag:Link,
    },
    {
        index:2,
        Tag:CollectionTag,
    },
    {
        index:3,
        Tag:Pointer,
    }
]

const route = useRoute()
const load = ()=>{
  // @ts-ignore
  post.value = JSON.parse(route.query.info);
  // @ts-ignore
  username.value = route.query.username
  dataList.value.push(...loadData(10).map(v=>{
    v.postImage = []
    return v
  }));
}
watch(route,(old,newVale)=>{
  dataList.value = []
  post.value  =undefined
  if(route.name==='postDetail'){
    load()
  }
},{deep:true})
const append = ref<(item:any)=>void>()
const getMethod:VirtualListMethod = (appendData,deleteData)=>{
    append.value = appendData
   

}

const PostDetailHeader =()=>{
    if(post.value?.userInfo){
        return (
            <div style={{position:'relative'}}>
                <MiddleTopHeader  
                    name={username.value} 
                    back-btn 
                />
                <Post itemProps={{isShowInteract:false}} info={post.value as unknown as FormattedPost} />
                <div class="interact-num-container">
                    <div class="interact-num">
                        <div class="tag-num">{Random(0,300)}</div>
                        <div class="tag-name">Comment</div>
                    </div>
                    <div class="interact-num">
                        <div class="tag-num">{Random(0,300)}</div>
                        <div class="tag-name">Like</div>
                    </div>
                    <div class="interact-num">
                        <div class="tag-num">{Random(0,300)}</div>
                        <div class="tag-name">Collect</div>
                    </div>
                </div>
                <div class="interact-pic-container" style={{padding:'10px',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    {
                        interactContainer.map((v)=>{
                            return (
                                <div class="interact">
                                    <el-icon>
                                        {
                                            <v.Tag/>
                                        }
                                    </el-icon>
                                </div>
                            )
                        })
                    }
                </div>
                <Publish onUploadNewPost={(post,des)=>{
                    post.userInfo.icon = require('@/assets/icon.png')
                    post.userInfo.username = useUserStore().userInfo?.username as string
                    if(append.value){
                        append.value(post)
                    }
                    ElNotification({
                        title: 'Success',
                        message: 'Success to publish new Comment',
                        type: 'success',
                        duration:1000
                    })
                }}/>
            </div>
        ) 
    }
    
}

const onload = (noMoreData:()=>void)=>{
  /*   console.log('load?');
     */
  setTimeout(()=>{
    dataList.value.push(...loadData(5).map(v=>{
        v.postImage = []
        return v
    }))
  },1000)

}

onMounted(()=>{
    load()
})

</script>
<template>
  <div class="post-detail-container">
    <div class="left">
        
        <VirtualList 
            :Header="PostDetailHeader"
            :data="dataList"
            :buffer-size="10"
            :Item="Post"
            :virtual-list-method="getMethod"
            :estimate-size="40"
            is-show-data
            :item-props="{isComment:true}"
            :onReach="onload"
            is-keep-alive
        />
    </div>
  </div>
  <RightBar/>
</template>

<style scoped lang="less">
:deep(.interact-pic-container){
    border: 1px solid #F4F4F4;
    width: calc(100% - 20px +2px);
    border-right-width: 0px;
    border-top-width: 0px;
}
:deep(.interact-num-container){
    display: flex;
    align-items: center;
    padding: 16px;
    border: 0px solid #F4F4F4;
    border-bottom-width: 1px;
}
:deep(.interact-num){
    font-style: @font-style;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @text-color;
    margin-right: 20px;
    .tag-num{
        font-size: 14px;
        font-weight: bolder;
        color: @fontColor1;
        margin-right: 5px;
    }
    .tag-name{
        font-weight: 500;
    }
}
:deep(.interact){
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @text-color;
}
:deep(.interact:hover){
    color: rgb(64,158,255);
}
.post-detail-container{
    position: relative;
    width: 100%;
    height: calc(100% - 2px);
    display: flex;
    border: 1px solid #F4F4F4;
    max-width: 650px;
    .left{
        display: flex;
        width: fit-content;
        flex: 1;
    }

}
</style>