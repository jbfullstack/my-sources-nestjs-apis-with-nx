import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { AdminStateInterface, UserInterface, TagInterface, ProfileUserStateInterface } from "@jbhive/types_fe";
import { ProfileService } from "../../profile.service";


export const initialState: ProfileUserStateInterface = {
    pending: false,
    user: {
        id: 0,
        pseudo: 'doe',
        email: 'john@doe.com',
        nickname: 'johndoe',
        createdAt: '',
        role: {
            id: 0,
            name: 'user'
        } 
    }
}

@Injectable()
export class ProfileStore extends ComponentStore<ProfileUserStateInterface> {    


   userProfile$ = this.select(state => state.user)
    pending$ = this.select(state => state.pending)
    pseudo$ = this.select(state => state.user.pseudo)
    email$ = this.select(state => state.user.email)
    createdAt$ = this.select(state => state.user.createdAt)
    roleId$ = this.select(state => state.user.role.id)
    roleName$ = this.select(state => state.user.role.name)
        

    loadProfileUser = this.updater( (state, user: UserInterface | null) => ({
        ...state,
        user: {
            ...state.user,
            id: user?.id || state.user.id,
            pseudo: user?.pseudo || state.user.pseudo,
            email: user?.email || state.user.email,
            nickname: user?.nickname || state.user.nickname,
            createdAt: user?.createdAt || state.user.createdAt,
            role: {
                id: user?.role?.id || state.user.role.id,
                name: user?.role?.name || state.user.role.name
            }
        }
    })    
)

    loadPseudo = this.updater( (state, pseudo: string | null) => ({
            ...state,
            user: {
                ...state.user,
                pseudo: pseudo || ''
            }
        })    
    )

    loadEmail = this.updater( (state, email: string | null) => ({
        ...state,
        user: {
            ...state.user,
            email: email || ''
        }
    })    
)
    
    constructor(private profileService : ProfileService){
        super(initialState)
    }
}