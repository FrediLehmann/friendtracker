import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: 'user',
  initialState: { loggedIn: false, loadingLoginStatus: true, email: '' },
  reducers: {
    setUserLoggedIn: (state, { payload }: PayloadAction<boolean>) => { state.loggedIn = payload },
    setLoginStatusLoading: (state, { payload }: PayloadAction<boolean>) => { state.loadingLoginStatus = payload },
    setMainEmail: (state, { payload }: PayloadAction<string>) => { state.email = payload }
  }
})

export const { setUserLoggedIn, setLoginStatusLoading, setMainEmail } = userSlice.actions

export default userSlice.reducer