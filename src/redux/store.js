import { configureStore } from '@reduxjs/toolkit'

import Authslice from './slices/Authslice.js'
import ProductSlice from './slices/ProductSlice.js'

const store = configureStore({
    reducer: {
        auth: Authslice,
        product: ProductSlice
    },
    devTools: true
})

export default store