"use client";
import AllTodoList from "./_components/AllTodoList";
import { create } from "zustand";
import { useTodos } from "./hooks/useTodos";
import SingleTodo from "./_components/SingleTodo";
import { useSingleTodoStore } from "./store/useSingleTodoStore";
import { IconPlus } from "@tabler/icons-react";

type TodoStore = {
  title: string;
  setTitle: (newTitle: string) => void;
};

const useTodoStore = create<TodoStore>()((set) => ({
  title: "",
  setTitle: (newTitle) => set(() => ({ title: newTitle })),
}));

export default function Home() {
  const { title, setTitle } = useTodoStore();
  const { createTodo } = useTodos();
  const { todoItem } = useSingleTodoStore();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("test");
    if (title.length) {
      createTodo.mutate({ title });
      setTitle("");
    }
  };

  return (
    <main className="h-full border mx-auto max-w-[2000px] flex ">
      <div className=" relative  flex flex-1 flex-col  h-full  ">
        <div className="p-4 border-b ">
          <p className="text-lg font-semibold ">Tasks</p>
        </div>
        <div className="flex-1  overflow-y-scroll bg-slate-50 ">
          <AllTodoList />
        </div>
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state
                placeholder="Add a todo"
                className="border border-gray-300 py-2  rounded pl-10 w-full"
              />
              <div className="absolute right-1 inset-y-0 flex  items-center ">
                <button className="bg-slate-500 text-white py-1 px-3 rounded ">Enter</button>
              </div>
              <div className="absolute left-2 inset-y-0 flex  items-center ">
                <IconPlus />
              </div>
            </div>
          </form>
        </div>
      </div>
      {todoItem !== null && <SingleTodo />}
    </main>
  );
}
