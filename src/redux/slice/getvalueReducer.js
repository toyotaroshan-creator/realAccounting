import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      check: true,
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
      check: true,
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
      check: true,
    },
   
  ],
  value: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updatevalue: (state, actions) => {
      const data = actions.payload;
      console.log(data);
      state.value = data.value;
      state["data"][data.index]["amount"] = data.value;
    },
  },
});

export const { updatevalue } = counterSlice.actions;
export default counterSlice.reducer;
