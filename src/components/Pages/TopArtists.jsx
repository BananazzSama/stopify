import { useEffect, useState } from "react";
import axios from "axios";
import "./TopArtists.scss";
import TimeRangeNavArtists from "../NavBar/TimeRangeNavArtists";
import { Spinner } from "react-bootstrap";

const TOPSONGS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
const LONG_TERM = "time_range=long_term";
const MEDIUM_TERM = "time_range=medium_term";
const SHORT_TERM = "time_range=short_term";

const TopArtists = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

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

  const handleGetTopArtists = () => {
    axios
      .get(`${TOPSONGS_ENDPOINT}?${LONG_TERM}&limit=50&offset=0`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleGetUserData();
      handleGetTopArtists();
    }
  }, [token]);

  return (
    <div>
      <h1>Top Artists of {user.display_name} (All time)</h1>
      <TimeRangeNavArtists></TimeRangeNavArtists>
      {data ? (
        <ul className="artist-table">
          {data?.items
            ? data.items.map((item, index) => (
                <li key={item.id} className="artist-list">
                  <span className="artist-index">{index + 1}</span>
                  <a
                    className="artist-image"
                    href={`https://open.spotify.com/artist/${item.id}`}
                    target="_blank"
                  >
                    <img src={item.images[1].url} alt={item.name} />
                  </a>
                  <p className="artist-title">{item.name}</p>
                </li>
              ))
            : null}
        </ul>
      ) : (
        <div className="loading">
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </div>
  );
};

export default TopArtists;
