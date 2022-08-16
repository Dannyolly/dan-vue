<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { Collection, PriceTag, Notification, Document ,Reading } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Publish from '@/components/Publish.vue';
import pubsub from 'pubsub-js'

/* interface BottomBarProps {}
const props = defineProps<BottomBarProps>()
const { } = toRefs(props) */
const { dialogVisible } = useState({
    dialogVisible:false
})
const iconsMini = [
  {
    tag:'Home',
    dom:PriceTag,
  },
  {
    tag:'Message',
    dom:Document,
  },
  {
    tag:'publish',
    dom:null
  },
  {
    tag:'Notification',
    dom:Notification,
  },
  {
    tag:'Profile',
    dom:Collection
  },
]
const router = useRouter()
const goTo= (index:number)=>{
    router.push(`/${iconsMini[index].tag.toLocaleLowerCase()}`)
}
const handleUpload = (post,des)=>{
  pubsub.publish('publish',post)
  dialogVisible.value = false
}
onMounted(()=>{
  
})
</script>
<template>
  <div class="bottom-bar-container">
    <div v-for="(Item,index) in iconsMini">
          <el-button 
          v-if="index===2"
          circle 
          class="mini" 
          type="primary" 
          size="large" 
          :icon="Reading" 
          @click="dialogVisible = true"
          />
        <el-button  
            @click="goTo(index)"
            v-else
            style="font-size: 24px;" 
            size="large" 
            circle 
            color="#FFFFFF"  
            :icon="Item.dom"
        />
    </div>
    <!-- publish -->
    <el-dialog
      v-model="dialogVisible"
      title="Publish"
    >
        <Publish :min-rows="5" :underline="false" :onUploadNewPost="handleUpload" />
    </el-dialog>
  </div>
  
</template>

<style scoped>
:deep(.el-dialog){
  border-radius: 40px;
  width: 70%;
  min-width: 400px;
  height: auto;
  padding: 20px;
  padding-top: 20px;
  padding-bottom: 0px;
}
:deep(.el-dialog__body){
  padding: 0px;
}
.bottom-bar-container{
    position: fixed;
    justify-content: space-around;
    align-items: center;
    z-index: 10000;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px #CDCDCD;
}

@media screen and (max-width:599px) {
    .bottom-bar-container{
        display: flex;
    }
}
@media screen and (min-width:600px) {
    .bottom-bar-container{
        display: none
    }
}
</style>