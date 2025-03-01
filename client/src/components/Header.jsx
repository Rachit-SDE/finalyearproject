import { assets } from "../assets/assets";
import "../resources/Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setSource,
  setDestination,
  setSearchResults,
  setLoading,
  setError,
  setDate,
} from "../redux/searchSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { source, destination, date } = useSelector((state) => state.search);

  const handleSourceChange = (event) => {
    dispatch(setSource(event.target.value));
  };

  const handleDestinationChange = (event) => {
    dispatch(setDestination(event.target.value));
  };

  const handleDateChange = (event) => {
    dispatch(setDate(event.target.value));
  };
  console.log(source, destination, date);

  const handleSearch = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(
        `http://localhost:4000/api/bus/search?source=${source}&destination=${destination}`
      );
      dispatch(setSearchResults(response.data));
      dispatch(setLoading(false));
      navigate("/allbuses");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="header">
      <div className="main-header">
        <div>
          <div className="background">
            <img src="" alt="" />
          </div>
          <img src={assets.bus} alt="" className="bus" />
        </div>
        <div className="banner">
          <div className="banner-heading">
            <h1>Plan Your Next Trip </h1>
            <p>with Ease and Safely</p>
            <div
              className="book-button"
              onClick={() => {
                navigate("/allbuses");
              }}
            >
              Book Now
            </div>
          </div>

          <div className="banner-search">
            <div className="banner-search-main">
              <p className="search-heading">Get Your Favourite Ticket</p>
              <div className="search-input-box">
                <div className="search-input">
                  <img src={assets.pickup} alt="" className="source-location" />
                  <input
                    type="text"
                    value={source}
                    onChange={handleSourceChange}
                    placeholder="Enter source"
                  />
                </div>
                <div className="search-input">
                  <img src={assets.drop} alt="" className="source-location" />
                  <input
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    placeholder="Enter destination"
                  />
                </div>
              </div>
              <div className="search-input">
                <img src={assets.calendar} alt="" className="source-location" />
                &nbsp;
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  placeholder="Enter date"
                />
              </div>
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
