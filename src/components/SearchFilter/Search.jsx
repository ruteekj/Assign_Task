import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  filterProfiles,
  clearFilters,
} from "../../features/profiles/profilesSlice";

export const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    dispatch(setSearchQuery(search)); // Set the search query
    dispatch(filterProfiles()); // Filter the profiles
  };
  const handleClearSearch = () => {
    setSearch(""); // Clear local input state
    dispatch(setSearchQuery("")); // Reset search query in Redux
    dispatch(filterProfiles()); // Reset profiles to original state
  };

  return (
    <div>
      <div className="container m-auto">
        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2 w-100"
            type="search"
            placeholder="Search and filter profiles based on name or city"
            aria-label="Search"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
          {search && (
            <button
              type="button"
              className="btn btn-outline-danger mx-2"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
