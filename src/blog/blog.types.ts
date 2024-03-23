export enum Status {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}

export interface Metadata {
    viewCount: number;
    likeCount: number;
    shareCount: number;
}

export interface BlogAuthor {
    name: String, 
    email: String
}