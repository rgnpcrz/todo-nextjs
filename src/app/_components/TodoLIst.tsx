"use client";

import { IconCircle, IconCircleCheck, IconLoader2, IconNote, IconStar, IconStarFilled } from "@tabler/icons-react";
import { useTodos } from "../hooks/useTodos";
import { useSingleTodoStore } from "../store/useSingleTodoStore";
import { TodoItem } from "@/types";

export default function TodoList() {
  const { todos = [], toggleBoolean, isLoading, isError } = useTodos();
  const { setTodoItem, todoItem } = useSingleTodoStore();

  return (
    <>
      {isLoading ? (
        <div className="p-4 border h-full flex items-center justify-center">
          <IconLoader2 className="animate-spin text-gray-500" />
        </div>
      ) : isError ? (
        <p className="p-4">Error loading todos</p>
      ) : (
        <>
          <div className="p-4 ">
            <div className="flex flex-col gap-2">
              {todos.map((todo: TodoItem) => (
                <div key={`9aOnfYyr-${todo.id}`} className="border relative bg-white flex justify-between align-middle rounded-md p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        console.log(todo.id);
                        toggleBoolean.mutate({ id: todo.id, field: "done" });
                      }}
                    >
                      {todo.done ? <IconCircleCheck className="text-green-500" /> : <IconCircle />}
                    </button>
                    <div>
                      <p className={`${todo.done ? "line-through text-gray-700" : ""}`}>{todo.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    {todo.note !== "" ? (
                      <div>
                        <IconNote className="text-gray-400" />
                      </div>
                    ) : null}
                    <button
                      className="border  px-2 rounded-md"
                      onClick={() => {
                        setTodoItem(todo);
                      }}
                    >
                      View todo
                    </button>

                    <button
                      onClick={() => {
                        toggleBoolean.mutate({ id: todo.id, field: "favorite" });
                      }}
                    >
                      {todo.favorite ? <IconStarFilled className="text-red-500" /> : <IconStar />}
                    </button>
                  </div>
                  {todo.id === todoItem.id ? <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300/50"> </div> : null}
                </div>
              ))}
            </div>
            {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
          </div>
        </>
      )}
    </>
  );
}
