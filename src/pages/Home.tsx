import { useState, useEffect } from 'react';
import { Check, Plus, Trash2, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import FilterButtons from '@/components/FilterButtons';
import { Todo } from '@/types';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, description?: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos([...todos, newTodo]);
    toast.success('Task added successfully!');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success('Task deleted successfully!');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    toast.success('Completed tasks cleared!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-2xl mx-auto px-4 py-6">
        <TodoInput onAddTodo={addTodo} />
        
        <div className="flex justify-between items-center my-6">
          <FilterButtons filter={filter} setFilter={setFilter} />
          
          {todos.some(todo => todo.completed) && (
            <button 
              onClick={clearCompleted}
              className="text-sm text-muted-foreground hover:text-error transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
        
        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
        
        {filteredTodos.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            {filter === 'all' ? (
              <p>No tasks yet. Add your first task above!</p>
            ) : filter === 'active' ? (
              <p>No active tasks. All caught up!</p>
            ) : (
              <p>No completed tasks yet.</p>
            )}
          </div>
        )}
        
        <div className="text-center text-xs text-muted-foreground mt-8">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'} • 
          {todos.filter(t => !t.completed).length} remaining
        </div>
      </main>
    </div>
  );
};

export default Home;
