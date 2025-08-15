import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: {
        email: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        role: string;
    } | null;
    loading: boolean;
    error: string | null;
    checked: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
    checked: false
};

const userAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.checked = true;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.checked = true;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.checked = true
        },
    },
});

export const { setUser, setLoading, setError, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;