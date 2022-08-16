<script setup lang='ts'>
import { useUserStore } from '@/store/user';
import {defineProps, toRefs, ref, watchEffect, onMounted, onActivated} from 'vue';
import {useState} from '@/hooks/useState';
import {middleStyle} from '@/utils/Style'
import { useRouter } from 'vue-router';
import {
  Message,
  MoreFilled,
  Search
} from '@element-plus/icons-vue'
import { UserInfo } from '@/types/user';
import { LocalStorageManager } from '@/utils/localStorage';
import { ElMessage, ElNotification } from 'element-plus';
import { userLogin } from '@/service/user'
import { uuid } from '@/utils/uuid';
interface LoginProps {}
const props = defineProps<LoginProps>()
const { } = toRefs(props)
const { username , password ,userList } = useState({
    username:'',
    password:'',
    userList:[] as UserInfo[] | null
})

const router = useRouter()
const login = ()=>{
    let account = LocalStorageManager.getLocalStorageInfo('account')
    let userInfo:UserInfo = {
            id: 1,
            username: username.value,
            password: password.value,
            cid: 0,
            introduction: '',
            online: 0,
            qrcode: '',
            backgroundImage: '',
            icon: ''
    }
    let realUserInfo  = LocalStorageManager.getLocalStorageInfo('userInfo')
    const { setUserInfo } = useUserStore();
    
    if(realUserInfo && realUserInfo.username !== username.value || !realUserInfo){
        LocalStorageManager.setLocalStorageInfo('userInfo',{userInfo:userInfo})
    }

    if(account===null){
        LocalStorageManager.setLocalStorageInfo('account',{account:[userInfo]})
    }else{
        let flag = true
        for (let i = 0; i < account.length; i++) {
            if(account[i].username === userInfo.username){
                flag = false;
                break;
            }   
        }
        if(flag){
            LocalStorageManager.setLocalStorageInfo('account',
                {
                    account:[...account,userInfo]
                }
            )
        }
    }
    LocalStorageManager.setLocalStorageInfo('token',{token: uuid()})
    setUserInfo(userInfo)
    router.replace('/')
    

    /* userLogin(username.value , password.value).then(res=>{
        if(res.data.msg!=='error'){
            LocalStorageManager.setLocalStorageInfo('account',
                {
                    account:[...LocalStorageManager.getLocalStorageInfo('account'),
                res.data.userInfo.userInfo]
                }
            )
            ElNotification({
                title:'Success',
                message:' login success ! ',
                type:'success'
            })
        }else{
            ElNotification({
                title:'error',
                message:' maybe your account or paasword is wrong ! ',
                type:'error'
            })
        }
    }) */
}
const loginByCard =(item:UserInfo)=>{
    LocalStorageManager.setLocalStorageInfo('userInfo',{userInfo:item})
    LocalStorageManager.setLocalStorageInfo('token',{token: uuid()})
    useUserStore().setUserInfo(item)
    router.replace('/home')
}
onMounted(()=>{
    userList.value = LocalStorageManager.getLocalStorageInfo('account')

})

onActivated(()=>{
   
    
})
</script>
<template>
  <div class='login-container'>
        <div class="users-container">
                <div :style="{
                    maxHeight:50,
                    fontSize:26,
                    textAlign:'left',
                    fontWeight:'bolder',
                    color:'rgb(24,119,242)',
                    marginBottom:'30px'
                    }"> 
                <div>Your Account</div>
                    <div :style="{fontSize:20,color:'#CDCDCD'}">
                        Recently logined
                    </div>
                </div>
                 <div class="login-card-container">
                    <el-card @click="loginByCard(item)" v-for="item in userList" shadow="hover" style="border-radius: 10px;cursor:pointer;margin-right: 20px;margin-bottom: 20px;" :body-style="{ padding:'0px'}">
                        <img  src="../assets/icon.png"  />
                        <div class="name">{{item.username}}</div>
                    </el-card>
                </div> 
        </div>

        <div class='login-real-container'>
            <div class='login-top'>
                <img src='../assets/home.png' style="width:15%"/>
                <span 
                :style="{
                    color:'#3672CF',
                    fontSize:'220%',
                    fontWeight:'bolder'
                    }">
                    DanDan
                </span>
            </div>
            <div style="display: flex;flex-direction: column;align-items: center;">
                <el-input
                v-model="username"
                placeholder="Please input username"
                style="margin-bottom: 20px;width: 80%;"
                />
                <el-input
                    v-model="password"
                    type="password"
                    placeholder="Please input password"
                    show-password
                    style="margin-bottom: 100px;width: 80%;"
                />
                <el-button 
                    round 
                    style="width: 50%;"
                    type="primary"
                    size="large"
                    @click="login"
                    >
                    Login
                </el-button>
            </div>
            <div  class='login-button-container' :style="{paddingTop:'5%'}">
               
            </div>

            <div :style="{
                /* bottom:platForm === 'windows'?'10%':'30%' */
            }" class="login-bottom-container">
                <div class='bottom-word' style="margin-right:15%">注冊</div>
                <div class='bottom-word' >忘記密碼</div>
            </div>
        </div>
        <div class="bottom-content" >
            Made by Danny Lei    
            <span style="padding-left:20%" >
            github : https://github.com/Dannyolly
            </span>
        </div>
    </div>
</template>

<style lang="less" scoped>

:deep(.el-input__inner){
  height:40px 
}
:deep(.el-input__wrapper){
  border-radius: 20px;
}
.login-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;

    .login-real-container {
        max-width: 450px;
        min-width: 200px;
        width:40%;
        height:65%;
        position: relative;
        .login-top{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5%;
        }
        .login-button-container{
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            
            .button {
                
                width: 15%;
                height: 0;
                padding-bottom: 15%;
                border-radius: 50%;
                background-color: rgb(29,155,240);
                position: relative;
                cursor: pointer;
            }

            .button:active{
                box-shadow: 0 0 0 1px "#CDCDCD";
                background-color: rgb(178,222,231);
                transition: all 0.4s;
            }
        }
        .login-bottom-container{
            width: 100%;
            position: absolute;
            bottom: -10%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            
            .bottom-word{
                cursor: pointer;
                
            }

            .bottom-word:active{
                color: rgb(178,222,231);
                
            }
        }
    }

    .users-container{
        width:40%;
        height: 65%;
        /* padding-left: 5%; */
        max-width: 650px;
        /* justify-content: flex-start;
        align-items: center;
        display: flex;
        flex-wrap: wrap; */
        position: relative;

        .login-card-container{
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            img{
                width: 130px;
            }
            .name{
                display: flex;
                justify-content: center;
                align-content: center;
                padding: 5px;
                padding-left: 0px;
                padding-right: 0px;
                color: @fontColor2;
                font-family: @font-style;
                font-size: 16px;
                font-weight: 500;
            }
        }
        
        /* background-color: aqua; */
    }

    .bottom-content{
        position: absolute;
        bottom: 0px;
        display: flex;
        flex: 1;
        background-color: rgb(17,154,251);
        color:"#FFFFFF";
        width: calc(100% - 40px);
        height: calc(7% - 40px);
        color: #FFFFFF;
        font-family: @font-style;
        font-size: 16px;
        /* justify-content: center; */
        padding: 20px;
        align-items: center;
    }
}


// ipad
@media screen and (min-width:600px) and (max-width:1299px) {
    .login-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    
        .login-real-container {
            max-width: 500px;
            min-width: 200px;
            width:40%;
            height:65%;
            
            position: relative;
            .login-top{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 10%;
            }
            .login-button-container{
                width: 100%;
                height: 20%;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                
                .button {
                    
                    width: 15%;
                    height: 0;
                    padding-bottom: 15%;
                    border-radius: 50%;
                    background-color: rgb(29,155,240);
                    position: relative;
                    cursor: pointer;
                }
    
                .button:active{
                    box-shadow: 0 0 0 1px "#CDCDCD";
                    background-color: rgb(178,222,231);
                    transition: all 0.4s;
                }
            }
            .login-bottom-container{
                width: 100%;
                position: absolute;
                bottom: 0%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                
                .bottom-word{
                    cursor: pointer;
                    
                }

                .bottom-word:active{
                    color: rgb(178,222,231);
                    
                }
            }
        }
    
        .login-card-container{
            justify-content: flex-start;
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            img{
                width: 150px;
            }
            .name{
                display: flex;
                justify-content: center;
                align-content: center;
                padding: 5px;
                padding-left: 0px;
                padding-right: 0px;
                color: @fontColor2;
                font-family: @font-style;
                font-size: 16px;
                font-weight: 500;
            }
        }
    
    }
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .login-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    
        .login-real-container {
            max-width: 550px;
            min-width: 400px;
            width:60%;
            height:65%;
            position: relative;
            .login-top{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 5%;
            }
            .login-button-container{
                width: 100%;
                height: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                
                .button {
                    
                    width: 15%;
                    height: 0;
                    padding-bottom: 15%;
                    border-radius: 50%;
                    background-color: rgb(29,155,240);
                    position: relative;
                    cursor: pointer;
                }
    
                .button:active{
                    box-shadow: 0 0 0 1px "#CDCDCD";
                    background-color: rgb(178,222,231);
                    transition: all 0.4s;
                }
            }
            .login-bottom-container{
                width: 100%;
                position: absolute;
                bottom: 0%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                
                .bottom-word{
                    cursor: pointer;
                    
                }
    
                .bottom-word:active{
                    color: rgb(178,222,231);
                    
                }
            }
        }
        .users-container{
            display: none;
        }
    
    }
    
}

</style>