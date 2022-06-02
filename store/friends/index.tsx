import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { RootState } from "store";
import { getUserProfile } from "store/user";
import { LoadingStates } from "types/DataStates.enum";
import { definitions } from "types/supabase";

export const loadIncomingFriendRequests = createAsyncThunk<
  definitions["user_profiles"][],
  undefined,
  { state: RootState }
>("friends/incomingFriendRequests", async (_, { getState }) => {
  const state = getState();
  const userProfile = getUserProfile(state);

  const { data: requests, error: requestsError } = await supabaseClient
    .from("friend_requests")
    .select("requestor")
    .eq("receiver", userProfile.id);

  if (requestsError) throw requestsError.message;
  if (!requests || requests.length < 1) return [];

  const { data: profiles, error: profilesError } = await supabaseClient
    .from("user_profiles")
    .select("id, user_id, user_name, avatar_url, profile_hash")
    .in(
      "id",
      requests.map((req) => req.requestor)
    );

  if (profilesError) throw profilesError.message;
  if (!profiles || profiles.length < 1) return [];

  return profiles;
});

export const loadPendingFriendRequests = createAsyncThunk<
  definitions["user_profiles"][],
  undefined,
  { state: RootState }
>("friends/pendingFriendRequests", async (_, { getState }) => {
  const state = getState();
  const { id } = getUserProfile(state);

  const { data: requests, error: requestsError } = await supabaseClient
    .from("friend_requests")
    .select("receiver")
    .eq("requestor", id);

  if (requestsError) throw requestsError.message;
  if (!requests || requests.length < 1) return [];

  const { data: profiles, error: profilesError } = await supabaseClient
    .from("user_profiles")
    .select("id, user_id, user_name, avatar_url, profile_hash")
    .in(
      "id",
      requests.map((req) => req.receiver)
    );

  if (profilesError) throw profilesError.message;
  if (!profiles || profiles.length < 1) return [];

  return profiles;
});

export const loadFriends = createAsyncThunk<
  definitions["user_profiles"][],
  undefined,
  { state: RootState }
>("friends/friends", async (_, { getState }) => {
  const { data: friendList, error: friendListError } = await supabaseClient.rpc(
    "get_friend_list"
  );

  if (friendListError) throw friendListError;
  if (!friendList || friendList.length < 1) return [];

  const { data: friends, error: friendsError } = await supabaseClient
    .from("user_profiles")
    .select("*")
    .in(
      "id",
      friendList.map((f) => f.friend_id)
    );

  if (friendsError) throw friendsError;
  if (!friends || friends.length < 1) return [];

  return friends;
});

type FriendsState = {
  friends: {
    state: LoadingStates;
    data: definitions["user_profiles"][];
  };
  requests: {
    incoming: {
      state: LoadingStates;
      data: definitions["user_profiles"][];
    };
    pending: {
      state: LoadingStates;
      data: definitions["user_profiles"][];
    };
  };
};

const initialState: FriendsState = {
  friends: {
    state: LoadingStates.unloaded,
    data: [],
  },
  requests: {
    incoming: {
      state: LoadingStates.unloaded,
      data: [],
    },
    pending: {
      state: LoadingStates.unloaded,
      data: [],
    },
  },
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIncomingFriendRequests.pending, (state) => {
      state.requests.incoming.state = LoadingStates.loading;
    });
    builder.addCase(loadIncomingFriendRequests.rejected, (state) => {
      state.requests.incoming.state = LoadingStates.error;
    });
    builder.addCase(
      loadIncomingFriendRequests.fulfilled,
      (state, { payload }) => {
        state.requests.incoming.state = LoadingStates.loaded;
        state.requests.incoming.data = payload;
      }
    );

    builder.addCase(loadPendingFriendRequests.pending, (state) => {
      state.requests.pending.state = LoadingStates.loading;
    });
    builder.addCase(
      loadPendingFriendRequests.rejected,
      (state, { payload }) => {
        state.requests.pending.state = LoadingStates.error;
      }
    );
    builder.addCase(
      loadPendingFriendRequests.fulfilled,
      (state, { payload }) => {
        state.requests.pending.state = LoadingStates.loaded;
        state.requests.pending.data = payload;
      }
    );

    builder.addCase(loadFriends.pending, (state) => {
      state.friends.state = LoadingStates.loading;
    });
    builder.addCase(loadFriends.rejected, (state, { payload }) => {
      state.friends.state = LoadingStates.error;
    });
    builder.addCase(loadFriends.fulfilled, (state, { payload }) => {
      state.friends.state = LoadingStates.loaded;
      state.friends.data = payload;
    });
  },
});

// export const {} = friendsSlice.actions;

export default friendsSlice.reducer;

//#region selectors

export const getPendingFriendRequestsLoadingState = (state: RootState) =>
  state.friends.requests.pending.state;
export const getPendingFriendRequests = (state: RootState) =>
  state.friends.requests.pending.data;

export const getIncomingFriendRequestsLoadingState = (state: RootState) =>
  state.friends.requests.incoming.state;
export const getIncomingFriendRequests = (state: RootState) =>
  state.friends.requests.incoming.data;

export const getFriendsLoadingState = (state: RootState) =>
  state.friends.friends.state;
export const getFriends = (state: RootState) => state.friends.friends.data;

//#endregion
