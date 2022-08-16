<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import MessageItem from '@/components/MessageItem.vue';
import { Search } from '@element-plus/icons-vue'
import RightBar from './Home/RightBar.vue';
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import VirtualList from '../components/VirtualList/VirtualList.vue';
import Post from '@/components/Post.vue';
import { FormattedPost, Post as PostInfo } from '@/types/post';
import { 
    Back
} from '@element-plus/icons-vue'
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
/* interface MessageProps {}
const props = defineProps<MessageProps>()
const { } = toRefs(props) */
const {
  input,
  dataList,
  isFocus,
  isSearch,
  cached,
  appendData,
  deleteData,
  topMap
} = useState({
  input:'',
  dataList:[] as FormattedPost[],
  isFocus:false,
  isSearch:false,
  cached:[] as FormattedPost[],
  topMap:new Map<string,boolean>(),
  appendData:undefined as unknown as (item:FormattedPost)=>void,
  deleteData:undefined as unknown as (index:number)=>void
})
let postInfo:PostInfo = {
        id:1,
        introduction:"ICYMI: The Avengers aren't officially returning to the MCU until 2025's Avengers: The Kang Dynasty. Which heroes can you expect to assemble at that point? From Thor to Wong to Ms. Marvel to She-Hulk, we break down the most likely candidates.",
        userId:1,
        likeCount:123,
        postDate:new Date(),
        postImage:''
  }


const onload =(noMoreData:()=>void)=>{
   setTimeout(()=>{
     dataList.value.push( ...loadInfo(5))
   },2000)
}

const process = (value)=>{
  dataList.value.push( ...loadInfo(10))
}
const fn = useDebounceFn(process,1000)

const onInput = function(value:string){
  if(dataList.value.length!==0){
    dataList.value = []
  }
  fn(value)
  
}

const cancelSearch = function(){
  dataList.value = []
  isSearch.value = false;
  input.value = ''
  setTimeout(()=>{
    dataList.value = [...cached.value]
  },20)
}



const MessageHeader = ()=>{
  return (
    <div>
      <MiddleTopHeader 
        name="Message"  
        /* BottomContent={Bottom} */
      />
      <div class="search-container">
        {
          isSearch.value
          &&
          <el-button 
            onclick={cancelSearch}
            circle
            size='large'
            style={{
              border:0,
              fontSize: '20px',
              marginRight: '10px',
            }}
            icon={Back}
          />
        }
        <el-input
          v-model={input.value}
          onInput={onInput}
          onfocus={()=>{
            isFocus.value = true
            isSearch.value = true;
          }}
          onblur={()=>{
            isFocus.value = false
          }}
          style="height: 10%;"
          placeholder="Search Person"
          suffix-icon={Search}
          round
        />
      </div>
    </div>
  )
}

const loadInfo = (length)=>{
  let temp = [] as FormattedPost[]
  for (let i = 0; i < length; i++) {
        let ch = [faker.image.fashion(),faker.image.city()]
        temp.push({
        id: i,
        introduction: faker.lorem.sentences(),
        userId: i,
        likeCount: Random(0, 300),
        postDate: faker.date.soon(),
        userInfo: {
            id: i,
            cid: i,
            introduction: faker.lorem.words(),
            online: 1,
            password: '123',
            qrcode: '',
            username: faker.name.firstName( i%2==0?'female':'male'),
            backgroundImage: faker.image.fashion(),
            icon: faker.image.avatar()
        },
        postImage: [ ch[i%2] ]
      })
    }
    return temp
}



const getMethod = (append , deleteD)=>{
  appendData.value = append
  deleteData.value = deleteD
}

onMounted(()=>{
  
  dataList.value.push( ...loadInfo(10))

})
</script>
<template>
  <div   class="message-container">
    <VirtualList 
          :virtual-list-method="getMethod"
          :data="dataList" 
          :Item="MessageItem" 
          :fixed-height="80"
          :Header="MessageHeader" 
          :buffer-size="10"
          :onReach="onload"
          :itemProps="topMap"
          animated
      />
  </div>
  <RightBar />
</template>

<style lang="less" scoped>


:deep(.el-input__inner){
  height:40px 
}
:deep(.el-input__wrapper){
  border-radius: 40px;
  box-shadow: 0 0 0 2px #CDCDCD inset ;
}
:deep(.el-input__wrapper.is-focus){
  box-shadow: 0 0 0 2px #409eff inset !important; ;
}

:deep(.search-container){
  padding: 20px;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.message-container{
  width: 70%;
  height: calc(100% - 4px);
  overflow: scroll;
  border: 2px solid #F4F4F4;
  
}  
::-webkit-scrollbar{
  display: none;
}

@media screen and (min-width:821px){
  
  .message-container{
    width:70%;
    max-width: 600px;
  }
}
@media screen and (max-width:820px){
  .message-container{
    width:100%
  }
}

</style>