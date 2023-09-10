// import packages below
import { useCallback, useState } from 'react';

// import utils below
import { Note } from '@/types/note-types';

const useSelect = () => {
  const [selected, setSelected] = useState<Note | null>(null);

  const selectHandler = useCallback((note: Note | null) => setSelected(note), []);

  const clearSelectHandler = useCallback(() => setSelected(null), []);

  return { selected, selectHandler, clearSelectHandler };
};

export default useSelect;
