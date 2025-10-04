import type { User as FirebaseUser } from "firebase/auth";

export interface UserProfile {
  email: string;
  name: string;
  favorites: string[]; // тільки id
}

export type CurrentUser = FirebaseUser | null;
