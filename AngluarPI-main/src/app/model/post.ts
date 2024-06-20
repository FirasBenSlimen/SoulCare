export interface Post {
    id: number;
    author: string;
    content: string;
    image ?: string;
    datePosted: Date;
    likes: number;
    dislikes: number;
    comments?: Comment[];
}

export interface Comment {
    id: number;
    content: string;
    date: Date;
    replies?: Comment[];
    parentCommentId?: number;
}
