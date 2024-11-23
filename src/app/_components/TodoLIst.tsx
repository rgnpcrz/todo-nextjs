"use client";
import { trpc } from "../_trpc/client";
import { IconCircle, IconCircleCheck, IconStack, IconStar, IconStarFilled } from "@tabler/icons-react";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();

  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const toggleBoolean = trpc.toggleBoolean.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  return (
    <div className=" ">
      {getTodos.isLoading ? (
        <p>Loading...</p>
      ) : getTodos.isError ? (
        <p>Error loading todos</p>
      ) : (
        <>
          <div>
            <div className="flex flex-col gap-3 pt-5">
              {getTodos.data.map((todo) => (
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
                      {todo.favorite ? <IconStar /> : <IconStarFilled className="text-red-500" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
