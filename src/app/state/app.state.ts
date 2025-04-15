import { AuthState } from "./authState/auth.reducer";
import { UserState } from "./userState/user.reducer";

export interface AppState {
    reports: AuthState;
    users: UserState;
  }