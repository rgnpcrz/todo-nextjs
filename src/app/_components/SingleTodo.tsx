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

// v2
// "use client";

// import { IconStar, IconStarFilled, IconTrash, IconX } from "@tabler/icons-react";

// import { useTodos } from "../hooks/useTodos";
// import { useSingleTodoStore } from "../store/useSingleTodoStore";
// import { trpc } from "../_trpc/client";

// export default function SingleTodo() {
//   const { showItem, todoItem, closeItem } = useSingleTodoStore();
//   const { toggleBoolean, deleteTodo } = useTodos();
//   if (todoItem === null) return null;
//   console.log(todoItem?.id);

//   const {
//     data: fetchedTodo = todoItem,
//     isLoading,
//     isError,
//   } = trpc.getTodoById.useQuery({
//     id: todoItem.id,
//   });
//   console.log("todo: ", fetchedTodo);

//   return (
//     <div className="overflow-x-hidden">
//       <div className={`px-4 h-full w-[500px] flex gap-5 flex-col bg-slate-100 duration-200 ${showItem ? "" : " -mr-[500px]"}`}>
//         <div className="flex justify-end pt-4">
//           <button onClick={closeItem}>
//             <IconX />
//           </button>
//         </div>
//         {fetchedTodo !== null ? (
//           <>
//             <div className="p-4 bg-white flex justify-between rounded-md border gap-3">
//               <p className="font-bold">{fetchedTodo.title}</p>
//               <div>
//                 <button
//                   onClick={() => {
//                     toggleBoolean.mutate({ id: fetchedTodo.id, field: "favorite" });
//                   }}
//                 >
//                   {fetchedTodo.favorite ? <IconStarFilled className="text-red-500" /> : <IconStar />}
//                 </button>
//               </div>
//             </div>
//             <div className="p-4 rounded-md bg-white border">
//               <pre>{JSON.stringify(fetchedTodo, null, 2)}</pre>
//             </div>
//             <div className="flex justify-between px-4 py-6 border-t-2 mt-auto">
//               <p className="font-bold">{fetchedTodo.createdAt}</p>

//               <button
//                 onClick={() => {
//                   deleteTodo.mutate({ id: fetchedTodo.id });
//                   closeItem();
//                 }}
//               >
//                 <IconTrash />
//               </button>
//             </div>
//           </>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// v1
// "use client";

// import { IconStar, IconStarFilled, IconTrash, IconX } from "@tabler/icons-react";
// import { useTodoStore } from "../store/useTodoStore";
// import { useTodos } from "../hooks/useTodos";
// import { trpc } from "../_trpc/client";

// export default function SingleTodo() {
//   const { showItem, todoItem, closeItem } = useTodoStore();
//   const { toggleBoolean, deleteTodo } = useTodos();

//   if (todoItem === null) return null;

//   if (!todoItem) {
//     return <div>No todo selected</div>;
//   }
//   const { data: fetchedTodo, isLoading, error } = trpc.getTodoById.useQuery({ id: todoItem.id });
//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: </div>;

//   return (
//     <div className="overflow-x-hidden">
//       <div className={`p-4 h-full w-[500px] bg-slate-100 duration-200 ${showItem ? "" : "  -mr-[500px]"} `}>
//         <div className="flex justify-end">
//           <button onClick={() => closeItem()}>
//             <IconX />
//           </button>
//         </div>
//         {fetchedTodo != null ? (
//           <>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => {
//                   deleteTodo.mutate({ id: fetchedTodo.id });
//                   closeItem();
//                 }}
//               >
//                 <IconTrash />
//               </button>
//             </div>
//             <div className="p-4 bg-white flex  gap-3">
//               <p className="font-bold">{fetchedTodo.title}</p>
//               <div>
//                 <button
//                   onClick={() => {
//                     toggleBoolean.mutate({ id: fetchedTodo.id, field: "favorite" });
//                   }}
//                 >
//                   {fetchedTodo.favorite ? <IconStarFilled className="text-red-500" /> : <IconStar />}
//                 </button>
//               </div>
//             </div>
//             <pre>{JSON.stringify(showItem)}</pre>
//             <pre>{JSON.stringify(fetchedTodo, null, 2)}</pre>
//           </>
//         ) : null}
//       </div>
//     </div>
//   );
// }
