import { create } from "zustand";

type TodoState = {
  todoItem: {
    id: number;
    title: string;
    done: boolean;
    favorite: boolean;
    note: string;
    createdAt: string;
  };
  showItem: boolean;
  setTodoItem: (todo: TodoState["todoItem"]) => void;
  updateTodoField: (field: string, value: any) => void;
  closeItem: () => void;
  openItem: (todo: TodoState["todoItem"]) => void;
};

export const useSingleTodoStore = create<TodoState>((set) => ({
  todoItem: { id: 0, title: "", done: false, favorite: false, note: "", createdAt: "" },
  showItem: false,
  setTodoItem: (todo) => set({ todoItem: todo, showItem: true }),
  updateTodoField: (field, value) =>
    set((state) => ({
      todoItem: { ...state.todoItem, [field]: value },
    })),
  closeItem: () => set({ showItem: false, todoItem: { id: 0, title: "", done: false, favorite: false, note: "", createdAt: "" } }),
  openItem: (todo) => set({ showItem: true, todoItem: todo }),
}));

//V1
// import { create } from "zustand";

// type TodoItem = {
//   id: number;
//   title: string;
//   done: boolean;
//   favorite: boolean;
//   note: string | null;
//   createdAt: string;
//   deletedAt: string | null;
// };

// type TodoStore = {
//   todoItem: TodoItem | null;
//   showItem: boolean;
//   setTodoItem: (todo: TodoItem | null) => void;
//   toggleShowItem: () => void;
//   closeItem: () => void;
//   resetTodoItem: () => void;
// };

// export const useSingleTodoStore = create<TodoStore>((set) => ({
//   todoItem: null,
//   showItem: false,
//   setTodoItem: (todo) => set({ todoItem: todo, showItem: true }),
//   toggleShowItem: () => set((state) => ({ showItem: !state.showItem })),
//   closeItem: () => set(() => ({ showItem: false })),
//   resetTodoItem: () => set({ todoItem: null, showItem: false }),
// }));
