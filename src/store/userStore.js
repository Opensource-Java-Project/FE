import { create } from "zustand";

export const useUserStore = create(set => ({
        enteredId: '',
        setEnteredId: id => set({ enteredId: id }),
        enteredPassword: '',
        setEnteredPassword: password => set({ enteredPassword: password })
}));