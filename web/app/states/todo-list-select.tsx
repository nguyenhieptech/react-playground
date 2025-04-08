import { useEffect, useState } from "react";

// Define Todo interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Simulating a custom hook (replace this with actual useTodos)
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
export function TodoListSelect() {
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
  const [selectedTodoItems, setSelectedTodoItems] = useState<Todo[]>([]);

  function toggleSelectTodo(todo: Todo) {
    setSelectedTodos((prev) =>
      prev.includes(todo.id) ? prev.filter((id) => id !== todo.id) : [...prev, todo.id]
    );
  }

  function toggleSelectAll() {
    if (selectedTodos.length === todosQuery.data.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(todosQuery.data.map((todo) => todo.id));
    }
  }

  useEffect(
    function syncSelectedTodos() {
      setSelectedTodoItems(
        todosQuery.data.filter((todo) => selectedTodos.includes(todo.id))
      );
    },
    [selectedTodos, todosQuery.data]
  );

  /*** ✅ Render Logic ***/
  if (todosQuery.isLoading) {
    return <p>Loading todos...</p>;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Todo List</h2>

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
        {filteredTodos.map(function (todo) {
          return (
            <li key={todo.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTodos.includes(todo.id)}
                onChange={function () {
                  toggleSelectTodo(todo);
                }}
              />
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>

      {/* Stats */}
      <p className="mt-4 text-sm text-gray-600">
        Selected: {selectedTodos.length}/{filteredTodos.length}
      </p>

      {/* Selected Todo Items */}
      <div className="mt-3">
        <h3 className="text-md font-semibold">Selected Todos:</h3>
        <ul className="text-sm text-gray-700">
          {selectedTodoItems.map(function (todo) {
            return <li key={todo.id}>{todo.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
