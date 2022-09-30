export interface CurrentUserInterface {
    id: number,
    pseudo: string,
    emai: string,
    nickname: string | null,
    createAt: string,
    roleId: number | null,
    roleName: string | null,
    image: string | null,
    token: string | null
}