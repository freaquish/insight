import { Assets, Hobby, Coords } from '@/types/index'
export interface CreatePost {
  hobby: Hobby
  assets: Assets
  caption: string
  hastags: string[]
  atags: string[]
  coords?: Coords
}

interface PostData {
  hobby: string
  assets: Assets
  caption: string
  hastags: string[]
  atags: string[]
  is_global: number
  coords?: Coords
}

export class Post {
  post: CreatePost

  constructor() {
    this.post = {} as CreatePost
    this.post.assets = {} as Assets
    this.post.hastags = [] as string[]
    this.post.atags = [] as string[]
  }

  getAssets(): Assets {
    return { ...this.post.assets }
  }

  isAssetUploadable(): boolean {
    return (
      this.post.assets != undefined &&
      ((this.post.assets.images != undefined &&
        this.post.assets.images.length > 0) ||
        this.post.assets.video != undefined ||
        this.post.assets.audio != undefined)
    )
  }

  replaceAssets(data: Assets): void {
    if (data.images != undefined) {
      this.post.assets.images = data.images
    }
    if (data.video != undefined) this.post.assets.video = data.video
    if (data.audio != undefined) this.post.assets.audio = data.audio
  }

  isSimilarAsset(asset: Assets): boolean {
    let isSimilarImages =
      this.isImagePresent() ||
      (asset.images != undefined &&
        this.post.assets.images?.length === asset.images.length)
    let isSimilarVideo =
      this.isVideoPresent() ||
      (asset.video != undefined && asset.video.length > 0)
    let isSimilarAudio =
      this.isAudioPresent() ||
      (asset.audio != undefined && asset.audio.length > 0)
    return isSimilarImages && isSimilarVideo && isSimilarAudio
  }

  resetAssets(): void {
    this.post.assets = {} as Assets
  }

  renderToData(is_global: boolean | undefined): PostData {
    return {
      assets: { ...this.getAssets() },
      caption: this.post.caption,
      hastags: this.post.hastags,
      atags: this.post.atags,
      hobby: this.post.hobby.code_name,
      is_global: is_global === false ? 0 : 1,
      coords: this.post.coords
    }
  }

  isImagePresent(): boolean {
    return (
      this.post.assets != undefined &&
      this.post.assets.images != undefined &&
      this.post.assets.images.length > 0
    )
  }

  isVideoPresent(): boolean {
    return (
      this.post.assets != undefined &&
      this.post.assets.video != undefined &&
      this.post.assets.video.length > 0
    )
  }

  isAudioPresent(): boolean {
    return (
      this.post.assets != undefined &&
      this.post.assets.audio != undefined &&
      this.post.assets.audio.length > 0
    )
  }

  isTextPresent(): boolean {
    return (
      this.post.assets != undefined &&
      this.post.assets.text != undefined &&
      JSON.stringify(this.post.assets.text) != '{}'
    )
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

  addText(data: {
    data: string
    bgColor: string
    fontName: string
    fontColor: string
  }): void {
    if (this.post.assets === undefined) this.post.assets = {}
    this.post.assets.text = data
  }

  addCaption(caption: string): void {
    this.post.caption = caption
    let tags = this.filtertags(caption)
    this.post.hastags = tags.hastags != undefined ? tags.hastags : []
    this.post.atags = tags.atags != undefined ? tags.atags : []
  }

  filtertags(text: string): { hastags?: string[]; atags?: string[] } {
    let data = {} as { hastags?: string[]; atags?: string[] }
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
