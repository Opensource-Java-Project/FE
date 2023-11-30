import { create } from "zustand";

export const useUserLoginStore = create(set => ({
        enteredId: '',
        setEnteredId: id => set({ enteredId: id }),
        enteredPassword: '',
        setEnteredPassword: password => set({ enteredPassword: password })
}));