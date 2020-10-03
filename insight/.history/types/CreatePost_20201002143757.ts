import { Assets, Hobby, Coords } from '@/types/index'
export interface CreatePost {
    hobby: Hobby
    assets: Assets
    caption: string
    hastags: string[]
    atags: []
    coords?: Coords
}


// class Post(){
//     post:
// }