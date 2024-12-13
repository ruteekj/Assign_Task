import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  profiles: [],
  filteredProfiles: [], // New state for filtered profiles
  searchQuery: "",

  loading: false,
  error: null,
};

// Thunk to fetch profiles
export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=50");
      if (!response.ok) throw new Error("Failed to fetch profiles");
      const data = await response.json();
      // Add random profile photos to each user

      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Profiles slice
const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterProfiles: (state) => {
      const query = state.searchQuery.trim().toLowerCase();

      if (query === "") {
        // Reset to original profiles when search is empty
        state.filteredProfiles = state.profiles;
      } else {
        // Split the query into individual words
        const queryWords = query.split(" ");

        state.filteredProfiles = state.profiles.filter((profile) => {
          // Combine all searchable fields into one string
          const searchableText =
            `${profile.name.first} ${profile.name.last} ${profile.location.city}`.toLowerCase();

          // Check if every word in the query matches part of the searchable text
          return queryWords.every((word) => searchableText.includes(word));
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
        state.filteredProfiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, filterProfiles, clearFilters } =
  profilesSlice.actions;
export default profilesSlice.reducer;
