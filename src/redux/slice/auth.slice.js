import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn:false,
    status:false,
    name:null,
    surname:null
}
export const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        signIn: (state,action) => {
            state.loggedIn = action.payload.loggedIn
            state.name = action.payload?.name
            state.surname = action.payload?.surname
            state.status = true
        },
        
    },
})

export const { signIn } = AuthSlice.actions;
export default AuthSlice.reducer