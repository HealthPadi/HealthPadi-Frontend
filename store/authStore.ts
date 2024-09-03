//This is the auth store that manages the authentication state of the application. It uses Zustand to manage the state and provides actions to set the token, clear the authentication state, and set the user information. It also persists the authentication state to local storage using the Zustand persist middleware.
import { create, StateCreator } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

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
