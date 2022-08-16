<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted, onActivated, onUnmounted, watch, onBeforeUpdate} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import IconButton from '@/components/IconButton.vue';
import { Edit , Setting} from '@element-plus/icons-vue'
import TabBar from '@/components/TabBar.vue';
import Post from '@/components/Post.vue';
import RightBar from './Home/RightBar.vue';
import { faker } from '@faker-js/faker';
import { FormattedPost } from '@/types/post';
import { Random } from '@/utils/Num';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { loadData } from '@/utils/FakePost'
/* interface ProfileProps {
  post:FormattedPost
}
const props = defineProps<ProfileProps>()
const { post } = toRefs(props) */
const { dataList } = useState({
  dataList:[] as FormattedPost[]
})
const style = ['Posts','Likes']
const router = useRouter()
const route = useRoute()
const post = ref<FormattedPost>()
const backGroundImage = ref<string>()
watch(route,(old,newVale)=>{
  dataList.value = []
  post.value  =undefined
  
  if(route.name==='personProfile'){
    load()
  }
  
},{deep:true})
const load = ()=>{
  // @ts-ignore
  post.value = JSON.parse(route.query.info);
  backGroundImage.value = faker.image.fashion(1920,1080,true)
  setTimeout(()=>{
    dataList.value.push(...loadData(3).map((v,i,a)=>{
    // @ts-ignore
    /* v.userInfo.icon = post.value?.userInfo.icon; */
    return v
  }))
  },1000)
}

/* onBeforeRouteLeave((to,from,next)=>{
  console.log('leave~');
  
  backGroundImage.value = ''
}) */

/* onBeforeRouteUpdate((to,from,next)=>{
  console.log('update~');
  
}) */

onMounted(()=>{
  load()
})






</script>
<template>
  <div class="profile-container">
    <MiddleTopHeader :name="(post?.userInfo.username as string)" back-btn />
    <div class="background-image-container">
        <img  :src="backGroundImage" />
    </div>
    <div class="main-content">
        <div>
          <div class="icon-container">
            <img :src="post?.userInfo.icon" />
            <div style="font-weight: 600;color: rgb(55, 67, 77);text-align: center;">{{post?.userInfo.username}}</div>
          </div>
          <div class="setting-container">
            <IconButton size="large" type='primary' :icon="Edit" />
            <IconButton @click="router.push('/setting')" size="large" type='primary' :icon="Setting" />
          </div>
        </div>
    </div>
    <div>
      <TabBar :title="style" />
    </div>
    <div v-loading="dataList.length===0" v-if="dataList.length===0" class="post-list-container">
       
    </div>
    <div v-if="dataList.length!==0">
        <Post v-for="item in dataList" :info="item"/>
       </div>
  </div>
  <RightBar/>
</template>

<style lang="less" scoped>
::-webkit-scrollbar{
  display: none;
}
.profile-container{
  overflow-y: scroll;
  border: 2px solid #F4F4F4;
  .background-image-container{
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .main-content{
    display: flex;
    justify-content: center;
    position: relative;
    .icon-container{
      width: 100px;
      height: 100px;
      transform: translateY(-30%);
      border-radius: 50px;
      padding: 3px;
      background-color: #FFFFFF;
      img{
        width: 100%;
        height: 100%;
        object-fit:cover;
        border-radius: 50px;
      }
    }
    .setting-container{
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
  .post-list-container{
    padding-top: 100px;
    width: 100%;
  }
}

@media screen and (max-width:820px) {
  .background-image-container{
    height: 20%;
  }
  .profile-container{
    width: 100%;
  }
}

@media screen and (min-width:821px) {
  .background-image-container{
    height: 30%;
  }
  .profile-container{
    width: 70%;
    max-width: 600px;
  }
}

</style>