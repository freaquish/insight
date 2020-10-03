import { Assets, Hobby, Coords } from '@/types/index'
export interface CreatePost {
    hobby: Hobby
    assets: Assets
    caption: string
    hastags: string[]
    atags: []
    coords?: Coords
}


class Post {
    post: CreatePost

    constructor() {
        this.post = {} as CreatePost
    }

    addHobby(hobby: Hobby): void {
        this.post.hobby = hobby
    }

    addImage(image: string): void {
        if (this.post.assets != undefined && this.post.assets.images != undefined) {
            this.post.assets.images.push(image)
        } else {
            this.post.assets.images = [image]
        }
    }

}