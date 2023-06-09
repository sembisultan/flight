import React, { useEffect, useState } from 'react';
import Modal from "../Modal/Modal";
import './style.css'
const FlightCard = ({ flight }) => {
    const [showModal, setShowModal] = useState(false);

    const { origin, destination, price, stops, layovers, totalFlightTime } = flight;

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderLayovers = () => {
        if (stops === 0) {
            return <p>Flight Duration: {totalFlightTime}</p>;
        } else {
            return (
                <>
                    {layovers.map((layover, index) => (
                        <div className="layover" key={index}>
                            <p>Layover Airport: {layover.airport}</p>
                            <p>Layover Duration: {layover.duration}</p>
                            <p>Flight Time: {layover.flightTime}</p>
                        </div>
                    ))}
                    <p>Total Flight Time: {totalFlightTime}</p>
                </>
            );
        }
    };

    return (
        <div className="flight-card">
            <div className="info">
                <p className="route">
                    {origin} - {destination}
                </p>
                <p className="price">${price}</p>
                <p className="stops">Stops: {stops}</p>
            </div>

            {renderLayovers()}

            <button className="button" onClick={openModal}>Reserve</button>
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
};


export default FlightCard;