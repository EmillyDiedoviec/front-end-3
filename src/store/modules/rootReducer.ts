import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './UserSlice';
import userLoggedSlice from './UserLoggedSlice';
import NoteSlice from './NoteSlice';

export default combineReducers({
    users: userSlice,
    userLogged: userLoggedSlice,
    notes: NoteSlice
});


