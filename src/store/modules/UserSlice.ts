import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import userType from '../../types/UserType';

const adapter = createEntityAdapter<userType>({
    selectId: item => item.email
});

const usersSlice = createSlice({
    name: 'usuarios',
    initialState: adapter.getInitialState(),
    reducers: {
        salvarLocalStorage: (state, action) => {
            const retorno = adapter.addOne(state, action.payload);

            localStorage.setItem('retorno', JSON.stringify(retorno));

            return retorno;
        },
        addUser: adapter.addOne
    }
});

export const { addUser } = usersSlice.actions;
export const { selectAll: selectAllUsers } = adapter.getSelectors((state: RootState) => state.users);
export default usersSlice.reducer;
