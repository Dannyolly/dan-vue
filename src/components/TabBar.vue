<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
interface TabBarProps {
    title:string[]
}
const props = defineProps<TabBarProps>()
const { title } = toRefs(props)
const { activeIndex  } = useState({
    activeIndex:0
})
</script>
<template>
  <div class="top">
    <div    :key="index" v-for="(item,index) in title" 
            @click="activeIndex=index" 
            :class="{active:activeIndex===index}" 
            class="item" 
            :style="{...middleStyle}"
        >
        <div class="item-real-container">
            <div class="font" >{{item}}</div>
            <div v-show="activeIndex===index" class="line"></div>
        </div>
    </div>
   </div>
</template>

<style lang="less" scoped>
.top{
      width: 100%;
      display: flex;
      cursor: pointer;
      margin-bottom: 20px;
      .item{
        flex: 1;
        transition: all 0.2s;
        .item-real-container{
          justify-content: center;
          height: 90%;
          padding-left: 20px;
          padding-right: 20px;
          display: flex;
          width: max-content;
          flex-direction: column;
          position: relative;
          .font{
            color: @fontColor2;
          }
          .line{
          width: 100%;
          transform: translateX(-20px);
          height: 4px;
          position: absolute;
          bottom: 0;
          background-color: rgb(29, 155, 240);
          border-radius: 20px;
        }
        }
        
      }
      .item:hover{
        background-color: rgb(231,231,232);
      }
      .active{
          .font{
            font-size: 16px;
            font-weight: bold;
          }
      }
}
@media screen and (min-width: 820px){
  .top{
    height:50px
  }
}

@media screen and (max-width: 819px){
  .top{
    height:40px
  }
}
</style>