import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CUSTOM_API_STATUS } from "../constants";
import { getRickAndMorty } from "./api-slice";

const initialState: InitialState = {
  isOpen: false,
  searchValue: "",
  selectedCharacters: [],
  fetchedData: {
    status: CUSTOM_API_STATUS.LOADING,
    data: null,
  },
};

export const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState,
  reducers: {
    toggleSelectedCharacter: (
      state,
      action: PayloadAction<SelectedCharacter>
    ) => {
      const index = state.selectedCharacters.findIndex(
        (character) => character.id === action.payload.id
      );
      if (index === -1) {
        state.selectedCharacters.push(action.payload);
      } else {
        state.selectedCharacters.splice(index, 1);
      }
    },
    deleteSelectedCharacter: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (character) => character.id !== action.payload
      );
    },
    deleteWithBackSpace: (state) => {
      if (state.searchValue !== "") return;
      state.selectedCharacters.pop();
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRickAndMorty.pending, (state) => {
        state.fetchedData.status = CUSTOM_API_STATUS.LOADING;
      })
      .addCase(getRickAndMorty.fulfilled, (state, action) => {
        state.fetchedData.status = CUSTOM_API_STATUS.SUCCEEDED;
        state.fetchedData.data = action.payload;
      })
      .addCase(getRickAndMorty.rejected, (state, action) => {
        // A newer search cancelled this one, and its own result is on the way.
        if (action.meta.aborted) return;
        state.fetchedData.status = CUSTOM_API_STATUS.FAILED;
      });
  },
});

export const {
  setSearchValue,
  setIsOpen,
  toggleSelectedCharacter,
  deleteWithBackSpace,
  deleteSelectedCharacter,
} = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
