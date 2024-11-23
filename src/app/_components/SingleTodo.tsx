"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SingleTodo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract `todoId` from the query parameters
  const todoId = searchParams.get("todoId");

  // State to manage the div visibility
  const [isOpen, setIsOpen] = useState(false);

  // Open the div when `todoId` is present, close it otherwise
  useEffect(() => {
    setIsOpen(!!todoId);
    console.log("todoId: ", todoId);
  }, [todoId]);

  // Function to close the div and remove `todoId` from the URL
  const handleClose = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("todoId"); // Remove the `todoId` parameter
    router.push(`?${currentParams.toString()}`); // Update the URL
  };

  return (
    <div className="relative">
      {/* Background Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={handleClose}></div>}

      {/* Sliding Div */}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 z-20 ${isOpen ? "w-[500px]" : "w-0"} overflow-hidden`}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={handleClose}>
          X
        </button>

        {/* Content Area */}
        {todoId && (
          <div className="p-4">
            <h2 className="text-xl font-bold">Todo Details</h2>
            <p>Displaying details for Todo ID: {todoId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
