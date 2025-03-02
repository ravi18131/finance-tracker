import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IUser {
  id: string;
  user_id: string;
  email: string;
  phone1?: string;
  phone2?: string;
  extension?: string;
  notes?: string;
  role: "SUPER_ADMIN" | "ADMIN";
  is_active: boolean;
  first_name: string;
  last_name: string;
  full_name: string;
  title?: string;
  avatar?: string;
  is_elc_user: boolean;
  two_fa_enabled: boolean;
}

interface SessionState {
  user?: IUser;
  setUser: (data: IUser) => void;
  logoutUser: () => void;
}

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (data) =>
          set(() => ({
            user: data,
          })),
        logoutUser: () =>
          set(() => ({
            user: undefined,
          })),
      }),
      {
        name: "session-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
