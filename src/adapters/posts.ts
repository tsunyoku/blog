import { Post } from "../models/Post";

const baseUrl = "https://blog-api.tsunyoku.xyz";

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

export async function createPost(title: string, content: string): Promise<string | null> {
    const response = await fetch(`${baseUrl}/posts`, {
        credentials: "include",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "tsunyoku-blog",
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        return null;
    }

    const responseData = await response.json();
    return responseData.postId;
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

export async function deletePost(postId: string): Promise<boolean> {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "User-Agent": "tsunyoku-blog",
        },
    });
    return response.ok;
}