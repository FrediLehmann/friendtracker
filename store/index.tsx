import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import friendsReducer from "./friends";
import postsReducer from "./posts";

export const store = configureStore({
  reducer: { user: userReducer, friends: friendsReducer, posts: postsReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { default as RootStore } from "./RootStore";
