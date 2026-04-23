import type { User } from "./user";

export interface AuthState {
    user: User | null
    token: string | null

    setAuth: (data: { user: User; token: string }) => void
    fetchUser: () => Promise<void>
    logout: () => void

    hasPermission: (permission: string) => boolean
}