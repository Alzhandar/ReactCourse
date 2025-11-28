import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as charactersService from '../../services/charactersService';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (query = '', { rejectWithValue }) => {
    try {
      if (query) {
        return await charactersService.searchByName(query);
      }
      return await charactersService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id, { rejectWithValue }) => {
    try {
      return await charactersService.getById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  selectedCharacter: null,
  loadingList: false,
  loadingCharacter: false,
  errorList: null,
  errorCharacter: null,
  query: '',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
      state.errorCharacter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
        state.errorList = null;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })
      // Fetch character by ID
      .addCase(fetchCharacterById.pending, (state) => {
        state.loadingCharacter = true;
        state.errorCharacter = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.loadingCharacter = false;
        state.selectedCharacter = action.payload;
        state.errorCharacter = null;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.loadingCharacter = false;
        state.errorCharacter = action.payload;
        state.selectedCharacter = null;
      });
  },
});

export const { setQuery, clearSelectedCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
