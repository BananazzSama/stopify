import { Link } from "react-router-dom";
import "./TimeRangeNav.scss";

const TimeRangeNavArtists = () => {
  return (
    <ul className="term-filter">
      <li>
        <Link to="/top-artists-shortTerm">Last 4 weeks</Link>
      </li>
      <li>
        <Link to="/top-artists-mediumTerm">Last 6 months</Link>
      </li>
      <li>
        <Link to="/top-artists-longTerm">All time</Link>
      </li>
    </ul>
  );
};

export default TimeRangeNavArtists;
