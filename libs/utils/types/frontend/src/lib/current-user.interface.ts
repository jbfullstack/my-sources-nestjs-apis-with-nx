export interface CurrentUserInterface {
    id: number,
    pseudo: string,
    email: string,
    nickname: string | null,
    createAt: string,
    role: {
        id: number | null,
        name: string | null,
    }
    image: string | null,
    token: string | null
}