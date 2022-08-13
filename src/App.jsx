import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import TopArtists from "./components/Pages/TopArtists";
import TopArtistsMediumTerm from "./components/Pages/TopArtistsMediumTerm";
import TopArtistsShortTerm from "./components/Pages/TopArtistsShortTerm";
import TopSongs from "./components/Pages/TopSongs";
import TopSongsMediumTerm from "./components/Pages/TopSongsMediumTerm";
import TopSongsShortTerm from "./components/Pages/TopSongsShortTerm";
import "./styles/main.scss";
import "./components/Pages/TopSongs.scss";
import "./components/Pages/TopArtists.scss";
import "./components/Home/Home.scss";
import "./components/NavBar/TimeRangeNav.scss";

const App = () => {
  return (
    <div className="page">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/top-artists-longTerm" element={<TopArtists />} />
          <Route
            path="/top-artists-mediumTerm"
            element={<TopArtistsMediumTerm />}
          />
          <Route
            path="/top-artists-shortTerm"
            element={<TopArtistsShortTerm />}
          />
          <Route path="/top-tracks" element={<TopSongs />} />
          <Route path="/top-tracks-longTerm" element={<TopSongs />} />
          <Route
            path="/top-tracks-mediumTerm"
            element={<TopSongsMediumTerm />}
          />
          <Route path="/top-tracks-shortTerm" element={<TopSongsShortTerm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
