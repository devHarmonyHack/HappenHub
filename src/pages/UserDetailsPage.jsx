import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../pages/UserDetailsPage.css";

const urlAPI = import.meta.env.VITE_API_URL;
const colors = ["#F08D7E", "#EFA18A", "#E2BAB1", "#DDA6B9", "#ACAEC5"];

function UserDetails() {
  const [userDetails, setUserDetails] = useState({});
  const [eventsCreated, setEventsCreated] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);

  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${urlAPI}/users/${userId}`)
      .then((response) => {
        console.log("getting user from API");
        console.log(response.data.events.created);
        setUserDetails(response.data);

        axios.get(`${urlAPI}events`).then((result) => {
          const createdEventsArr = response.data.events.created;
          const eventsFromUser = createdEventsArr.map((eventId) => {
            return result.data.find((event) => event.id === eventId);
          });
          setEventsCreated(eventsFromUser);
        });

        axios.get(`${urlAPI}events`).then((result) => {
          const attendingEventsArr = response.data.events.attending;
          const eventsFromUser = attendingEventsArr.map((eventId) => {
            return result.data.find((event) => event.id === eventId);
          });
          console.log(eventsFromUser)
          setEventsAttending(eventsFromUser);
          
        });
      })
      .catch((error) => {
        console.log("Error getting user details from the API...");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (

    <div className="UserDetails">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container">
            <section
              className="user-info"
              style={{ backgroundColor: randomColor() }}
            >
              <h2>UserName: {userDetails.userName}</h2>
              <p>Contact: {userDetails.contact}</p>
              <p>About me: {userDetails.aboutMe}</p>
              <img src={userDetails.image} alt="" />
            </section>

            <div className="events-container">
              {userDetails.events.attending.length !== 0 && (
                <div
                  className="events-attending"
                  style={{ backgroundColor: randomColor() }}
                >
                  <p>Attending events: </p>
                  {eventsAttending.map((event) => (
                    <div key={event.id}>
                      <Link to={`/events/${event.id}`}>
                        <h5>{event.name}</h5>
                      </Link>
                      <p>Description: {event.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {userDetails.events.created.length !== 0 && (
                <div
                  className="event-created"
                  style={{ backgroundColor: randomColor() }}
                >
                  <p>Events created: </p>
                  {eventsCreated.map((event) => (
                    <div key={event.id}>
                      <Link to={`/events/${event.id}`}>
                        <h5>{event.name}</h5>
                      </Link>
                      <p>Description: {event.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
       )} 
    </div>
  );
}

export default UserDetails;
