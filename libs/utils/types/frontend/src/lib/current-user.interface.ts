export interface CurrentUserInterface {
    id: number,
    pseudo: string,
    email: string,
    nickname: string | null,
    createdAt: string,
    role: {
        id: number | null,
        name: string | null,
    }
    image: string | null,
    token: string | null
}