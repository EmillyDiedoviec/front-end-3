import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import NoteType from '../../types/NoteType';

const adapter = createEntityAdapter<NoteType>({ selectId: (note) => note.id });

export const NotesSlice = createSlice({
    name: 'notes',
    initialState: adapter.getInitialState(),
    reducers: {
        addNote: adapter.addOne,
        removeNote: adapter.removeOne,
        editNote: adapter.setOne,
    },
});

export default NotesSlice.reducer;

export const { addNote, removeNote, editNote } = NotesSlice.actions;
export const { selectById: SelectNoteById, selectAll: SelectAllNotes } = adapter.getSelectors((state:RootState) => state.notes);