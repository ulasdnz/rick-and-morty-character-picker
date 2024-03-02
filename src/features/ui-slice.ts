import { createSlice } from "@reduxjs/toolkit";
import { CUSTOM_API_STATUS } from "../constants";
import { getRickAndMorty } from "./api-slice";

export const dashboardsSlice = createSlice({
  name: "rickAndMorty",
  initialState: {
    isOpen: false,
    searchValue: "",
    selectedCharacters: null,
    focusedCharacterIndex: -1,
    fetchedData: {
      status: CUSTOM_API_STATUS.LOADING,
      data: null,
    },
  } as InitialState,

  reducers: {
    setFocusedCharacterIndex: (state, action) => {
      state.focusedCharacterIndex = action.payload;
    },
    setFocusedCharacterIndexDown: (state) => {
      if (!state.fetchedData.data) return;
      const numberOfCharacters = state.fetchedData.data?.results.length;
      const prevIndex = state.focusedCharacterIndex;
      if (prevIndex === numberOfCharacters - 1) {
        state.focusedCharacterIndex = 0;
        return;
      }

      const focusedCharacterIndex = (prevIndex + 1) % numberOfCharacters;
      state.focusedCharacterIndex = focusedCharacterIndex;
    },
    setFocusedCharacterIndexUp: (state) => {
      const numberOfCharacters = state.fetchedData.data?.results.length;
      if (!numberOfCharacters) return;
      const prevIndex = state.focusedCharacterIndex;
      if (prevIndex === -1 || prevIndex === 0) {
        state.focusedCharacterIndex = numberOfCharacters - 1;
        return;
      }
      const focusedCharacterIndex = (prevIndex - 1) % numberOfCharacters;
      state.focusedCharacterIndex = focusedCharacterIndex;
    },
    setSelectedCharacters: (state, action) => {
      state.selectedCharacters = action.payload;
    },
    deleteSelectedCharacter: (state, action) => {
      if (!state.selectedCharacters) return;
      const newSelectedCharacters = state.selectedCharacters.filter(
        (selectedCharacter) => selectedCharacter !== action.payload
      );
      state.selectedCharacters = newSelectedCharacters;
    },
    deleteWithBackSpace: (state) => {
      if (state.searchValue !== "") return;
      const selectedCharacters = state.selectedCharacters;
      selectedCharacters?.pop();
      state.selectedCharacters = selectedCharacters;
    },
    addToSelectedCharacters: (state, action) => {
      const selectedCharacters = state.selectedCharacters || [];
      const alreadySelected = selectedCharacters.find(c => c === action.payload)
      if(alreadySelected){
        const newSelectedCharacters = selectedCharacters.filter(c => c !== action.payload)
        state.selectedCharacters = newSelectedCharacters
        return
      }
      selectedCharacters.push(action.payload);
      state.selectedCharacters = selectedCharacters;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setIsOpen: (state, action) => {
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
      .addCase(getRickAndMorty.rejected, (state) => {
        state.fetchedData.status = CUSTOM_API_STATUS.FAILED;
      });
  },
});

export const {
  setSelectedCharacters,
  setFocusedCharacterIndex,
  setSearchValue,
  setIsOpen,
  addToSelectedCharacters,
  setFocusedCharacterIndexDown,
  setFocusedCharacterIndexUp,
  deleteWithBackSpace,
  deleteSelectedCharacter
} = dashboardsSlice.actions;

export default dashboardsSlice.reducer;
