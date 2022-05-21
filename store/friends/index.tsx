import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { getUserProfile } from "store/user";
import { definitions } from "types/supabase";

// export const fetchFriends = createAsyncThunk<any, any>(
//   "friends/friends",
//   async (for_hash: string) => {
//     let { data, error } = await supabaseClient.from("");

//     if (error) throw error;

//     return data;
//   }
// );

// export const sendFriendRequest = createAsyncThunk<any, any>(
//   "friends/request",
//   async (target_id: number, { getState }) => {
//     const { user_id } = getUserProfile(getState());
//     let { data, error } = await supabaseClient
//       .from("friend_requests")
//       .insert([{ requestor: user_id, receiver: target_id }]);

//     if (error) throw error;

//     return data;
//   }
// );

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
  reducers: {
    addPendingRequest: (state, { payload }) => {
      state.pendingRequests = [...state.pendingRequests, payload];
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(sendFriendRequest.pending, (state) => {
    //   state.loadingFriends = true;
    // });
    // builder.addCase(sendFriendRequest.rejected, (state) => {
    //   state.loadingFriendsError = true;
    // });
    // builder.addCase(sendFriendRequest.fulfilled, (state, { payload }) => {
    //   state.friends = payload;
    // });
  },
});

export const { addPendingRequest } = friendsSlice.actions;

export default friendsSlice.reducer;
