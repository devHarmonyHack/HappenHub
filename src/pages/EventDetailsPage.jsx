import axios from "axios";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import "../pages/EventDetailsPage.css";

const urlAPI = import.meta.env.VITE_API_URL;
const defaultImg =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("YYYY-MM-DD");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [creator, setCreator] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");

  const randomImageId = Math.floor(Math.random() * 1000)
  const imageUrl = `https://picsum.photos/400/300?random=${randomImageId}`

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${urlAPI}events/${eventId}`)
      .then((response) => {
        console.log("getting event from API...");
        console.log(response.data);
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.log("Error getting event details from the API...");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId]);

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
      notes
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
      axios
        .delete(`${urlAPI}events/${eventId}`)
        .then((response) => {
          console.log("Event deleted");
          navigate("/");
        })
        .catch((error) => {
          console.log("Error deleting from the API...");
          console.log(error);
        });
    }
  };

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
              <span>
                Location: {eventDetails.location} 
              </span>
              <br />
              <span>Date: {eventDetails.date}</span>
              <br />
              <span>Creator of the event: {eventDetails.creator}</span>
              <br />
              <span>
                Notes: {eventDetails.notes || <p>No notes for the event</p>}
              </span>
            </div>

            <img
              className="event-img"
              src={eventDetails.img || imageUrl}
              alt="event img"
            />
          </section>

          <div className="buttons-row">
            <Link to="/">
              {" "}
              <p>Back to events</p>{" "}
            </Link>

            <button onClick={deleteEvent}>Delete this Event</button>
          </div>

          <section>
            <h3>Edit the Event</h3>

            <form onSubmit={handleFormSubmit} className="edit-event-form">
              <div className="form-wrapper">
                <div className="form-item-1 form-item">
                  <label htmlFor="name">
                    Name of event</label>
                    <input
                      type="text"
                      name="name"
                      placeholder={eventDetails.name}
                      required={false}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  
                </div>

                <div className="form-item-2 form-item">
                  <label htmlFor="description">
                    Description</label>
                    <textarea
                      type="text-area"
                      name="description"
                      placeholder="enter the description"
                      required={false}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  
                </div>
                <div className="form-item-3 form-item">
                  <label htmlFor="location">
                    Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="enter the location"
                      required={false}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  
                </div>
                <div className="form-item-4 form-item">
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
                <div className="form-item-5 form-item">
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
                <div className="form-item-6 form-item">
                  <label htmlFor="creator">
                    Creator</label>
                    <input
                      type="text"
                      name="creator"
                      placeholder="enter your nickname"
                      required={false}
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                    />
                  
                </div>
                <div className="form-item-7 form-item">
                  <label htmlFor="image">
                    Image</label>
                    <input
                      type="text"
                      name="image"
                      placeholder="insert url"
                      required={false}
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  
                </div>
                <div className="form-item-8 form-item">
                  <label htmlFor="notes">
                    Notes</label>
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
