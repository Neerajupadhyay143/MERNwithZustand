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

export const ScreensToggle = create((set) => ({
    screen: "login",
    emailScreen: () => set({ screen: 'email' }),
    loginScreen: () => set({ screen: 'login' }),
    resetpasswordScreen: () => set({ screen: 'resetpassword' }),

}))

export const TodoStore = create((set) => ({
    todos: [],
    editingTodo: null,

    setTodo: (newTodo) => set({ todos: newTodo }),
    setEditingTodo: (todo) => set({ editingTodo: todo }),
    addTodo: (todo) => set((state) => ({

        todos: [...state.todos, todo]

    }))
    ,
    RemoveTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id)
    }))
    ,
    UpdateTodo: (id, updatedField) => set((state) => ({
        todos: state.todos.map((t) => t.id === id ? { ...t, ...updatedField } : t)
    })),
    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ),
        })),

}))


export const OpenTodo = create((set) => ({
    Todois: false,
    openTodo: () => set(() => ({ Todois: true })),
    closeTodo: () => set(() => ({ Todois: false }))
}))