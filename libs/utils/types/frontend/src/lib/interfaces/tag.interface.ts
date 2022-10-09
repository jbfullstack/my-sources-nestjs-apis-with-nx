export interface TagInterface {
    id: number,
    title: string,
    description: string,
    author: {
        id: number,
        pseudo: string
    }
}
