export interface Hobby {
    code_name: string
    name?: string
    weight?: number
    editors?: string[]
}

export interface Tag {
    tag: string
    avatar?: string
}

export interface CollectionPost {
    post_id: string
    assets: Assets
    hobby: string
  }

export interface User {
    account_id: string
    username?: string
    first_name?: string
    last_name?: string
    name?: string
    avatar?: string
    primary_hobby?: string
    hobby?: string
    follower_count?: number
    following_count?: number
    description?: string
    following?: number
    friend?: number
}

export interface SearchResult {
    tags: Tag[]
    users: User[]
    hobbies: Hobby[]
}

export interface SearchQuery {
    hastag?: string
    hobby?: string
}

export interface TextAsset {
    data: string
    bgColor: string
    fontName: string
    fontColor: string
}


export interface Assets {
    images?: string[]
    video?: string
    audio?: string
    text?: TextAsset
}

export interface ShallowPost {
    assets: Assets,
    post_id: string
    meta: User
}

export interface RankCard {
    account: User
    hobby_score: number
    score: number
    rank: number
    isSelf: number,
    sort: string
}

export interface DiscoverPost{
    post_id: string
    account: {
        avatar: string
        username: string
    },
    asset: {
        text ?: {
            bgColor: string
            data: string
            fontName: string
            fontColor: string
        },
        image ?: string
        video?: string
        audio?: string
    }
}

export interface Leaderboard {
    hobbies: Hobby[]
    users: RankCard[]
    selected?: Hobby,
    searched:RankCard[],
}

export interface Comment {
    account: User
    created?: string
    comment: string
}

export interface OnePost {
    created_at: string
    header: {
        avatar: string
        username: string
        hobby_name: string
        hobby: string
        following: number
        rank: number | null
        influencer: number
    },
    caption: string
    body: Assets
    footer: {
        action_map: {
            love: number
            save: number
            view: number
            share: number
            comment: number
        },
        comments: Comment[]
    }
    meta: {
        score: number
        created: string
        editor?: string
        account_id: string
        actions: {
            loved: number
            shared: number
            saved: number
            viewed: number
        }
    }
    post_id: string
}

export interface Coords {
    lat: number
    long: number
}

export interface Notification {
    header?: string,
    avtar?: string,
    body?: string,
    time?: string,
    alert?: number,
}




