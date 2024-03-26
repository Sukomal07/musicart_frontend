import { configureStore } from '@reduxjs/toolkit'

import Authslice from './slices/Authslice.js'
import CartSlice from './slices/CartSlice.js'
import ProductSlice from './slices/ProductSlice.js'

const store = configureStore({
    reducer: {
        auth: Authslice,
        product: ProductSlice,
        cart: CartSlice
    },
    devTools: true
})

export default store