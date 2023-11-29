// messageStore.js
import create from 'zustand';

const useMessageStore = create(set => ({
    message: '',
    setMessage: (msg) => set({ message: msg }),
}));

export default useMessageStore;
