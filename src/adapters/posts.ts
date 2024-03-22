import { Post } from "../models/Post";

const baseUrl = "https://blog.tsunyoku.xyz/api";

export async function fetchPosts(): Promise<Post[] | null> {
    const response = await fetch(`${baseUrl}/posts`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent": "tsunyoku-blog",
        },
    });
    if (!response.ok) {
        return null;
    }

    const responseData: any[] = await response.json();
    return responseData.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        publishedAt: new Date(post.publishedAt),
    }));
}

export async function fetchPost(postId: string): Promise<Post | null> {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent": "tsunyoku-blog",
        },
    });
    if (!response.ok) {
        return null;
    }

    const responseData = await response.json();
    return {
        id: responseData.id,
        title: responseData.title,
        content: responseData.content,
        publishedAt: new Date(responseData.publishedAt),
    };
}