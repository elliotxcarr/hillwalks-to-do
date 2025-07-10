import { User } from "../../models/User";

export interface AuthSlice {
  loggedInUser: User | null;
  loading: boolean;
  error: string | null
}

export const initialAuthSlice: AuthSlice = {
  loggedInUser: null,
  loading: false,
  error: null
}

