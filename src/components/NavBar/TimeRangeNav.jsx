import { Link } from "react-router-dom";
import "./TimeRangeNav.scss";

const TimeRangeNav = () => {
  return (
    <ul className="term-filter">
      <li>
        <Link to="/top-tracks-shortTerm">Last 4 weeks</Link>
      </li>
      <li>
        <Link to="/top-tracks-mediumTerm">Last 6 months</Link>
      </li>
      <li>
        <Link to="/top-tracks-longTerm">All time</Link>
      </li>
    </ul>
  );
};

export default TimeRangeNav;
