import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const ProfileCard = ({ profile }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyApoQAlHQmWj-L8sKOrbo9gQoUtMnobVYk", // Replace with your API key
  });
  const handleSummaryClick = () => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
    setIsLoading(true); // Set loading state to true
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000);
  };

  //   const handleSummaryClick = () => {
  //     setSelectedProfile(profile);
  //     setIsModalOpen(true); // Open the modal
  //   };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  return (
    <div>
      {/* Profile Card */}
      <div
        className="card mx-auto my-4 shadow-lg"
        style={{ maxWidth: "20rem", borderRadius: "1rem" }}
      >
        <img
          src={profile.picture.large}
          className="card-img-top rounded-top"
          alt={`${profile.name.first} ${profile.name.last}`}
          style={{
            height: "300px",
            objectFit: "cover",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        />

        <div className="card-body text-center">
          <h5
            className="card-title text-uppercase font-weight-bold"
            style={{ fontSize: "1.25rem", color: "#343a40" }}
          >
            {`${profile.name.first} ${profile.name.last}`}
          </h5>
          <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
            {`Location: ${profile.location.city}, ${profile.location.country}`}
          </p>
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSummaryClick}
            style={{
              borderRadius: "1rem",
              padding: "0.5rem 1.5rem",
              fontWeight: "bold",
            }}
          >
            Summary
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal modal fade show d-block  tab-pane fade"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-3 shadow-lg">
              <div className="modal-header border-0">
                <h1 className="modal-title fs-4 text-uppercase fw-bold text-primary">
                  {selectedProfile &&
                    `${selectedProfile.name.first} ${selectedProfile.name.last}`}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : isLoaded && selectedProfile ? (
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={{
                      lat: parseFloat(
                        selectedProfile.location.coordinates.latitude
                      ),
                      lng: parseFloat(
                        selectedProfile.location.coordinates.longitude
                      ),
                    }}
                    zoom={12}
                  >
                    <Marker
                      position={{
                        lat: parseFloat(
                          selectedProfile.location.coordinates.latitude
                        ),
                        lng: parseFloat(
                          selectedProfile.location.coordinates.longitude
                        ),
                      }}
                    />
                  </GoogleMap>
                ) : (
                  <div className="text-center text-muted">
                    Content not available
                  </div>
                )}
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-primary px-4 py-2 rounded-pill"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
