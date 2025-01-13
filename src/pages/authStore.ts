import { create } from "zustand";

interface User {
  id: string; // 사용자 ID 추가
  nickname: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void; // User 타입 사용
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) =>
    set(() => ({
      user,
      isLoggedIn: true,
    })),
  logout: () =>
    set(() => ({
      user: null,
      isLoggedIn: false,
    })),
}));
