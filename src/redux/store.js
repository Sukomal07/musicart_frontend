import { configureStore } from '@reduxjs/toolkit'

import Authslice from '../redux/slices/Authslice.js'

const store = configureStore({
    reducer: {
        auth: Authslice
    },
    devTools: true
})

export default store