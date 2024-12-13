import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles } from "../../features/profiles/profilesSlice";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { Search } from "../../components/SearchFilter/Search";

const Home = () => {
  const dispatch = useDispatch();
  const { profiles, filteredProfiles, loading, error } = useSelector(
    (state) => state.profiles
  );

  useEffect(() => {
    dispatch(fetchProfiles()); // Fetch profiles when the component mounts
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Profiles</h1>
      <Search />
      {loading && (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {filteredProfiles.length
          ? filteredProfiles.map((profile) => (
              <div key={profile.id} className="col-md-4">
                <ProfileCard profile={profile} />
              </div>
            ))
          : profiles.map((profile) => (
              <div key={profile.id} className="col-md-4">
                <ProfileCard profile={profile} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
