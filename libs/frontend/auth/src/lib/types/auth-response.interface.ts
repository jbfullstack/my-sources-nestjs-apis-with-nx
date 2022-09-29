
export interface AuthResponseInterface {
    data: {
        login: {
            token: string,
            user: {
                id: number,
                email: string,
                nickname: string | null,
                role: {
                    id: number,
                    name: string
                }
            }
        }
    }
}