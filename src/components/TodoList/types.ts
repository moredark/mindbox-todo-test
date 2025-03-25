import { Todo } from "../../types";

export interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  isEmpty: boolean;
}
