import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "../features/profiles/profilesSlice";

const store = configureStore({
  reducer: {
    profiles: profilesReducer, // Add reducers for profiles feature
  },
});

export default store;
