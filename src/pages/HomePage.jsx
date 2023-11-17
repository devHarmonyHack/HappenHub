import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const sortByDate = () => {
    const toSortByDate = [...events];
    const sortedByDate = toSortByDate.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setEvents(sortedByDate);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="HomePage">
      <button
        onClick={() => {
          sortByDate();
        }}
      >
        Sort by Date
      </button>

      {events.map((event) => {
        return (
          <div className="events" key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.date}</p>
            <p>Created by: {event.creator}</p>
            <NavLink to={`/events/${event.id}`}>
              Check the details of this Event here!
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
