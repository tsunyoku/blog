import { User } from "../models/User";

const baseUrl = "https://blog-api.tsunyoku.xyz";

export async function fetchUser(): Promise<User | null> {
    const response = await fetch(`${baseUrl}/auth/user`, {
        credentials: "include",
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent": "tsunyoku-blog",
        },
    });

    if (!response.ok) {
        return null;
    }

    const responseData: any = await response.json();

    return {
        id: responseData.id,
        username: responseData.username,
        avatarUrl: responseData.avatarUrl,
        countryCode: responseData.countryCode
    }
}

export async function logout(): Promise<void> {
    await fetch(`${baseUrl}/auth/logout`, {
        credentials: "include",
        method: "POST",
        headers: {
            Accept: "application/json",
            "User-Agent": "tsunyoku-blog",
        },
    });
}