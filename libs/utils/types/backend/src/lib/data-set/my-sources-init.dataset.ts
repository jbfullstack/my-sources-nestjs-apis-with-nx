import { Role } from "../enums/role.enum"

export const roles_dataset = [
    { id: Role.User, name: 'user', description: 'Un mec connecté' },
    { id: Role.Buddy, name: 'buddy', description: 'My buddy' },
    { id: Role.Lord, name: 'lord', description: 'Lui c\'est le sang' },
    { id: Role.Admin, name: 'admin', description: 'Monsieur, mes homages..' },
    { id: Role.Astek, name: 'astek', description: 'Le dev en personne' }
] 

export const tags_dataset = [
    { title: '1er', description: 'Premières et autres fois' },
    { title: 'science', description: 'C\'est scientifique!' },
    { title: 'skate', description: 'Obligé pour loic' },
    { title: 'eminem', description: 'Encore obligé pour loic' },
    { title: 'histoire', description: 'C\'est historique!' },
    { title: 'dev', description: 'Vive le code!' },
]

export const types_dataset = [
    { title: 'web', description: 'Basiquement, un site web' },
    { title: 'book', description: 'Vue sur du papier' },
    { title: 'other', description: 'Type de source non repertorié' },
] 

export const users_dataset = [
    { email: 'bj@gmail.com', nickname: 'astek', pseudo: 'astek', roleId: Role.Astek },
    { email: 'bu@gmail.com', nickname: 'buddy', pseudo: 'buddy', roleId: Role.Buddy },
    { email: 'lo@gmail.com', nickname: 'lord', pseudo: 'lord', roleId: Role.Lord },
    { email: 'us@gmail.com', nickname: 'user', pseudo: 'user', roleId: Role.User },
] 

export const sources_dataset = [
    { title: 'bj@gmail.com', public: 'astek', url: 'astek', content: 'content', description: 'description', type: 0,  ownerId: 0, typeId: 0, 
        tags: [0, 1],},
] 


