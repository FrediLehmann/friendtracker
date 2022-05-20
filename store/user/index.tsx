import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { RootState } from "store";
import { definitions } from "types/supabase";

//#region actions

export const fetchUserProfile = createAsyncThunk<
  definitions["user_profiles"],
  string
>("user/profile", async (user_id) => {
  let { data, error } = await supabaseClient
    .from<definitions["user_profiles"]>("user_profiles")
    .select("*")
    .eq("user_id", user_id)
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
    const { user_id, avatar_url } = getUserProfile(getState());

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
      .from("user_profiles")
      .update({ avatar_url: url })
      .eq("user_id", user_id);

    return url;
  }
);

export const changeUserName = createAsyncThunk<
  string | undefined,
  string,
  { state: RootState }
>("user/profile/user_name", async (newName, { getState }) => {
  const { user_id, user_name } = getUserProfile(getState());

  let { error } = await supabaseClient
    .from("user_profiles")
    .update({ user_name: newName })
    .eq("user_id", user_id);

  if (error) return user_name;

  return newName;
});

export const fetchAdditionalEmailAddresses = createAsyncThunk<
  string[],
  undefined,
  { state: RootState }
>("user/email_addresses", async (_, { getState, rejectWithValue }) => {
  const { user_id } = getUserProfile(getState());

  let { data, error } = await supabaseClient
    .from<definitions["email_addresses"]>("email_addresses")
    .select("email_address")
    .eq("user_id", user_id);

  if (error) return rejectWithValue([]);

  const result: string[] = [];
  data?.forEach((d) => result.push(d.email_address));
  return result;
});

export const addEmailAddress = createAsyncThunk<
  string | undefined,
  string,
  { state: RootState }
>("user/email_addresses/add", async (additionalAddress, { getState }) => {
  const state = getState();
  const { user_id } = getUserProfile(state);
  const email = getUserEmail(state);
  const emails = getAdditionalUserEmails(state);

  if (email === additionalAddress) return;
  if (emails.includes(additionalAddress)) return;

  let { error } = await supabaseClient
    .from("email_addresses")
    .insert([{ user_id, email: additionalAddress }]);

  if (error) return;

  return additionalAddress;
});

export const removeEmailAddress = createAsyncThunk<
  string | undefined,
  string,
  { state: RootState }
>("user/email_addresses/remove", async (removeAddress, { getState }) => {
  const state = getState();
  const { user_id } = getUserProfile(state);
  const emails = getAdditionalUserEmails(state);

  if (!emails.includes(removeAddress)) return;

  let { error } = await supabaseClient
    .from("email_addresses")
    .delete()
    .match({ user_id, email: removeAddress });

  if (error) return;

  return removeAddress;
});

export const fetchPhoneNumbers = createAsyncThunk<
  string[],
  undefined,
  { state: RootState }
>("user/phone", async (_, { getState, rejectWithValue }) => {
  const { user_id } = getUserProfile(getState());

  let { data, error } = await supabaseClient
    .from<definitions["phone_numbers"]>("phone_numbers")
    .select("phone_number")
    .eq("user_id", user_id);

  if (error) return rejectWithValue([]);

  const result: string[] = [];
  data?.forEach((d) => d.phone_number && result.push(d.phone_number));
  return result;
});

export const addPhoneNumber = createAsyncThunk<
  string | undefined,
  string,
  { state: RootState }
>("user/phone/add", async (phone, { getState }) => {
  const { user_id } = getUserProfile(getState());

  let { error } = await supabaseClient
    .from("phone_numbers")
    .insert([{ user_id, phone }]);

  if (error) return;

  return phone;
});

export const removePhoneNumber = createAsyncThunk<
  string | undefined,
  string,
  { state: RootState }
>("user/phone/remove", async (removePhone, { getState }) => {
  const state = getState();
  const { user_id } = getUserProfile(state);
  const phones = getUserPhones(state);

  if (!phones.includes(removePhone)) return;

  let { error } = await supabaseClient
    .from("phone_numbers")
    .delete()
    .match({ user_id, phone: removePhone });

  if (error) return;

  return removePhone;
});

//#endregion

//#region state

type UserState = {
  loggedIn: boolean;
  loadingLoginStatus: boolean;
  email: string;
  emails: string[];
  emailsLoaded: boolean;
  phones: string[];
  phonesLoaded: boolean;
  profile: {
    state: "init" | "loading" | "loaded" | "error";
    uploadingAvatarImage: boolean;
  } & definitions["user_profiles"];
};

const initialState: UserState = {
  loggedIn: false,
  loadingLoginStatus: true,
  email: "",
  emails: [],
  emailsLoaded: false,
  phones: [],
  phonesLoaded: false,
  profile: {
    id: 1,
    state: "init",
    uploadingAvatarImage: false,
    user_id: "",
    profile_hash: "",
  },
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
    setUserName: (state, { payload }: PayloadAction<string>) => {
      state.profile.user_name = payload;
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

    builder.addCase(changeUserName.rejected, (state, { payload }) => {
      state.profile.user_name = payload as string;
    });
    builder.addCase(changeUserName.fulfilled, (state, { payload }) => {
      state.profile.user_name = payload;
    });

    builder.addCase(
      fetchAdditionalEmailAddresses.rejected,
      (state, { payload }) => {
        state.emails = payload as string[];
        state.emailsLoaded = true;
      }
    );
    builder.addCase(
      fetchAdditionalEmailAddresses.fulfilled,
      (state, { payload }) => {
        state.emails = payload;
        state.emailsLoaded = true;
      }
    );

    builder.addCase(addEmailAddress.fulfilled, (state, { payload }) => {
      if (!payload) return;
      state.emails = [...state.emails, payload];
    });

    builder.addCase(removeEmailAddress.fulfilled, (state, { payload }) => {
      if (!payload) return;
      state.emails = state.emails.filter((e) => e !== payload);
    });

    builder.addCase(fetchPhoneNumbers.rejected, (state, { payload }) => {
      state.phones = payload as string[];
      state.phonesLoaded = true;
    });
    builder.addCase(fetchPhoneNumbers.fulfilled, (state, { payload }) => {
      state.phones = payload;
      state.phonesLoaded = true;
    });

    builder.addCase(addPhoneNumber.fulfilled, (state, { payload }) => {
      if (!payload) return;
      state.phones = [...state.phones, payload];
    });

    builder.addCase(removePhoneNumber.fulfilled, (state, { payload }) => {
      if (!payload) return;
      state.phones = state.phones.filter((p) => p !== payload);
    });
  },
});

export const {
  setUserLoggedIn,
  setLoginStatusLoading,
  setMainEmail,
  setUserName,
} = userSlice.actions;

export default userSlice.reducer;

//#endregion

//#region selectors

export const getUserLoggedIn = (state: RootState) => state.user.loggedIn;

export const getUserLoginLoadingState = (state: RootState) =>
  state.user.loadingLoginStatus;

export const getUserEmail = (state: RootState) => state.user.email;

export const getAdditionalUserEmails = (state: RootState) => state.user.emails;

export const getAdditionalUserEmailsLoaded = (state: RootState) =>
  state.user.emailsLoaded;

export const getUserPhones = (state: RootState) => state.user.phones;

export const getUserPhonesLoaded = (state: RootState) =>
  state.user.phonesLoaded;

export const getUserProfile = (state: RootState) => state.user.profile;

export const getUserAvatarUrl = (state: RootState) =>
  state.user.profile.avatar_url;

//#endregion
