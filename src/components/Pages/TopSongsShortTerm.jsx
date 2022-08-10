import { useEffect, useState } from "react";
import axios from "axios";
import TimeRangeNav from "../NavBar/TimeRangeNav";
import "./TopSongs.scss";

const TOPSONGS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const LONG_TERM = "time_range=long_term";
const MEDIUM_TERM = "time_range=medium_term";
const SHORT_TERM = "time_range=short_term";

const TopSongsShortTerm = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
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

  const handleGetTopSongs = () => {
    axios
      .get(`${TOPSONGS_ENDPOINT}?${SHORT_TERM}&limit=50&offset=0`, {
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
      handleGetTopSongs();
    }
  }, [token]);

  return (
    <div>
      <h1>Top Tracks of {user.display_name} (Last 4 weeks)</h1>
      <TimeRangeNav></TimeRangeNav>
      <ul>
        {data?.items
          ? data.items.map((item, index) => (
              <li key={item.id} className="item-list">
                <span className="item-index">{index + 1}</span>
                <a
                  className="item-image"
                  href={`https://open.spotify.com/track/${item.id}`}
                  target="_blank"
                >
                  <img src={item.album.images[1].url} alt={item.album.name} />
                </a>
                <div className="item-details">
                  <div className="item-trackInfo">
                    <p className="item-title">{item.name}</p>
                    <p className="item-album">{item.album.name}</p>
                  </div>
                  <div className="item-artistInfo">
                    {item.artists.map((artist, index) => (
                      <span key={index}>
                        {(index ? ", " : "") + artist.name}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopSongsShortTerm;
