import { Class } from "@/model/class";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ClassState = {
  classes: Class[];
}

const initialState: ClassState = {
  classes: [],
};

const slice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setClasses: (state, { payload }: PayloadAction<Class[]>) => {
      state.classes = payload;
    }
  }
})

export const { setClasses } = slice.actions;

export default slice.reducer;