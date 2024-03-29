import { configureStore } from '@reduxjs/toolkit'

import Authslice from './slices/Authslice.js'
import CartSlice from './slices/CartSlice.js'
import InvoiceSlice from './slices/InvoiceSlice.js'
import ProductSlice from './slices/ProductSlice.js'

const store = configureStore({
    reducer: {
        auth: Authslice,
        product: ProductSlice,
        cart: CartSlice,
        invoices: InvoiceSlice
    },
    devTools: true
})

export default store