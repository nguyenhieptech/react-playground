import { useEffect, useState } from "react";

// Define Todo interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Simulating a custom hook (replace with real useTodos)
export function useTodos() {
  return {
    data: [
      { id: 1, text: "Buy groceries", completed: false },
      { id: 2, text: "Read a book", completed: true },
      { id: 3, text: "Go to the gym", completed: false },
      { id: 4, text: "Write code", completed: true },
      { id: 5, text: "Watch a movie", completed: false },
      { id: 6, text: "Learn React", completed: true },
      { id: 7, text: "Walk the dog", completed: false },
      { id: 8, text: "Call mom", completed: true },
      { id: 9, text: "Cook dinner", completed: false },
      { id: 10, text: "Plan vacation", completed: true },
    ],
    isLoading: false,
  };
}

// Local Storage Helpers
function loadSelectedTodos(): number[] {
  const stored = localStorage.getItem("selectedTodos");
  return stored ? JSON.parse(stored) : [];
}

function saveSelectedTodos(selected: number[]): void {
  localStorage.setItem("selectedTodos", JSON.stringify(selected));
}

// Component for Todo List
export function TodoListPersistStorage() {
  const todosQuery = useTodos();

  /*** ✅ Filtering Logic ***/
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  function toggleShowCompleted() {
    setShowCompleted((prev) => !prev);
  }

  function getFilteredTodos() {
    return showCompleted
      ? todosQuery.data.filter((todo) => todo.completed)
      : todosQuery.data;
  }

  /*** ✅ Selection Logic (with Persistence) ***/
  const [selectedTodos, setSelectedTodos] = useState<number[]>(loadSelectedTodos);

  function toggleSelectTodo(todo: Todo) {
    setSelectedTodos((prev) => {
      const newSelected = prev.includes(todo.id)
        ? prev.filter((id) => id !== todo.id)
        : [...prev, todo.id];

      saveSelectedTodos(newSelected);
      return newSelected;
    });
  }

  function toggleSelectAll() {
    setSelectedTodos((prev) => {
      const newSelected =
        prev.length === todosQuery.data.length
          ? []
          : todosQuery.data.map((todo) => todo.id);

      saveSelectedTodos(newSelected);
      return newSelected;
    });
  }

  /*** ✅ Sync Selection on Mount ***/
  useEffect(function syncWithLocalStorage() {
    setSelectedTodos(loadSelectedTodos());
  }, []);

  /*** ✅ Render Logic ***/
  if (todosQuery.isLoading) {
    return <p>Loading todos...</p>;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="rounded-lg border p-4 text-[0.9375rem]">
      <h2 className="text-xl font-semibold">Todo List Persist Storage</h2>

      {/* Select All */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedTodos.length === todosQuery.data.length}
          onChange={toggleSelectAll}
        />
        <label>Select All</label>
      </div>

      {/* Show Completed Todos */}
      <div className="mt-2 flex items-center space-x-2">
        <input type="checkbox" checked={showCompleted} onChange={toggleShowCompleted} />
        <label>Show Completed Todos</label>
      </div>

      {/* Todo List */}
      <ul className="mt-3">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedTodos.includes(todo.id)}
              onChange={() => toggleSelectTodo(todo)}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>

      {/* Stats */}
      <p className="mt-4 text-sm text-gray-600">
        Selected: {selectedTodos.length}/{filteredTodos.length}
      </p>
    </div>
  );
}
