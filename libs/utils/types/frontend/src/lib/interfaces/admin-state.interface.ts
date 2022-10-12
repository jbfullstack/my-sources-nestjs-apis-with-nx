import { BackendErrorsInterface } from "./backend-errors.interface";
import { UserInterface } from "./user.interface";
import { LoginStateInterface } from "./login-state.interface";
import { RegisterStateInterface } from "./register-state.interface";
import { TagInterface } from "./tag.interface";
import { UsersListStateInterface } from "./user-list-state.interface";

export interface AdminStateInterface {
   desactivatedUsersList: UserInterface[] //UsersListStateInterface | null
   activatedUsersList: UserInterface[] //UsersListStateInterface | null
   searchUserInput: string 
   pending: boolean
   errors: string | null
   loggedUserRoleId: number | null
   tags: TagInterface[]
   searchTagInput: string
}



