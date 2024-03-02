import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rickAndMortyReducer from "../features/ui-slice";

export const store = configureStore({
  reducer: {
    rickAndMorty: rickAndMortyReducer,
  },
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
