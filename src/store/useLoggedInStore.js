// store.js

import create from 'zustand';
import { persist } from 'zustand/middleware'

const useLoggedInStore = create(persist((set) => ({
        isLoggedIn: false,
        setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}), {
        name: 'auth-storage', // 로컬 스토리지에 저장될 이름, 임시 로컬스토리지
}));

export default useLoggedInStore;
