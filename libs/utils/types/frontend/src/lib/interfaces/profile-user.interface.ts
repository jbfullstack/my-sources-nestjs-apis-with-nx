export interface ProfileUserStateInterface {
    user: {
        id: number,
        pseudo: string,
        email: string,
        nickname: string | null,
        createdAt: string,
        role: {
            id: number | null,
            name: string | null,
        },
    },
    pending: boolean
}