"use client";
import TodoList from "./_components/TodoList";
import { create } from "zustand";
import { useTodos } from "./hooks/useTodos";
import SingleTodo from "./_components/SingleTodo";
import { useSingleTodoStore } from "./store/useSingleTodoStore";

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
      <div className=" relative  flex flex-1 flex-col  border h-full  ">
        <div className="py-4 border px-4">
          <p className="text-lg font-semibold ">Tasks</p>
        </div>
        <div className="flex-1 overflow-y-scroll bg-slate-50 ">
          <TodoList />
        </div>
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state
                placeholder="Enter todo title"
                className="border border-gray-300 p-2 rounded pl-8 w-full"
              />
              <div className="absolute right-1 inset-y-0 flex  items-center ">
                <button className="bg-blue-500 text-white py-1 px-3 rounded ">Enter</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {todoItem !== null && <SingleTodo />}
    </main>
  );
}

// V2
// "use client";
// import { useState } from "react";
// import { trpc } from "./_trpc/client";

// export default function Home() {
//   const [title, setTitle] = useState("");
//   const todoList = trpc.getTodos.useQuery();
//   const createTodo = trpc.createTodo.useMutation();

//   // Handle form submission
//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (title.trim()) {
//       try {
//         await createTodo.mutateAsync({ title }); // Create the todo
//         setTitle(""); // Reset input field
//       } catch (error) {
//         console.error("Error creating todo:", error);
//       }
//     } else {
//       alert("Title is required!"); // Alert if title is empty
//     }
//   };

//   return (
//     <div>
//       <h1>Home</h1>

//       <form onSubmit={handleCreate} className="mb-4 flex items-center gap-2">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)} // Update title state
//           placeholder="Enter todo title"
//           className="border border-gray-300 p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Todo
//         </button>
//       </form>

//       {/* Display loading or error state */}
//       {todoList.isLoading ? (
//         <p>Loading...</p>
//       ) : todoList.isError ? (
//         <p>Error loading todos</p>
//       ) : (
//         <pre>{JSON.stringify(todoList.data, null, 2)}</pre> // Render todos
//       )}
//     </div>
//   );
// }

// V1
// "use client";
// import { trpc } from "./_trpc/client";

// export default function Home() {
//   const todoList = trpc.getTodos.useQuery();

//   return (
//     <div>
//       <div>
//         <h1>Home</h1>
//         <pre>{JSON.stringify(todoList.data, null, 2)}</pre> {/* Render todos */}
//       </div>
//     </div>
//   );
// }

// const [todos, setTodos] = useState([]); // State to store todos
// const [isLoading, setIsLoading] = useState(true); // Loading state
// const [isError, setIsError] = useState(false); // Error state

// useEffect(() => {
//   // Fetch todos on component mount
//   const fetchTodos = async () => {
//     setIsLoading(true); // Set loading to true
//     setIsError(false); // Reset error state

//     try {
//       const data = await trpc.todoList.useQuery();
//       setTodos(data); // Set fetched todos to state
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//       setIsError(true); // Set error state to true if fetch fails
//     } finally {
//       setIsLoading(false); // Set loading to false after fetch completes
//     }
//   };

//   fetchTodos();
// }, []); // Empty dependency array ensures this runs only once when the component mounts

// if (isLoading) return <p>Loading...</p>; // Show a loading state
// if (isError) return <p>Error loading todos.</p>; // Show an error state

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
