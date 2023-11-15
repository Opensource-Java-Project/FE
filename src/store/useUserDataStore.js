import create  from "zustand";

const useUserDataStore = create((set) => ({
        user: null,
        setUser: (user) => set({ user })

}));

export default useUserDataStore;