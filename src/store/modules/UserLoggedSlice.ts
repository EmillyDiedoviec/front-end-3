import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import userType from '../../types/UserType';

interface userState {
    user: userType;
}
const initialState: userState = {
    user: { email: '', password: '', notes: [] }
};
export const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        setuserLogged: (state, action: PayloadAction<userType>) => {
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
            state.user.notes.push(...action.payload.notes);
        }
    }
});

export default userLoggedSlice.reducer;
export const { setuserLogged } = userLoggedSlice.actions;
