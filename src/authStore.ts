import { create } from "zustand";

// 사용자 정보 정의
interface User {
  nickname: string;
  profileImage: string | null;
}

// Zustand에서 관리할 상태와 동작을 정의
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

// Zustand 스토어를 생성
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
