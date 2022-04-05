import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { RootState } from "store";
import { definitions } from "types/supabase";

//#region actions

export const fetchUserProfile = createAsyncThunk<
  Promise<definitions["profiles"]>,
  undefined
>("user/profile", async () => {
  let { data, error } = await supabaseClient
    .from<definitions["profiles"]>("profiles")
    .select("*")
    .single();

  if (error) throw error;
  if (!data) throw new Error("No data");

  return data;
});

//#endregion

//#region state

type UserState = {
  loggedIn: boolean;
  loadingLoginStatus: boolean;
  email: string;
  profile: {
    state: "init" | "loading" | "loaded" | "error";
  } & definitions["profiles"];
};

const initialState: UserState = {
  loggedIn: false,
  loadingLoginStatus: true,
  email: "",
  profile: { state: "init", owner: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.loggedIn = payload;
    },
    setLoginStatusLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingLoginStatus = payload;
    },
    setMainEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.profile.state = "loading";
    });

    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.profile.state = "error";
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.profile = { ...state.profile, state: "loaded", ...payload };
    });
  },
});

export const { setUserLoggedIn, setLoginStatusLoading, setMainEmail } =
  userSlice.actions;

export default userSlice.reducer;

//#endregion

//#region selectors

export const getUserLoggedIn = (state: RootState) => state.user.loggedIn;

export const getUserLoginLoadingState = (state: RootState) =>
  state.user.loadingLoginStatus;

export const getUserEmail = (state: RootState) => state.user.email;

export const getUserProfile = (state: RootState) => state.user.profile;

//#endregion
