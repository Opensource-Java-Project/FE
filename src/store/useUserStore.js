import create from "zustand";
import {persist} from "zustand/middleware";
export const useUserStore = create(persist((set) => ({
    userId: null,
    setUser: (userId) => set( { userId }),
}),{
    name: 'userId',
}));

