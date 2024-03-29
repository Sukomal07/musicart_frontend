import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helper/AxiosInstance.js'

const initialState = {
    invoices: []
}

export const checkout = createAsyncThunk('/product/checkout', async (data) => {
    try {
        const res = axiosInstance.post("/invoice/create_invoice", data)
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

export const getInvoices = createAsyncThunk('/invoice/get', async () => {
    try {
        const res = await axiosInstance.get('/invoice/allInvoice')
        return res.data
    } catch (error) {
        console.log(error.message)
    }
})

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvoices.fulfilled, (state, action) => {
                state.invoices = action?.payload?.data
            })
    }
})

export default invoiceSlice.reducer