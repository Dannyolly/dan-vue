<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { VueEl } from '@/types/Element';
import RightBar from '@/pages/Home/RightBar.vue';
import IconButton from '../IconButton.vue';
import { 
    Back
    
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useResizeObserver } from '@vueuse/core';
import { faker } from '@faker-js/faker';
interface MiddleTopHeaderProps {
    /**
     * @description 標題
     */
    name:string,

    /**
     * 右側設置...
     */
    RightContent?:VueEl,
    /**
     * 底下內容
     */
    BottomContent?:VueEl
    /**
     * 
     */
    LeftContent?:VueEl
    /**
     * 左側返回
     */
    backBtn?:boolean,
}
const props = defineProps<MiddleTopHeaderProps>()
const { name , RightContent  ,BottomContent, LeftContent } = toRefs(props)
const { container, outerContainer,currentWidth ,currentHeight} = useState({
    container:null,
    outerContainer:null,
    currentWidth:0,
    currentHeight:0
})
const router = useRouter()
onMounted(()=>{
    useResizeObserver(container, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      currentWidth.value = width;
    })

    useResizeObserver(outerContainer, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      currentHeight.value =height
    })
})

</script>
<template>
    <div ref="outerContainer" :style="{width:currentWidth+'px'}" class='outer-middle-top-container'>
        <div   class='middle-top-container'>
            <div style="transform: translateY(-3px);" v-if="backBtn">
                <el-button 
                    @click="router.back()"
                    circle
                    size='large'
                    style="
                    border:0;
                    transform: translateY(-3px);
                    font-size: 20px;
                    margin-right: 5px;
                    "
                    :icon="Back"
                />
            </div>
            <div v-if="LeftContent!==undefined">
                <LeftContent/>
            </div>
            <div class='middle-top-title' 
            style="display:flex;font-size: 20px;font-weight: bold;text-align: center;padding-top: 2px;">
                {{name}}
            </div>
            <div v-if="RightContent!==undefined" class="right-content-container">
                <RightContent/>
            </div>
        </div>
        <div   v-if="BottomContent!==undefined" class='middle-bottom-container'>
            <BottomContent/>
        </div>
    </div>
    <div class="content" ref="container" :style="{paddingTop:currentHeight+'px'}"></div>
</template>

<style lang="less" scoped>
.outer-middle-top-container{
    position: fixed;
    top:0;
    z-index: 1000;
    
    .middle-top-container{
        width: calc(100% - 20px) ;
        padding: 10px;
        padding-left: 15px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
        .middle-top-title{
            font-size: 20px;
            font-weight: bold;
        }
        .right-content-container{
            display: flex;
            flex: 1;
            justify-content: end;
        }
    }
    .middle-bottom-container{
        width: calc(100% - 20px) ;
        padding: 10px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
    }
}

@media screen and (max-width:599px) {
    .middle-top-container{
        padding-top: 10px;
        padding-bottom: 0px;
    }
    .middle-bottom-container{
        width: calc(100% - 20px) ;
        padding: 10px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
    }
}
@media screen and (min-width:600px) {
    .middle-top-container{
        padding-top: 20px;
        padding-bottom: 0px;
    }
    .middle-bottom-container{
        width: calc(100% - 20px) ;
        padding: 10px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
    }
}
</style>