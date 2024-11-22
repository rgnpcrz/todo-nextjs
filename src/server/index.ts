import prisma from "@/lib/prisma";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos;
  }),
  deleteTodo: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const { id } = input;

    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });

    return deletedTodo;
  }),
  toggleDone: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const { id } = input;

    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      throw new Error("Todo not found");
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        done: !todo.done,
      },
    });

    return updatedTodo;
  }),

  createTodo: publicProcedure.input(z.object({ title: z.string().min(1, "Title is required") })).mutation(async ({ input }) => {
    const { title } = input;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        done: false,
      },
    });
    return newTodo;
  }),
});

export type AppRouter = typeof appRouter;

// import { publicProcedure, router } from "./trpc";

// export const appRouter = router({
//   todoList: publicProcedure.query(async () => {
//     return [10, 20, 30, 40, 50];
//   }),
// });

// export type AppRouter = typeof appRouter;
