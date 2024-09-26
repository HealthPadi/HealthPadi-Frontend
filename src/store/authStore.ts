import { create, StateCreator } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

export type User = {
  roles?: ("user" | "admin")[];
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  point: number; // This value comes from the backend
  report: number;
};
export type AuthState = {
  token?: string;
  user?: User;
};

export type AuthActions = {
  setToken: (authToken: string) => void;
  clearAuth: () => void;
  setUser: (user?: User) => void; // Allow undefined
};

const initializer: StateCreator<AuthState & AuthActions> = (set) => ({
  setToken: (authToken: string) => set({ token: authToken }),
  clearAuth: () => {
    set({
      token: undefined,
      user: undefined,
    });
    localStorage.removeItem("userPoints");
  },
  setUser: (user?: User) => {
    if (user && user.point !== undefined) {
      localStorage.setItem("userPoints", user.point.toString());
    }
    set({
      user: user,
    });
  },
});

const persistedAuthState = persist<AuthState & AuthActions>(initializer, {
  name: "auth", // Name of the storage key
  storage: createJSONStorage(() => localStorage), // Use localStorage
});

export const useAuthState = create<
  AuthState & AuthActions,
  [["zustand/persist", AuthState & AuthActions]]
>(persistedAuthState);
