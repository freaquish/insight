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


export interface Assets {
    images?: string[]
    video?: string
    audio?: string
    text?: {
        data: string
        bgColor: string
        fontName: string
        fontColor: string
    }
}

export interface ShallowPost {
    assets: Assets,
    post_id: string
    meta: User
}

export interface RankCard {
    account: User
    hobby: string
    score: number
    rank: number
}

export interface Leaderboard {
    hobbies: Hobby[]
    users: RankCard[]
    selected?: Hobby
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




