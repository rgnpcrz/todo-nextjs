import { TodoItem } from "@/types";
import { create } from "zustand";

type TodoState = {
  todoItem: TodoItem;
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
