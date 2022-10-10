import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { AdminStateInterface, CurrentUserInterface, TagInterface } from "@jbhive/types_fe";
import { ProfileStateInterface } from "../../profile-state.interface";
import { ProfileService } from "../../profile.service";


export const initialState: ProfileStateInterface = {
    pending: false,
    pseudo: '',
    email: ''
}

@Injectable()
export class ProfileStore extends ComponentStore<ProfileStateInterface> {    

   
    pending$ = this.select(state => state.pending)
    pseudo$ = this.select(state => state.pseudo)
    email$ = this.select(state => state.email)
        

    loadPseudo = this.updater( (state, pseudo: string | null) => ({
            ...state,
            pseudo: pseudo || ''
        })    
    )

    loadEmail = this.updater( (state, email: string | null) => ({
        ...state,
        pseudo: email || ''
    })    
)
    
    constructor(private profileService : ProfileService){
        super(initialState)
    }
}