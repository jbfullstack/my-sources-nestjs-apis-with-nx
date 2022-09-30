
export interface AuthRegisterResponseInterface {
    data: {
        register: {
            token: string,
            id: number,
            email: string,
            nickname: string | null,
            // role: {
            //     id: number,
            //     name: string
            // }
        }
    }
}