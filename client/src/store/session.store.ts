import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar?: string;
  role: "READ_ONLY" | "USER" | "ADMIN";
  is_blocked: boolean;
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
