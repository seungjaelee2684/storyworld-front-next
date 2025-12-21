import { create } from "zustand";

interface AuthState {
    token: string | null;
    isLogged: boolean;
    username: string | null;
    email: string | null;
    is_admin: boolean;
}

interface AuthActions {
    setToken: (token: string) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setIsAdmin: (is_admin: boolean) => void;
    login: (token: string, username: string, email: string, is_admin: boolean) => void;
    logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const authStore = create<AuthStore>((set, get) => ({
    token: null,
    isLogged: false,
    username: null,
    email: null,
    is_admin: false,
    setToken: (token: string) => set({ token }),
    setUsername: (username: string) => set({ username }),
    setEmail: (email: string) => set({ email }),
    setIsAdmin: (is_admin: boolean) => set({ is_admin }),
    login: (token: string, username: string, email: string, is_admin: boolean) => set({ token, username, email, is_admin, isLogged: true }),
    logout: () => set({ token: null, username: null, email: null, is_admin: false, isLogged: false }),
}))