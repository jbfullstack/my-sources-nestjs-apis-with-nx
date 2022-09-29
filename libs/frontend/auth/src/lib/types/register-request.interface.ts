export interface RegisterRequestInterface {
    input : {
        email: string,
        password: string,
        pseudo: string,
        nickname: string | null,
    }
}