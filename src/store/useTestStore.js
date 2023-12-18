import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useTestStore = create(persist(
    (set) => ({
        memberEmail: '',
        boardIndex: 0,
        boardTitle: '',
        boardPrice: '',
        boardFileIndex: '',
        setTestData: (data) => set(state => ({ ...state, ...data })),
    }),
    {
        name: 'userPostStore',  // 로컬스토리지의 키 이름
    }
));

// export const useTestReservation = create(persist(
//     (set)=>({
//     })
// ))

// 개발자 모드 >> 저장 공간 >> 로컬 스토리지 >> userTestStore 삭제하기