<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import {middleStyle} from '@/utils/Style'
import NotificationContent from '../components/NotificationContent.vue'
import TabBar from '@/components/TabBar.vue';
import RightBar from './Home/RightBar.vue';
import VirtualList from '@/components/VirtualList/VirtualList.vue';
import { faker } from '@faker-js/faker';
import { FormattedPost } from '@/types/post';
import { Random } from '@/utils/Num';
import { VirtualListMethod } from '@/types/virtualList';
import { loadData } from '@/utils/FakePost';

interface NotificationProps {}
const props = defineProps<NotificationProps>()
const { } = toRefs(props)
const {
  activeIndex,
  dataList,
  isLoading
} = useState({ 
  activeIndex:0,
  dataList:[] as FormattedPost[],
  isLoading:true
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const onload =(noMoreData:()=>void)=>{
  /* noMoreData() */
}

const Header = ()=>{
  return (
    <div>
      <MiddleTopHeader 
        name="Notification" 
        BottomContent={<TabBar title={['All','UnRead']} />}
      />
      
    </div>
  )
}

const append = ref()
const deleteD = ref()
const getMethod:VirtualListMethod=(appendData,deleteData)=>{
  append.value = appendData
  deleteD.value  =deleteData
}

onMounted(()=>{
  for (let i = 0; i < 20; i++) {
        let ch = [faker.image.fashion(),faker.image.city()]
        dataList.value.push({
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
  setTimeout(()=>{
    append.value(loadData(1)[0])    
  },1000)

})



</script>

<template>
  <div  class="notification-container">
      <div style="height: calc(100%)">
        <VirtualList      
          :data="dataList"
          :Header="Header"
          :Item="NotificationContent"
          :fixed-height="70"
          :buffer-size="10"
          :onReach="onload"
          :virtual-list-method="getMethod"
          animated
        />
      </div>
  </div>
  <RightBar />
</template>

<style lang="less" scoped>

@media screen and (min-width:821px){
  .notification-container{
    width:70%;
    max-width: 600px;
    border: 2px solid #F4F4F4;
  }
}
@media screen and (max-width:820px){
  .notification-container{
    width:100%
    
  }
}

</style>