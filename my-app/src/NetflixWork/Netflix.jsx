import React, { useEffect, useState } from "react";
import logo from "./netflix tools/assets/logo.png";
import profile_1 from "./netflix tools/assets/profile-1.png";
import profile_2 from "./netflix tools/assets/profile-2.png";
import profile_3 from "./netflix tools/assets/profile-3.png";
import profile_4 from "./netflix tools/assets/profile-4.png";
import AddProfileIcon from "./netflix tools/assets/plus.png";
// import "./Netflix.css";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMwYWE1ODA3ZmI2MzRmNWM4NTIyMzNjYzhiNjk0YyIsIm5iZiI6MTcyODIyNzgwNS45NTY5NzEsInN1YiI6IjY3MDJhNTM3ZjM0OTVkNzJjNGY3YmQ5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rmpev1cDGcf58BLUQ9Ud_alEjrBUWNpILiU1RTF0O2Y`;
const url = `https://api.themoviedb.org/3/movie/${949484}/videos`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const Netflix = () => {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileImg, setNewProfileImg] = useState(profile_1);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const data_ = await fetch(url, options);
    const result = await data_.json();
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const temp = await getMovies();
      setMovies(temp.results || []); // Use results array
      console.log("TEMP", temp);
    };
    fetchData();
  }, []);

  const handleAddProfile = () => {
    if (profiles.length < 5) {
      setShowModal(true);
    } else {
      alert(
        "Maximum 5 profiles allowed or profile name must be at least 3 characters."
      );
    }
  };

  const handleSaveProfile = () => {
    if (newProfileName) {
      setProfiles([...profiles, { name: newProfileName, img: newProfileImg }]);
      setShowModal(false);
      setNewProfileImg(profile_1); // Reset profile image
      setNewProfileName(""); // Reset profile name
    } else {
      alert("Please enter a name for the profile.");
    }
  };

  return (
    <div>
      <a href="/Mainpage">click me to change</a>
      <div className="header">
        <img src={logo} alt="Netflix Logo" />
      </div>

      <div className="profile-container">
        <div className="profile-head">
          <h1>Who's watching?</h1>
        </div>
        <div className="profiles">
          {profiles.map((profile, index) => (
            <div key={index} className="profile">
              <img src={profile.img} alt={profile.name} />
              <h3>{profile.name}</h3>
            </div>
          ))}

          {profiles.length < 5 && (
            <div className="profile add-profile" onClick={handleAddProfile}>
              <img src={AddProfileIcon} alt="Add Profile" />
              <h3>Add Profile</h3>
            </div>
          )}
        </div>
        <h1>MANAGE PROFILES</h1>
      </div>

      {movies.length > 0 && (
        <div className="movies">
          <h2>Movie Posters:</h2>
          <div className="movie-list">
            {movies.map((item) => (
              <div key={item.id} className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Profile</h2>
            <label>
              Profile Name:
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
              />
            </label>

            <label>
              Select Profile Image:
              <div className="profile-images">
                <img
                  src={profile_1}
                  alt="Profile 1"
                  className={newProfileImg === profile_1 ? "selected" : ""}
                  onClick={() => setNewProfileImg(profile_1)}
                />
                <img
                  src={profile_2}
                  alt="Profile 2"
                  className={newProfileImg === profile_2 ? "selected" : ""}
                  onClick={() => setNewProfileImg(profile_2)}
                />
                <img
                  src={profile_3}
                  alt="Profile 3"
                  className={newProfileImg === profile_3 ? "selected" : ""}
                  onClick={() => setNewProfileImg(profile_3)}
                />
                <img
                  src={profile_4}
                  alt="Profile 4"
                  className={newProfileImg === profile_4 ? "selected" : ""}
                  onClick={() => setNewProfileImg(profile_4)}
                />
              </div>
            </label>

            <button onClick={handleSaveProfile}>Save Profile</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Netflix;
