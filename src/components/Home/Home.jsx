import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    AUTH_ENDPOINT,
    RESPONSE_TYPE,
    SPACE_DELIMITER,
    SCOPES,
  } = require("../../config.json");

  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const hash = location.hash;
    let token = localStorage.getItem("accessToken");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      location.hash = "";
      localStorage.clear();
      localStorage.setItem("accessToken", token);
    }

    setToken(token);
  }, []);

  const handleLogin = () => {
    location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("accessToken");
  };

  const handleGetUserData = () => {
    axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleGetUserData();
    }
  }, [token]);

  return (
    <div>
      <div id="home-container" className="home">
        <h1>Stopify</h1>
        <p>Discover your most listened tracks or artists from Spotify !</p>
        {!token ? (
          <p>Login using Spotify to see your tops</p>
        ) : (
          <p>Welcome, {user.display_name}</p>
        )}
        {!token ? (
          <button onClick={handleLogin} className="login-btn">
            Login to Spotify
          </button>
        ) : (
          <button onClick={handleLogout} className="login-btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
