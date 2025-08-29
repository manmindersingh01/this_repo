import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TodoInputProps {
  onAddTodo: (text: string, description?: string) => void;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text, description);
      setText('');
      setDescription('');
      setIsOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input flex-1"
        />
        <Button type="submit" className="todo-button-primary">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add task</span>
        </Button>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="text-xs text-muted-foreground hover:text-foreground transition-colors p-0"
          >
            {isOpen ? 'Hide details' : 'Add details'}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description or notes (optional)"
            className="min-h-[80px] resize-none"
          />
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
};

export default TodoInput;
