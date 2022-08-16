<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, onActivated} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import Post from '@/components/Post.vue';
import Mark from '@/components/TopBarSetting/Mark.vue'
import RightBar from './Home/RightBar.vue';
import { Search } from '@element-plus/icons-vue'
import { FormattedPost } from '@/types/post';
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
import { useScroll } from '@vueuse/core';
interface MarkProps {}
const props = defineProps<MarkProps>()
const { } = toRefs(props)
const { input, value , dataList,container } = useState({
  input:'',
  value:'',
  dataList:[] as FormattedPost[],
  container:null
})

const { x, y, isScrolling, arrivedState, directions } = useScroll(container)

onMounted(()=>{
  for (let i = 0; i < 4; i++) {
        let ch = [faker.image.fashion(640,400,true),faker.image.city(640,400,true),faker.image.food(640,400,true)]
        dataList.value.push({
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
})
onActivated(()=>{

  //@ts-ignore
  container.value.scrollTo({
    left:0,
    top:y.value
  })
})


</script>


<template>
  <div ref="container" class="mark-container">
    <MiddleTopHeader name="Mark" :RightContent="Mark" />
    <div class="query-container">
      <el-input 
      style="width: 50%;margin-right: 20px;" 
      placeholder="Input Keyword"
      :suffix-icon="Search"
      v-model="input"
      size='medium'
      />
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
    <div v-if="dataList.length!==0">
      <div >
        <div class="date">2022/8/1</div>
        <Post :info="dataList[0]"/>
        <Post :info="dataList[1]"/>
      </div>
      <div >
        <div class="date">2022/7/31</div>
        <Post :info="dataList[2]"/>
        <Post :info="dataList[3]"/>
      </div>
    </div>
  </div>
  <RightBar/>
</template>

<style lang="less" scoped>
::-webkit-scrollbar{
  display: none;
}
:deep(.el-input__wrapper){
  border-radius: 20px;
}
.mark-container{
  border: 2px solid #F4F4F4;
  overflow: scroll;
  .query-container{
    padding: 20px;
    padding-bottom: 10px;
    display: flex;
    
  }
  .date{
    padding: 20px;
    padding-bottom: 10px;
    font-style: @font-style;
    font-weight: 600;
    font-size: 16px;
    color: @text-color;
  }
}

@media screen and (min-width:821px){
  .mark-container{
    width:70%;
    max-width: 600px;
  }
}
@media screen and (max-width:820px){
  .mark-container{
    width:100%
  }
}
</style>