import { ProfileUserStateInterface, UserInterface } from "@jbhive/types_fe"


export interface ProfileStateInterface {
    pending: boolean
    user: ProfileUserStateInterface
}