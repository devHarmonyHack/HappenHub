import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import "../pages/EventDetailsPage.css";
import EventComment from "../components/EventComment";

const urlAPI = import.meta.env.VITE_API_URL;

function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("YYYY-MM-DD");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [creator, setCreator] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [comments, setComments] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const [renderkey, setRenderKey] = useState(false);

  const randomImageId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/400/300?random=${randomImageId}`;

  function refreshPage() {
    window.location.reload(false);
  }

  function getEvent() {
    setLoading(true);
    axios
      .get(`${urlAPI}events/${eventId}`)
      .then((response) => {
        setEventDetails(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setLocation(response.data.location);
        setDate(response.data.date);
        setTime(response.data.time);
        setCreator(response.data.creator);
        setImage(response.data.image);
        setNotes(response.data.notes);
        setComments(response.data.comments);
        setAttendees(response.data.attendees);

        axios.get(`${urlAPI}users`).then((result) => {
          const user = result.data.find(
            (element) => element.userName === response.data.creator
          );

          setUserDetails(user);
          setUserId(user.id);
        });
      })
      .catch((error) => {
        console.log("Error getting event details from the API...");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getEvent();
  }, [eventId, renderkey]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      description,
      date,
      time,
      location,
      creator,
      image,
      notes,
      comments,
      attendees
    };

    axios
      .put(`${urlAPI}events/${eventId}`, requestBody)
      .then((response) => {
        setLoading(false);
        console.log("Success updating event");
        console.log(response.data);
        refreshPage();
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error updating project...");
        console.log(error);
      });
  };

  const deleteEvent = (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      const copyUser = { ...userDetails };

      const deleteEventFromUser = () => {
        copyUser.events.created = copyUser.events.created.filter(
          (eventCreated) => eventCreated !== eventId
        );
      };

      deleteEventFromUser();

      axios
        .delete(`${urlAPI}events/${eventId}`)
        .then((response) => {
          console.log("Event deleted");

          axios.put(`${urlAPI}users/${userId}`, copyUser).then((response) => {
            console.log("Updated user after removing event" + response.data);
            navigate("/");
          });
        })
        .catch((error) => {
          console.log("Error deleting from the API...");
          console.log(error);
        });
    }
  };

  const backToEvents = () => navigate("/");

  return (
    <div className="EventDetails">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <section className="info-grid-container">
            <div className="main-info">
              <h1>{eventDetails.name}</h1>
              <p>{eventDetails.description}</p>
              <br />
              <span>Location: {eventDetails.location}</span>
              <br />
              <span>Date: {eventDetails.date}</span>
              <br />
              <span>Time: {eventDetails.time_range}</span>
              <br />
              <span>
                Creator of the event:{" "}
                <Link to={`/users/${userId}`}>{eventDetails.creator} </Link>
              </span>
              <br />
              <span>
                Notes: {eventDetails.notes || <p>No notes for the event</p>}
              </span>
              <br />
              <div>
             Attendees: {attendees || <p>No one is coming</p>}
              </div>
            </div>
            <img
              className="event-img"
              src={eventDetails.img || imageUrl}
              alt="event img"
            />
          </section>
          <div className="buttons-row">
            <button onClick={backToEvents}>Back to events</button>
            <button onClick={deleteEvent}>Delete this Event</button>
          </div>
          <h3>Comments</h3>
          {eventId && (
            <EventComment
              comments={eventDetails.comments}
              eventId={eventId}
              eventDetails={eventDetails}
              setRenderKey={setRenderKey}
            />
          )}
          <section>
            <h3>Edit the Event</h3>
            <form onSubmit={handleFormSubmit} className="edit-event-form">
              <div className="form-wrapper">
                <div className="form-item">
                  <label htmlFor="name">Name of event</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={eventDetails.name}
                    required={false}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-item description">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text-area"
                    name="description"
                    placeholder="enter the description"
                    required={false}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="enter the location"
                    required={false}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    placeholder="YYYY-MM-DD"
                    required={false}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    name="time"
                    placeholder="what time are we gonna meet?"
                    required={false}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="creator">Creator</label>
                  <select
                    name="creator"
                    id="creator"
                    required={true}
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                  >
                    <option disabled selected value="">
                      Select an option
                    </option>
                    <option value="Elise">Elise</option>
                    <option value="Fran">Fran</option>
                    <option value="MasterBug">MasterBug</option>
                    <option value="Teacher21">Teacher21</option>
                    <option value="Pixel">Pixel</option>
                    <option value="Ale">Ale</option>
                    <option value="SkyWalker42">SkyWalker42</option>
                    <option value="HarmonyQuest">HarmonyQuest</option>
                    <option value="DataSculptor">DataSculptor</option>
                    <option value="Maria_32">Maria_32</option>
                  </select>
                </div>
                <div className="form-item">
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="insert url"
                    required={false}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="notes">Notes</label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="enter your notes"
                    required={false}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit">Update details</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default EventDetailsPage;
