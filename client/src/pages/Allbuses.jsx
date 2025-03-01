import "../resources/Allbuses.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import moment from "moment";
import {
  setSource,
  setDestination,
  setSearchResults,
  setLoading,
  setError,
  setDate,
} from "../redux/searchSlice";

const Allbuses = () => {
  const dispatch = useDispatch();
  const { searchResults, source, destination, date } = useSelector((state) => state.search);
  const navigate = useNavigate();
  console.log(date, );

  const [filters, setFilters] = useState({
    busname: "",
    bustype: "",
    maxPrice: "",
    departureTime: "",
  });

  const formattedDates = (date) => {
    const originalDate = moment(date).format("DD-MM-YYYY");
    return originalDate;
  };

  // Filter buses based on the selected filters
  // In Allbuses.js

const filteredBuses = Array.isArray(searchResults) 
? searchResults.filter((bus) => {
    const { busname, bustype, maxPrice, departureTime } = filters;

    const matchesBusName = busname ? bus.busname === busname : true;
    const matchesBusType = bustype ? bus.bustype === bustype : true;
    const matchesMaxPrice = maxPrice ? bus.price <= parseInt(maxPrice) : true;
    const matchesDepartureTime = departureTime
      ? moment(bus.departuretime, "HH:mm").isSameOrAfter(
          moment(departureTime, "HH:mm")
        )
      : true;

    return matchesBusName && matchesBusType && matchesMaxPrice && matchesDepartureTime;
  })
: []; // If searchResults is not an array, return an empty array


  const handleSourceChange = (event) => {
      dispatch(setSource(event.target.value));
    };
  
    const handleDestinationChange = (event) => {
      dispatch(setDestination(event.target.value));
    };
  
    const handleDateChange = (event) => {
      dispatch(setDate(event.target.value));
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

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

  useEffect(() => {
    if (source && destination) {
      handleSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, destination,]);
  

  return (
    <div className="allbuses">
      <div className="allbuses-main">
        <div className="allbuses-filter">
          <div className="allbuses-filter-heading">Filter</div>
          <div className="allbuses-filter-options">
            <div className="filter-sections">
              <div className="filter-sections-label">Bus Name :</div>
              <select name="busname" onChange={handleChange}>
                <option value="">Select Bus Name</option>
                <option value="Passenger">Passenger</option>
                <option value="Express">Express</option>
                <option value="Super-Fast">Sup-Fast</option>
              </select>
            </div>
            <div className="filter-sections">
              <div className="filter-sections-label">Bus Type :</div>
              <select name="bustype" onChange={handleChange}>
                <option value="">Select Bus Type</option>
                <option value="General">General</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Semi-Sleeper">Semi-Sleeper</option>
                <option value="AC">AC</option>
              </select>
            </div>
            <div className="filter-sections">
              <div className="filter-sections-label">Max Price Range :</div>
              <select name="maxPrice" onChange={handleChange}>
                <option value="">Max Price Range</option>
                <option value="100">100</option>
                <option value="300">300</option>
                <option value="600">600</option>
                <option value="800">800</option>
                <option value="1000">1000</option>
              </select>
            </div>
            <div className="filter-sections">
              <div className="filter-sections-label">Departure Time :</div>
              <input
                type="time"
                name="departureTime"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="allbuses-show">
          <div className="allbuses-topbar">
            <div className="allbuses-topbar-search">
              <div className="allbuses-search-source">
              <input
                    type="text"
                    value={source}
                    onChange={handleSourceChange}
                    placeholder={source}
                  />
              </div>
              <div className="allbuses-arrow">
                <img src={assets.rightarrow} alt="" />
                <div className="allbuses-arrow-date">
                  <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  placeholder="Enter date"
                /></div>
              </div>
              <div className="allbuses-search-source">
                <input
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    placeholder={destination}
                  />
              </div>
            </div>
          </div>
          <div className="all-buses-name">
            {Array.isArray(filteredBuses) && filteredBuses.length > 0 ? (
              filteredBuses.map((bus) => {
                if( date === moment(bus.date).format("YYYY-MM-DD")){
                return (
                  <div key={bus._id} className="individual-busname">
                    <div className="vertical-line"></div>
                    <div className="bus-left">
                      <div className="bus-details-top">
                        <div className="busname">{bus.busname}</div>
                        <div className="busnumber">{bus.busnumber}</div>
                      </div>

                      <div className="bus-details-bottom">
                        <div className="bus-source">
                          <img src={assets.bussource} alt="" /> &nbsp;
                          {bus.source} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {bus.departuretime}
                        </div>
                        <div className="bus-stops-box">
                          {Array.isArray(bus.stops) && bus.stops.length > 0 ? (
                            bus.stops.map((stoppage, index) => (
                              <div className="main-bus-stop" key={index}>
                                <div className="bus-Stop">
                                  <img src={assets.stop} alt="" />
                                  {stoppage.name} &nbsp; - &nbsp; ₹
                                  {stoppage.price} &nbsp; - &nbsp;
                                  {stoppage.arivaltime}
                                </div>
                                <div className="dot"></div>
                              </div>
                            ))
                          ) : (
                            <li>No stoppages available.</li>
                          )}
                        </div>
                        <div className="bus-source">
                          <img src={assets.busdestination} alt="" />
                          {bus.destination}&nbsp;&nbsp;&nbsp;&nbsp;
                          {bus.arivaltime}
                        </div>
                      </div>
                    </div>
                    <div className="bus-right">
                      <div className="bus-type">{bus.bustype} Non AC 2+1</div>
                      <div className="bus-date">
                        {formattedDates(bus.date)}
                      </div>
                      <div className="bus-seat-available">
                        {bus.availableseats - (bus.seatsBooked?.length || 0)}
                        <span>Seats Left</span>
                      </div>
                      <div className="bus-price">
                        <img src={assets.rupee} alt="" /> {bus.price}
                      </div>
                      <div
                        className="book-ticket-button"
                        onClick={() => {
                          navigate(`/book-now/${bus._id}`);
                        }}
                      >
                        Book Now
                      </div>
                    </div>
                  </div>
                )};
              })
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allbuses;
