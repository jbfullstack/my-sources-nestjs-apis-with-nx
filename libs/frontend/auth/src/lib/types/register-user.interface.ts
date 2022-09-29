export interface RegisterUserInterface {
    user: {
        pseudo: string,
        emai: string,
        nickname: string | null,
        password: string,
    }
}