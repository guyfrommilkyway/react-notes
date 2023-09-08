// import packages below
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// import utils below
import { Notes } from '@/common/types/note-types';
import { getCurrentDT } from '@/common/utils/getCurrentDT';

const initialState: Notes = {
  notes: [],
  trash: [],
  archive: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    create(state, action) {
      state.notes = [
        { ...action.payload, id: uuidv4(), dateCreated: getCurrentDT(), dateUpdated: getCurrentDT() },
        ...state.notes,
      ];
    },
    update(state, action) {
      state.notes = state.notes.map(note =>
        action.payload.id === note.id ? { ...action.payload, dateUpdated: getCurrentDT() } : note,
      );
    },
    move(state, action) {
      switch (action.payload.from) {
        case 'NOTES':
          state.notes = state.notes.filter(note => action.payload.data.id !== note.id);
          break;
        case 'ARCHIVE':
          state.archive = state.archive.filter(note => action.payload.data.id !== note.id);
          break;
        default:
          break;
      }

      state.trash.unshift(action.payload.data);
    },
    archive(state, action) {
      state.notes = state.notes.filter(note => action.payload.data.id !== note.id);
      state.archive.unshift(action.payload.data);
    },
    unarchive(state, action) {
      state.archive = state.archive.filter(note => action.payload.data.id !== note.id);
      state.notes.unshift(action.payload.data);
    },
    restore(state, action) {
      state.trash = state.trash.filter(note => action.payload.data.id !== note.id);
      state.notes.unshift(action.payload.data);
    },
    remove(state, action) {
      state.trash = state.trash.filter(note => action.payload.id !== note.id);
    },
  },
});

export const { create, update, move, archive, unarchive, restore, remove } = notesSlice.actions;
export default notesSlice.reducer;
