import {storeKey, useStore as vueUseStore} from 'vuex'
import { UserInfo} from "@/types/user";
import { json } from 'stream/consumers';
type Key = 'token' | 'userInfo' | 'account'
type Token = string
// ---------------------------------------get------------------------------------
function getLocalStorageInfo<T extends 'token'>(key:T):Token | null
function getLocalStorageInfo<T extends 'userInfo'>(key:T):UserInfo | null
function getLocalStorageInfo<T extends 'account'>(key:T):UserInfo[] | null

function getLocalStorageInfo(key:Key){
    const item = localStorage.getItem(key)
    if(key === 'token'){
        return item
    }
    if(item){
        return JSON.parse(item)
    }else {
        // error ...
        /* throw new Error("null item ");
         */
        return null;
    }
}
// ------------------------------------handle------------------------------------

function handleToken(key:Key,token:Token){
    localStorage.setItem(key,token)
}
function handleUserInfo(key:Key,userInfo:UserInfo){
    localStorage.setItem(key,JSON.stringify(userInfo))
}
function handleAccount(key:Key,account:UserInfo[]){
    let accountTemp = getLocalStorageInfo('account');
    
    localStorage.setItem(key,JSON.stringify(account))
}

// ---------------------------------------set------------------------------------
type KeyOptions={
    token?:Token,
    userInfo?:UserInfo,
    account?:UserInfo[]
}
function setLocalStorageInfo(key:'token',keyOptions:KeyOptions):void
function setLocalStorageInfo(key:'userInfo',keyOptions:KeyOptions):void
function setLocalStorageInfo(key:'account',keyOptions:KeyOptions):void


function setLocalStorageInfo(key:Key,keyOptions:KeyOptions){
    const {
        token,
        userInfo,
        account
    } = keyOptions
    if(userInfo!==undefined){
        handleUserInfo(key,userInfo)
    }
    if(token!==undefined){
        handleToken(key,token)
    }
    if(account!==undefined){
        handleAccount(key,account)
    }
}

function removeLocalStorageInfo(key:Key){
    localStorage.removeItem(key)
}



class LocalStorageManager{
    static getLocalStorageInfo = getLocalStorageInfo
    static setLocalStorageInfo = setLocalStorageInfo
    static removeLocalStorageInfo = removeLocalStorageInfo
}

export{
    LocalStorageManager
}


