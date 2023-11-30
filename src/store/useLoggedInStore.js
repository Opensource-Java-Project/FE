// store.js

import create from 'zustand';
import { persist } from 'zustand/middleware'

const useLoggedInStore = create(persist((set) => ({
        isLoggedIn: false,
        setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}), {
        name: 'isLoggedIn', // 로컬 스토리지에 저장될 이름, 토큰 유효성 검사 후 전역으로 상태 관리를 위한 로컬 스토리지
}));

export default useLoggedInStore;
