import create from "zustand";
import {persist} from "zustand/middleware";

export const useTestReservStore = create(persist(
    (set) => ({
        start: '',
        end: '',
        content:'',
        setTestReservData: (data) => set(state => ({ ...state, ...data })),
    }),
    {
        name: 'userReservStore',  // 로컬스토리지의 키 이름
    }
));
