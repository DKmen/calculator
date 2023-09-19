import { configureStore } from '@reduxjs/toolkit'
import { keyReducer } from './container/keys'

export const store = configureStore({
    reducer: {
        keys: keyReducer
    },
})