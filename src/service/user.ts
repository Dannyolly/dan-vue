import { get } from "@/api/request"
import { UserInfo } from "@/types/user"
import dayjs from "dayjs"
export const userLogin = 
    (username:string,password:string) => get('/login',{
        username,
        password
    })


