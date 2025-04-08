import { useState } from "react";

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

// Component for Todo List
export function TodoListSelectFilter() {
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

  /*** ✅ Selection Logic ***/
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);

  function toggleSelectTodo(todo: Todo) {
    setSelectedTodos((prev) =>
      prev.includes(todo.id) ? prev.filter((id) => id !== todo.id) : [...prev, todo.id]
    );
  }

  function toggleSelectAll() {
    setSelectedTodos((prev) =>
      prev.length === todosQuery.data.length ? [] : todosQuery.data.map((todo) => todo.id)
    );
  }

  /*** ✅ Render Logic ***/
  if (todosQuery.isLoading) {
    return <p>Loading todos...</p>;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="rounded-lg border p-4 text-[0.9375rem]">
      <h2 className="text-xl font-semibold">Todo List Select Filter</h2>

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
