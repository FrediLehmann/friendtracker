import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "types/supabase";

export const fetchFriends = createAsyncThunk<any, any>(
  "friends/friends",
  async (for_hash: string) => {
    let { data, error } = await supabaseClient.from("");

    if (error) throw error;

    return data;
  }
);

type FriendsState = {
  friends: any[];
  loadingFriends: boolean;
  loadingFriendsError: boolean;
  pendingRequests: any[];
  incomingRequests: any[];
};

const initialState: FriendsState = {
  friends: [],
  loadingFriends: false,
  loadingFriendsError: false,
  pendingRequests: [],
  incomingRequests: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.loadingFriends = true;
    });
    builder.addCase(fetchFriends.rejected, (state) => {
      state.loadingFriendsError = true;
    });
    builder.addCase(fetchFriends.fulfilled, (state, { payload }) => {
      state.friends = payload;
    });
  },
});

export default friendsSlice.reducer;
