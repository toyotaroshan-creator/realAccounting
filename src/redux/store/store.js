import { configureStore } from "@reduxjs/toolkit";
import getvalueReducer from "../slice/getvalueReducer";

export const store = configureStore({
  reducer: {
    getvalueslice: getvalueReducer,
  },
});
