import { create } from 'zustand'

export const useUserStore = create((set) => ({
    loggedInUser: null,
    setLoggedInUser: (newState) => set({ loggedInUser: newState }),
}))