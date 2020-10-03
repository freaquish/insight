import { Assets, Hobby, Coords } from '@/types/index'
export interface CreatePost {
    hobby: Hobby
    assets: Assets
    caption: string
    hastags: string[]
    atags: string[]
    coords?: Coords
}


class Post {
    post: CreatePost

    constructor() {
        this.post = {} as CreatePost
        this.post.hastags = [] as string[]
        this.post.atags = [] as string[]
    }

    renderToData(): CreatePost {
        return this.post
    }

    addCoords(coords: Coords): void {
        this.post.coords = coords
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

    addVideo(video: string): void {
        this.post.assets.video = video
    }

    addAudio(audio: string): void {
        this.post.assets.audio = audio
    }

    addCaption(caption: string): void {
        this.post.caption = caption
        let tags = this.filtertags(caption)
        this.post.hastags = (tags.hastags != undefined) ? tags.hastags : []
        this.post.atags = (tags.atags != undefined) ? tags.atags : []
    }

    filtertags(text: string): { hastags?: string[], atags?: string[] } {
        let data = {} as { hastags?: string[], atags?: string[] }
        let tags = text.match(/@[a-z0-9]+|#[a-z0-9]+/gi)
        if (tags != null) {
            data.hastags = tags.filter((tag: string, index: number) => {
                return tag.includes('#')
            })
            data.atags = tags.filter((tag, index) => {
                return tag.includes('@')
            })
        }
        return data
    }



}