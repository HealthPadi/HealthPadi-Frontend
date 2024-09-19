import { create, StateCreator } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // Add other user properties as needed
};

export type AuthState = {
  token?: string;
  user?: User;
};

export type AuthActions = {
  setToken: (authToken: string) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
};

const initializer: StateCreator<AuthState & AuthActions> = (set) => ({
  setToken: (authToken: string) => set({ token: authToken }),
  clearAuth: () =>
    set({
      token: undefined,
      user: undefined,
    }),
  setUser: (user: User) => {
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
