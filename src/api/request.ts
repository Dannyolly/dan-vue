import { http} from "@/api/config";
import {objTOParams} from "@/utils/requestTransform";
import { AxiosResponse } from 'axios'
import axios from 'axios'

export function get<T extends Object>(url:string,data:Object):Promise<AxiosResponse<T>>{

    return http.get(url+'?'+objTOParams(data))
}

export function post<T>(url:string,data:object):Promise<T>{
    return axios.post(url,data)
}


