"use client";

import { IconCheck, IconStar, IconStarFilled, IconTrash, IconX } from "@tabler/icons-react";
import { useSingleTodoStore } from "../store/useSingleTodoStore";
import { useTodos } from "../hooks/useTodos";
import { formatDate } from "../utils/formatDate";

export default function SingleTodo() {
  const { todoItem, showItem, closeItem, updateTodoField } = useSingleTodoStore();
  const { updateTodo, deleteTodo } = useTodos();

  if (todoItem === null) return null;

  const handleToggleFavorite = () => {
    updateTodoField("favorite", !todoItem.favorite);
    updateTodo.mutate({
      id: todoItem.id,
      favorite: !todoItem.favorite,
    });
  };

  const handleToggleDone = () => {
    updateTodoField("done", !todoItem.done);
    updateTodo.mutate({
      id: todoItem.id,
      done: !todoItem.done,
    });
  };

  const handleUpdateTitle = (title: string) => {
    updateTodoField("title", title);
    updateTodo.mutate({
      id: todoItem.id,
      title,
    });
  };
  const handleUpdateNote = (note: string) => {
    updateTodoField("note", note);
    updateTodo.mutate({
      id: todoItem.id,
      note,
    });
  };

  const handleDelete = () => {
    deleteTodo.mutate({ id: todoItem.id });
    closeItem();
  };

  return (
    <div className="overflow-x-hidden border-l">
      <div className={` h-full w-[500px] flex  flex-col bg-slate-100 duration-200 ${showItem ? "" : " -mr-[500px]"}`}>
        <div className="flex justify-end p-4">
          <button onClick={closeItem}>
            <IconX />
          </button>
        </div>
        <div className=" flex-1 p-4 pt-0 overflow-y-scroll flex flex-col gap-5">
          <div className="flex justify-between">
            <button onClick={handleToggleDone} className={`flex rounded-md gap-3 px-4 py-2 bg-white border ${todoItem.done ? "text-green-500 border-green-500" : "Mark complete"}`}>
              <IconCheck />
              {todoItem.done ? "Completed" : "Mark complete"}
            </button>
            <button className="gap-3  p-2 bg-white border rounded-md" onClick={handleToggleFavorite}>
              {todoItem.favorite ? <IconStarFilled className="text-red-500" /> : <IconStar />}
            </button>
          </div>
          <div className=" bg-white flex justify-between rounded-md border gap-3">
            <input type="text" value={todoItem.title} onChange={(e) => handleUpdateTitle(e.target.value)} className="font-bold p-4 border-none bg-transparent  w-full" />
          </div>
          <div className=" bg-white flex justify-between rounded-md border gap-3">
            <textarea placeholder="Add note here" value={todoItem.note || ""} onChange={(e) => handleUpdateNote(e.target.value)} className=" min-h-64 border-none bg-transparent p-4  w-full" />
          </div>

          {/* <div className="p-4 rounded-md bg-white border">
            <pre>{JSON.stringify(todoItem, null, 2)}</pre>
          </div> */}
        </div>
        <div className="flex justify-between px-4 py-6 border-t-2 mt-auto">
          <p className="font-semibold">{formatDate(todoItem.createdAt)}</p>

          <button onClick={handleDelete}>
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
