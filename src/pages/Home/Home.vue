

<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted, computed} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import Publish from '@/components/Publish.vue';
import RightBar from './RightBar.vue';
import Post from '@/components/Post.vue';
import { FormattedPost, Post as PostInfo } from '@/types/post';
import { useResizeObserver } from '@vueuse/core';
import VirtualList from '../../components/VirtualList/VirtualList.vue';
import { Faker, faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
import Home1 from '../../components/Skeleton/HomeSkeleton.vue';
import HomeSkeleton from '../../components/Skeleton/HomeSkeleton.vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import pubsub from 'pubsub-js'
import { ElNotification } from 'element-plus';

interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props)
const { postArr ,isLoad } = useState({
    postArr:[] as FormattedPost[],
    isLoad:false
})

const loadData = (length)=>{
    let temp = [] as FormattedPost[]
    for (let i = 0; i < length; i++) {
       let ch = [faker.image.fashion(640,400,true),faker.image.city(640,400,true),faker.image.food(640,400,true)]
        temp.push({
            id: i,
            introduction: faker.lorem.sentences(),
            userId: i,
            likeCount: Random(0, 300),
            postDate: new Date(),
            userInfo: {
                id: i,
                cid: i,
                introduction: faker.lorem.sentences(),
                online: 1,
                password: '123',
                qrcode: '',
                username: faker.name.firstName( i%2==0?'female':'male'),
                backgroundImage: faker.image.fashion(),
                icon: faker.image.avatar()
            },
            postImage: [ ch[i%3] ]
            
        }) 
    }
    return temp;
}
const onload = (noMoreData:()=>void)=>{
    /* noMoreData() */
    let oldLength = postArr.value.length
   setTimeout(() => {
    for (let i = oldLength; i < oldLength + 5; i++) {
       let ch = [faker.image.fashion(640,400,true),faker.image.city(640,400,true),faker.image.food(640,400,true)]
        postArr.value.push({
            id: i,
            introduction: faker.lorem.sentences(),
            userId: i,
            likeCount: Random(0, 300),
            postDate: new Date(),
            userInfo: {
                id: i,
                cid: i,
                introduction: faker.lorem.sentences(),
                online: 1,
                password: '123',
                qrcode: '',
                username: faker.name.firstName( i%2==0?'female':'male'),
                backgroundImage: faker.image.fashion(),
                icon: faker.image.avatar()
            },
            postImage: [ ch[i%3] ]
            
        }) 
    }
   }, 2000);
}

const HomeHeader =()=>{
    return (
        <div>
            <MiddleTopHeader name={'Home'}  />
            <Publish  onUploadNewPost={(post,des)=>{
                if(appendDataFn.value){
                    appendDataFn.value(post)
                }
                ElNotification({
                    title: 'Success',
                    message: 'Success to publish new Post',
                    type: 'success',
                    duration:1000
                })
            }} />
        </div>
    )
}

const appendDataFn = ref<(post:FormattedPost)=>void>()
const deleteDataFn = ref<(index:number)=>void>()


const getVirtualListMethod = 
( appendData:(post:FormattedPost)=>void,deleteData:(index:number)=>void ) =>{
    appendDataFn.value = appendData
    deleteDataFn.value = deleteData
}

onMounted(()=>{    
    pubsub.subscribe('publish',(type,post)=>{
        if(appendDataFn.value){
           appendDataFn.value(post) 
        }
        
    })
    postArr.value.push(...loadData(10))
    setTimeout(()=>{
        isLoad.value = true
    },1000)
})  

</script>
<template>
    <div  class='home-container'> 
          <div class='home-post-container' 
          :style="{width:'100%',height:'100%',display:'flex',flexDirection:'column',position:'relative'}"
          > 
            <VirtualList  
                :data="postArr" 
                :Item="Post" 
                :estimate-size="100" 
                :Header="HomeHeader"
                :buffer-size="10"
                :onReach="onload"
                :is-show-data="isLoad"
                is-keep-alive
                :virtual-list-method="getVirtualListMethod"
                :debounce-delay-time="0"
                :item-props="{isShowInteract:true}"
                animated
            />
            <!-- <Post :info="item" v-for="(item,index) in postArr" /> -->
            <div v-if="!isLoad" style="position: absolute;padding-top: 210px;width: inherit;">
                <HomeSkeleton  />
                <HomeSkeleton  />
            </div>
          </div>
    </div>
    <RightBar/>
</template>

<style lang="less" scoped>
::-webkit-scrollbar{
    display: none;
}

// PC
@media screen and (min-width:600px) {
    .home-container{
        display: flex;
        flex: 1;
        max-width: 650px;
        flex-direction: column;
        border: 1px solid #F4F4F4;
        overflow: scroll;
        position: relative;
        .home-post-container{
            position: relative;
        }
    }
}



// ipad
/* @media screen and (max-width:599px)  {
    .home-container{
        display: flex;
        flex: 1;
        border: 0.5px solid #F4F4F4;
        flex-direction: column;
        overflow: scroll;
    }
}
 */
// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .home-container{
        width: 100%;
    }
    
}


/* .home-container::-webkit-scrollbar {
    display: none;
} */
</style>