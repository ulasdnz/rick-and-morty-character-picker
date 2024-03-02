import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRickAndMorty = createAsyncThunk(
  "reserved-data",
  async (data: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${data}`
      );
      console.log("response ", response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
