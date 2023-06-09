import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import FlightCard from './flightCard';

const Main = () => {
    const [flights, setFlights] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [stopsFilter, setStopsFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState([100, 800]);
    const [flightTimeFilter, setFlightTimeFilter] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/fly.json');
                setFlights(response.data.flights);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleStopsFilterChange = (value) => {
        if (stopsFilter.includes(value)) {
            setStopsFilter(stopsFilter.filter((filter) => filter !== value));
        } else {
            setStopsFilter([...stopsFilter, value]);
        }
    };

    const handlePriceFilterChange = (e) => {
        const value = parseInt(e.target.value);
        setPriceFilter([priceFilter[0], value]);
    };

    const handleFlightTimeFilterChange = (value) => {
        if (flightTimeFilter.includes(value)) {
            setFlightTimeFilter(flightTimeFilter.filter((filter) => filter !== value));
        } else {
            setFlightTimeFilter([...flightTimeFilter, value]);
        }
    };

    const filteredFlights = flights.filter(
        (flight) =>
            flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
            flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFlights = sortBy
        ? filteredFlights.sort((a, b) => {
            if (sortBy === 'price') {
                return a.price - b.price;
            } else if (sortBy === 'stops') {
                return a.stops - b.stops;
            }
        })
        : filteredFlights;

    const filteredAndSortedFlights = sortedFlights.filter((flight) => {
        const stops = flight.stops;
        const price = flight.price;
        const flightTime = flight.totalFlightTime.slice(0, flight.totalFlightTime.length - 1);

        if (stopsFilter.length > 0) {
            if (stopsFilter.includes(1) && stops !== 1) {
                return false;
            }
            if (stopsFilter.includes('2-4') && (stops < 2 || stops > 4)) {
                return false;
            }
            if (stopsFilter.includes('4+') && stops <= 4) {
                return false;
            }
        }

        if (priceFilter.length > 0) {
            if (price < priceFilter[0] || price > priceFilter[1]) {
                return false;
            }
        }

        if (flightTimeFilter.length > 0) {
            if (flightTimeFilter.includes('1-5') && (flightTime < 1 || flightTime >= 5)) {
                console.log('here');
                return false;
            }
            if (flightTimeFilter.includes('5-10') && (flightTime < 5 || flightTime > 10)) {
                return false;
            }
            if (flightTimeFilter.includes('10+') && flightTime <= 10) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className="container">
            <div className="navbar">
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="navbar-input"
                    />
                    <select value={sortBy} onChange={handleSortByChange} className="navbar-sort">
                        <option value="">Sort By</option>
                        <option value="price">Price</option>
                        <option value="stops">Stops</option>
                    </select>
                </div>
            </div>

            <div className="wrapper">
                <div className="filter-container">
                    <h1>Filter</h1>
                    <div className="filter-group">
                        <h4>Stops</h4>
                        <label>
                            <input
                                type="checkbox"
                                checked={stopsFilter.includes(1)}
                                onChange={() => handleStopsFilterChange(1)}
                            />
                            1 Stop
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={stopsFilter.includes('2-4')}
                                onChange={() => handleStopsFilterChange('2-4')}
                            />
                            2-4 Stops
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={stopsFilter.includes('4+')}
                                onChange={() => handleStopsFilterChange('4+')}
                            />
                            4+ Stops
                        </label>
                    </div>
                    <div className="filter-group">
                        <h4>Price</h4>
                        <input
                            type="range"
                            min="100"
                            max="800"
                            step="10"
                            value={priceFilter[1]}
                            onChange={handlePriceFilterChange}
                        />
                        <span>${priceFilter[0]} - ${priceFilter[1]}</span>
                    </div>
                    <div className="filter-group">
                        <h4>Flight Time</h4>
                        <label>
                            <input
                                type="checkbox"
                                checked={flightTimeFilter.includes('1-5')}
                                onChange={() => handleFlightTimeFilterChange('1-5')}
                            />
                            1-5 Hours
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={flightTimeFilter.includes('5-10')}
                                onChange={() => handleFlightTimeFilterChange('5-10')}
                            />
                            5-10 Hours
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={flightTimeFilter.includes('10+')}
                                onChange={() => handleFlightTimeFilterChange('10+')}
                            />
                            >10 Hours
                        </label>
                    </div>
                </div>

                <div className="flight-list">
                    {filteredAndSortedFlights.length > 0 ? (
                        <>
                            {filteredAndSortedFlights.map((flight) => (
                                <FlightCard key={flight.id} flight={flight} />
                            ))}
                        </>
                    ) : (
                        <p>No flights found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
