import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Todo } from '@/types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <AnimatePresence initial={false}>
      {todos.map((todo) => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="group todo-card"
        >
          <div className="flex items-center gap-3">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              className="todo-checkbox"
            />
            <div className="flex-1">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`todo-task-title ${todo.completed ? 'todo-completed-text' : ''}`}
              >
                {todo.text}
              </label>
              {todo.description && (
                <p className={`todo-task-description ${todo.completed ? 'todo-completed-text' : ''}`}>
                  {todo.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-error"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default TodoList;
