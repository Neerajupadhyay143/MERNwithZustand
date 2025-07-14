import { create } from 'zustand';

export const useStore = create((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
}))


export const ToggleTheme = create((set) => ({
    themes: "Dark",
    lightTheme: () => set({ themes: "Light" }),
    DarkTheme: () => set({ themes: "Dark" }),
}))