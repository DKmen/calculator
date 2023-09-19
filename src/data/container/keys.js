import { createSlice } from '@reduxjs/toolkit';
import status from '../../constant/status';

const initialState = {
    keys: [],
    status: status.IDLE,
}

export const keySlice = createSlice({
    name: 'key',
    initialState,
    reducers: {
        setKeys: (state, actions) => {
            state.keys = actions.payload
        },
        addKeys: (state, actions) => {
            state.keys = [...state.keys, actions.payload];
        }
    },
})
export const { setKeys, addKeys } = keySlice.actions

export const keyReducer = keySlice.reducer