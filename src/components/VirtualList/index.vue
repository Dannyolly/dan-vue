<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, onBeforeMount} from 'vue';
import {useState} from '@/hooks/useState';
import { dataType } from 'element-plus/es/components/table-v2/src/common';
import VirtualList from './VirtualList.vue';
import ListItem from './ListItem.vue';
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
import { VueEl } from '@/types/Element';
const {
    data
} = useState({
    data:[] 
})

onBeforeMount(()=>{
    let item = [] 
    for (let i = 0; i < 100; i++) {
      item.push(i)
    }
    data.value = [...item]
})

const onReach = ()=>{
  let item = []
    for (let i = 0; i < 10; i++) {
      item.push(i)
  }
  data.value = [ ...data.value ,...item ]
}

</script>
<template>
    <div style="width: 30%;">
      <VirtualList 
        :data="data" 
        :Item="ListItem" 
        :fixedHeight="60"
        :onReach="onReach"
        :bufferSize="5"
    />
    </div>
</template>

<style scoped>
</style>