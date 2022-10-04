import { BackendErrorsInterface } from "./backend-errors.interface";
import { CurrentUserInterface } from "./current-user.interface";
import { LoginStateInterface } from "./login-state.interface";
import { RegisterStateInterface } from "./register-state.interface";
import { UsersListStateInterface } from "./user-list-state.interface";

export interface AdminStateInterface {
   desactivatedUsersList: UsersListStateInterface | null
   manageUsersList: UsersListStateInterface | null
   searchInput: string 
   isLoading: boolean
   validationErrors: BackendErrorsInterface | null
}



