import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosInstance from '../../helper/AxiosInstance.js'


const initialState = {
    product: []
}

export const getAllProduct = createAsyncThunk('/product/all', async () => {
    try {
        const res = await axiosInstance.get('/product/allproduct')
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})
export const searchProduct = createAsyncThunk('/product/search', async (data) => {
    try {
        const res = await axiosInstance.get(`/product/search?q=${data}`)
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})

export const filterProducts = createAsyncThunk('/product/filter', async (filters) => {
    try {
        const params = new URLSearchParams(filters)
        const res = await axiosInstance.get(`/product/filter?${params}`)
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})

export const checkout = createAsyncThunk('/product/checkout', async (data) => {
    try {
        const res = await axiosInstance.post("/invoice/create_invoice", data)
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.product = action?.payload?.data
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.product = action?.payload?.data
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.product = action?.payload?.data
            })
    }
})

export default productSlice.reducer