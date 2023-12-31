import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import userReducer from "./user/userSlice";
import loadingSlice from "./loading/loadingSlice";

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
