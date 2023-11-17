import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  const [eventDetails, setEventDetails] = useState([]);

  const getAllEvents = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "events")
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return eventDetails.map((event) => {
    return (
      <div className="HomePage" key={event.id}>
        <h2>{event.name}</h2>
          <p>{event.date}</p>
          <p>Created by: {event.creator}</p>
        <NavLink to="/event/:eventId">
          Check the details of this Event here!
        </NavLink>
      </div>
    );
  });
}

export default HomePage;
