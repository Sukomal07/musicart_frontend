import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helper/AxiosInstance.js'

const initialState = {
    cart: []
}

export const addToCart = createAsyncThunk('/cart/add', async (data) => {
    try {
        const res = axiosInstance.post('/product/add', data)
        toast.dismiss()
        toast.promise(res, {
            loading: "Wait...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

export const getCart = createAsyncThunk('/cart/get', async () => {
    try {
        const res = await axiosInstance.get('/user/cart')
        return res.data
    } catch (error) {
        console.log(error.message)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action?.payload?.data
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cart = action?.payload?.data
            })
    }
})

export default cartSlice.reducer