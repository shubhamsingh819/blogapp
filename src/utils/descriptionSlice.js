import { createSlice } from "@reduxjs/toolkit";

const descriptionSlice = createSlice({
  name: "description",
  initialState: [],
  reducers: {
    addDescription: (state, action) => {
      state.push(action.payload);
    },

    updateDescription: (state, action) => {
      const { id, newDescription } = action.payload;
      const existingDescription = state.find((item) => item.id === id);
      if (existingDescription) {
        existingDescription.description = newDescription;
      }
    },
  },
});

export const { addDescription, updateDescription } = descriptionSlice.actions;
export default descriptionSlice.reducer;
