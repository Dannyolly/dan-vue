<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, CSSProperties} from 'vue';
import {useState} from '@/hooks/useState';
import { FormattedPost, Post } from '@/types/post';
import  { ElMessage, ElMessageBox, ElNotification, UploadProps, UploadUserFile  } from 'element-plus'
import  { Picture } from '@element-plus/icons-vue'
import { UserInfo } from '@/types/user.js';
import { loadData } from '@/utils/FakePost'
import pubsub from 'pubsub-js'
interface PublishProps {
    textAreaStyle?: CSSProperties | undefined,
    minRows?:number,
    onUploadNewPost:(post: FormattedPost,des:string)=>void;
    underline?:boolean,
}
const props = defineProps<PublishProps>()
const { textAreaStyle , minRows , onUploadNewPost, underline } = toRefs(props)
const { textArea,imageUrl , isWindows, fileList , uploadPicList } = useState({
    textArea :'',
    imageUrl:'',
    isWindows:true,
    fileList:[] as UploadUserFile[],
    uploadPicList:[] as string[],
})

const baseTextAreaStyle = {
    border:0,
    fontSize:'18px',
    height:'90%',
    fontWeight:500,
    marginBottom:40
}

const onSubmit=()=>{
  let temp  = loadData(1)[0]
  if(textArea){
      
      temp.introduction = textArea.value;
      temp.postImage = [ uploadPicList.value[0] ].filter((v)=>v!==undefined)
      
      if(onUploadNewPost?.value){
        onUploadNewPost.value(temp, textArea.value)
      }
      textArea.value = ''
  }
}


/* const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}


const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
} */

const handleBeforeUpload:UploadProps['beforeUpload'] = (rawFile) =>{
  const url = URL.createObjectURL(rawFile)
  uploadPicList.value.push(url)
}

const cancelPic=(index)=>{
   console.log('!!',index);
   
   uploadPicList.value =  uploadPicList.value.filter((v,i)=>i!==index);
}


</script>
<template>
  <div class='publish-container' style="display:flex">
        <img 
         style="width:40px;height:40px;borderRadius:20px" 
            :src="require('../assets/icon.png')"
        />
        <div class='publish-right-container' >
           
          <textarea
          class="text-input"
          placeholder="What's happening?"
          :rows="minRows?minRows:3"
          v-model="textArea"
          />
          <div  style="width:100%;height:1px;background:#F4F4F4;margin-bottom:15px" />
          <div :style="{display:uploadPicList.length !== 0 ? 'flex':'none' ,justifyContent:'flex-start',flexDirection:'row',marginBottom:'10px'}">
              <div @click="cancelPic(index)" :key="index" v-for="(item,index) in uploadPicList" class='post-pic-container' >
                <div  :style="{position:'absolute',right:'0',top:'-5px',
                cursor:'pointer',width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'rgb(93,160,241)',color:'#FFFFFF',fontSize:'8px',textAlign:'center'}" >
                  x
                </div>
                <img  :src="item" alt="" :style="{width:'80px',height:'80px',borderRadius:5,objectFit:'cover',marginRight:10}" />
              </div>
          </div> 
           

          <div class='publish-bottom-container' >
            <div :style="{display:isWindows?'flex':'none'}">
              <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                multiple
                :before-upload="handleBeforeUpload"
              >
                <el-button type='primary' size="medium" :icon="Picture" circle style="font-size: 14px;margin-right: 10px;" />
              </el-upload>
              <el-button 
              type='default'
              round
              style="border:0;backgroundColor:#F4F4F4;border-radius:20;margin-right:10px">
                  emjio
              </el-button>
            </div>
            <el-button 
            round
            type='default'
            style="border:0;backgroundColor:#F4F4F4;border-radius:20;margin-right:10px">
                Link
            </el-button >
            <div :style="{flex:1,display:'flex',justifyContent: 'flex-end'}">
              <el-button @click="onSubmit"  type='primary' :style="{borderRadius:20}" round >
                submit
              </el-button>
            </div>
          </div>
        </div>
    </div>
    <div v-if="underline"  
    style="width:100%;border: 0px solid rgb(244, 244, 244);
    border-bottom-width: 0.5px;margin-bottom:0px" />
</template>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 8px;
  background-color: #f2f2f2;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(222,223,225);
  
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background-color: #CDCDCD;
}

::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
:deep(.el-upload-list){
  display: none;
}
:deep(.el-textarea){
  border: none !important;
  resize: none !important;
  cursor: pointer;
}
:deep(.el-textarea__inner){
  border: none !important;
  resize: none !important;
}
.publish-container{
        :deep(.el-textarea__inner){
          border: none;
          display: flex;
        }
        padding: 20px;
        padding-top: 10px;
        width: calc(100%-40px);
        
    img{
        margin-right: 7px;
    }    
    .publish-right-container{
        flex:1;
        padding-top: 7px;
        .text-input{
          font-weight: 600;
          width:100%;
          border:none;
          font-family: @font-style;
          font-size: 18px;
          color: @fontColor2;
          resize: none;
          outline-color: #FFFFFF;
        }
        .post-pic-container{
          position:relative;
          margin-right: 10px;
        }
    }
    .publish-bottom-container{
        flex:1;
        display:flex
    }
}
</style>