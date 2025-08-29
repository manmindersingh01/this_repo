import { Button } from '@/components/ui/button';

interface FilterButtonsProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const FilterButtons = ({ filter, setFilter }: FilterButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('all')}
        className={filter === 'all' ? 'todo-filter-button-active' : 'todo-filter-button'}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('active')}
        className={filter === 'active' ? 'todo-filter-button-active' : 'todo-filter-button'}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'todo-filter-button-active' : 'todo-filter-button'}
      >
        Completed
      </Button>
    </div>
  );
};

export default FilterButtons;
