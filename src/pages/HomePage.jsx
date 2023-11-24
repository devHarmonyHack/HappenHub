import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../pages/HomePage.css";

function HomePage() {
  const [events, setEvents] = useState([]);
  const colors = ["#F08D7E", "#EFA18A", "#E2BAB1", "#DDA6B9", "#ACAEC5"];

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

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="HomePage">
      <button
        onClick={() => {
          sortByDate();
        }}
      >
        Sort by date
      </button>
      <div className="flex-container-homepage">
        {events.map((event) => {
          const randomColor = getRandomColor();
          return (
            <div
              className="events"
              key={event.id}
              style={{ backgroundColor: randomColor }}
            >
              <h2>{event.name}</h2>
              <p>{event.date}</p>
              <p>Created by: {event.creator}</p>
              <NavLink
                to={{
                  pathname: `/events/${event.id}`,
                  state: { events },
                }}
              >
                <p className="NavLink-p">
                  Check the details of this Event here!
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
