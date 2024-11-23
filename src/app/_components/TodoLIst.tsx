"use client";

import { IconCircle, IconCircleCheck, IconStar, IconStarFilled } from "@tabler/icons-react";
import { useTodos } from "../hooks/useTodos";
import { useSingleTodoStore } from "../store/useSingleTodoStore";

export default function TodoList() {
  const { todos = [], toggleBoolean, isLoading, isError } = useTodos();
  const { setTodoItem } = useSingleTodoStore();

  return (
    <div className=" ">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading todos</p>
      ) : (
        <>
          <div className="p-4 ">
            <div className="flex flex-col gap-2">
              {todos.map((todo) => (
                <div key={`9aOnfYyr-${todo.id}`} className="border bg-white flex justify-between align-middle rounded-md p-3">
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
                    <button
                      onClick={() => {
                        setTodoItem(todo);
                      }}
                    >
                      Details
                    </button>

                    <button
                      onClick={() => {
                        toggleBoolean.mutate({ id: todo.id, field: "favorite" });
                      }}
                    >
                      {todo.favorite ? <IconStarFilled className="text-red-500" /> : <IconStar />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
          </div>
        </>
      )}
    </div>
  );
}
