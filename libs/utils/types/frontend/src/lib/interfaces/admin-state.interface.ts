import { BackendErrorsInterface } from "./backend-errors.interface";
import { CurrentUserInterface } from "./current-user.interface";
import { LoginStateInterface } from "./login-state.interface";
import { RegisterStateInterface } from "./register-state.interface";
import { TagInterface } from "./tag.interface";
import { UsersListStateInterface } from "./user-list-state.interface";

export interface AdminStateInterface {
   desactivatedUsersList: CurrentUserInterface[] //UsersListStateInterface | null
   activatedUsersList: CurrentUserInterface[] //UsersListStateInterface | null
   searchUserInput: string 
   pending: boolean
   errors: string | null
   loggedUserRoleId: number | null
   tags: TagInterface[]
   searchTagInput: string
}



