"use client";

import { IconCircle, IconCircleCheck, IconStar, IconStarFilled } from "@tabler/icons-react";
import { useTodos } from "../hooks/useTodos";

export default function TodoList() {
  const { todos = [], deleteTodo, toggleBoolean, isLoading, isError } = useTodos();

  return (
    <div className=" ">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading todos</p>
      ) : (
        <>
          <div>
            <div className="flex flex-col gap-3 pt-5">
              {todos.map((todo) => (
                <div key={`9aOnfYyr-${todo.id}`} className="border flex justify-between align-middle rounded-md p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        console.log(todo.id);
                        toggleBoolean.mutate({ id: todo.id, field: "done" });
                      }}
                    >
                      {todo.done ? <IconCircle /> : <IconCircleCheck className="text-green-500" />}
                    </button>
                    <div>{todo.title}</div>
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => {
                        console.log(todo.id);
                        deleteTodo.mutate({ id: todo.id });
                      }}
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        console.log(todo.id);
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
