export interface CurrentUserInterface {
    id: number,
    pseudo: string,
    emai: string,
    nickname: string | null,
    createAt: string,
    roleId: number,
    roleName: string,
    image: string | null,
    token: string
}