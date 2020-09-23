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
}

export interface SearchResult {
    tags?: Tag[]
    users?: User[]
    hobbies?: Hobby[]
}