<script lang='ts' setup>
import {defineProps, toRefs, ref, watchEffect, onMounted, defineComponent, onUnmounted} from 'vue';
import {useState} from '@/hooks/useState';
import { VueEl } from '@/types/Element';
import { useResizeObserver } from '@vueuse/core';
import { he } from 'element-plus/es/locale';
interface ListItemProps {
    /**
     * @description the function is used to update the position when the rect is changed .
     */
    updatePosition:(index:number,newHeight:number)=>void,
    /**
     * the index of the CachedPostion
     */
    index:number,
    /**
     * Item
     */
    Item:VueEl,
    /**
     * @description the element of dataList...
     */
    info:any,
    /**
     * deleData
     */
    deleteData:(index:number)=>void,

    /**
     * unique key
     */
    uuid:string,
    /**
     * the extra Props
     */
    itemProps:any
}
const props = defineProps<ListItemProps>();
const { updatePosition,index, Item, info, deleteData } = toRefs(props)
const { container } = useState({
    container:null
})
let stopFn:()=>void
onMounted(()=>{
 
    const  { stop } =  useResizeObserver(container, (entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect 
     
        updatePosition.value(index.value,height+20)
    })
    stopFn = stop
    
})

onUnmounted(()=>{
    stopFn();
    
    
})
</script>
<template>
    <Item 
        ref="container" 
        :info="info" 
        :deleteData="()=>deleteData(index)" 
        :uuid="uuid"
        :itemProps="itemProps"
    />
</template>


<style scoped>
</style>