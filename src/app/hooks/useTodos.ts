import { trpc } from "@/app/_trpc/client";

export const useTodos = () => {
  const getTodos = trpc.getTodos.useQuery();
  const getTodoById = (id: number) => {
    return trpc.getTodoById.useQuery({ id }, { enabled: !!id });
  };
  const createTodo = trpc.createTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
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

  const updateTodo = trpc.updateTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  return {
    todos: getTodos.data,
    isLoading: getTodos.isLoading,
    isError: getTodos.isError,
    getTodoById,
    createTodo,
    deleteTodo,
    toggleBoolean,
    updateTodo,
  };
};
