import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helper/AxiosInstance.js'


const initialState = {
    data: JSON.parse(localStorage.getItem('user')) || {}
}

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("/user/signup", data);
        toast.dismiss()
        toast.promise(res, {
            loading: "Wait! Creating your account",
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

export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.dismiss()
        toast.promise(res, {
            loading: "Loading...",
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

export const logout = createAsyncThunk("auth/logout", async () => {
    toast.dismiss()
    try {
        const res = axiosInstance.post("/user/logout");
        toast.promise(res, {
            loading: "Loging out...",
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (buider) => {
        buider
            .addCase(createAccount.fulfilled, (state, action) => {
                state.data = action?.payload?.data
                if (action?.payload?.data) {
                    localStorage.setItem('user', JSON.stringify(state.data))
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action?.payload?.data
                if (action?.payload?.data) {
                    localStorage.setItem('user', JSON.stringify(state.data))
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.data = {}
                localStorage.removeItem('user')
            })
    }
})

export default authSlice.reducer