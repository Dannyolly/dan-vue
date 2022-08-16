import {UserInfo} from './user'
/**
 * @description 格式化的Post
 */
interface Post {
    id: number,
    introduction: string,
    likeCount: number,
    postDate: Date,
    postImage: string | Array<string>,
    userId: number | undefined,
}

/**
 * @description 格式化後的Post
 */
interface FormattedPost extends Post{
    userInfo : UserInfo,
    postImage: Array<string> 
}

export {
    FormattedPost , 
    Post
}