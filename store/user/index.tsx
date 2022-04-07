import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { RootState } from "store";
import { definitions } from "types/supabase";

//#region actions

export const fetchUserProfile = createAsyncThunk<
  definitions["profiles"],
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

export const uploadAvatarImage = createAsyncThunk<
  string | undefined,
  { filePath: string; file: any },
  { state: RootState }
>(
  "user/profile/avatar_url",
  async ({ filePath, file }, { getState, rejectWithValue }) => {
    const { owner, avatar_url } = getUserProfile(getState());

    // If the user has an existing avatar image => remove it
    if (avatar_url) {
      let { error } = await supabaseClient.storage
        .from("avatars")
        .remove([avatar_url]);

      if (error) rejectWithValue(avatar_url);
    }

    // Upload image
    let { data, error: uploadError } = await supabaseClient.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) rejectWithValue("");
    if (!data) rejectWithValue("");

    const url = data?.Key.replace("avatars/", "");

    // Update profile
    await supabaseClient
      .from("profiles")
      .update({ avatar_url: url })
      .eq("owner", owner);

    return url;
  }
);

//#endregion

//#region state

type UserState = {
  loggedIn: boolean;
  loadingLoginStatus: boolean;
  email: string;
  profile: {
    state: "init" | "loading" | "loaded" | "error";
    uploadingAvatarImage: boolean;
  } & definitions["profiles"];
};

const initialState: UserState = {
  loggedIn: false,
  loadingLoginStatus: true,
  email: "",
  profile: { state: "init", uploadingAvatarImage: false, owner: "" },
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

    builder.addCase(uploadAvatarImage.pending, (state) => {
      state.profile.uploadingAvatarImage = true;
    });
    builder.addCase(uploadAvatarImage.rejected, (state, { payload }) => {
      state.profile.uploadingAvatarImage = false;
      state.profile.avatar_url = payload as string;
    });
    builder.addCase(uploadAvatarImage.fulfilled, (state, { payload }) => {
      state.profile.uploadingAvatarImage = false;
      state.profile.avatar_url = payload;
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

export const getUserAvatarUrl = (state: RootState) =>
  state.user.profile.avatar_url;

//#endregion
