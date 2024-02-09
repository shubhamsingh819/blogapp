import { configureStore } from "@reduxjs/toolkit";
import descriptionSlice from "./descriptionSlice";

const store = configureStore({
  reducer: {
    description: descriptionSlice,
  },
});

export default store;
