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

export interface ShallowPost {
    assets: {
        images?: string[]
        video?: string
        audio?: string
        text?: {
            data: string
            bgColor: string
            fontName: string
            fontColor: string
        },
    },
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