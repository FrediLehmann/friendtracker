import { createSlice } from "@reduxjs/toolkit";

type Post = {
  images: any[];
  text: string;
};

type PostsState = {
  draftPost: Post | undefined;
};

const initialState: PostsState = {
  draftPost: undefined,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {} = postSlice.actions;

export default postSlice.reducer;
