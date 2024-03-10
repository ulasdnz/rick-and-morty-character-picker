import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CHARACTER_API = "https://rickandmortyapi.com/api/character/";

const NO_RESULTS: ResponseData = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export const getRickAndMorty = createAsyncThunk(
  "rickAndMorty/search",
  async (name: string, { signal }) => {
    try {
      const response = await axios.get<ResponseData>(CHARACTER_API, {
        params: { name },
        signal,
      });
      return response.data;
    } catch (error) {
      // The API answers 404 when no character matches the name.
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return NO_RESULTS;
      }
      throw error;
    }
  }
);
