import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars } from "react-icons/fa";

const NavBar = () => {
  const navBarRef = useRef();

  const showNavBar = () => {
    navBarRef.current.classList.toggle("mobile-navbar");
  };

  return (
    <header>
      <Link to="/">
        <h3>Stopify</h3>
      </Link>
      <nav ref={navBarRef} className="navbar">
        <Link to="/top-artists" title="Get your top artists">
          Top Artists
        </Link>
        <Link to="/top-tracks" title="Get your top tracks">
          Top Tracks
        </Link>
      </nav>
      <button onClick={showNavBar} className="navbar-btn">
        <FaBars />
      </button>
    </header>
  );
};

export default NavBar;
