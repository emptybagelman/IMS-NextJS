export interface Room {
    id: number,
    name: string,
    dimensions: string,
    description: string,
    theme: string,
    category: string,
    user_id: number,
    fetchUID: string,
    likes: Likes[] | null,
    children: number | null,
    src: string | null,
    alt: string | null
}

export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    avatar_image: string,
    rooms: Room[] | null
    likes: null
}

export interface Comment {
    id: number,
    comment: string,
    date: Date,
    initial_comment: boolean,
    username: string,
    user_id: number,
    room_id: number,
    parent_id: number | null,
    root_id: number | null
}

export interface Likes {
    id: number,
    user_id: number,
    room_id: number
}