/** Користувач з Nest API (/auth/me, login, register) */
export interface User {
  id: string;
  name: string;
  email: string;
}

export type CurrentUser = User | null;

/** Профіль у Firebase RTDB (users/{id}) — тимчасово, поки favorites не на API */
export interface UserProfile {
  email: string;
  name: string;
  favorites: string[];
}
