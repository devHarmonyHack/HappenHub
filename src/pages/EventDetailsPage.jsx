import axios from "axios";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import '../pages/EventDetailsPage.css';

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
  const [notes, setNotes] = useState([]);

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
    
    const confirmDelete = window.confirm("Are you sure you want to delete this event?")
    
    if(confirmDelete){
      axios
        .delete(`${urlAPI}events/${eventId}`)
        .then((response) => {
          console.log('Event deleted')
          navigate('/')
        })
        .catch((error) => {
          console.log("Error deleting from the API...");
          console.log(error);
        })
    }
      
   
  }

  return (
    <div className="EventDetails">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <section className="info-grid-container">
            <div className="grid-item-1">
              <h1>{eventDetails.name}</h1>
              <p>{eventDetails.description}</p>
              
            </div>
            
            <img className="grid-item-2" src={eventDetails.img || defaultImg} alt="event img" />
            
            <div className="grid-item-3">
            <span>Location: {eventDetails.location}</span>
              <br />
              <span>Date: {eventDetails.date}</span>
              <br />
              <span>Creator of the event: {eventDetails.creator}</span>
            </div>

            <div className="grid-item-4">
            <h3>Notes: </h3>
              {eventDetails.notes || <p>No notes for the event</p>}
            </div>
            

            {/* <div className="notes">
              <h3>Notes: </h3>
              {eventDetails.notes || <p>No notes for the event</p>}

              {eventDetails.notes && eventDetails.notes.length > 0 ? (
                eventDetails.notes.map((note, index) => {
                  return <p key={note[index]}>{note}</p>;
                })
              ) : (
                <p>No notes for the event</p>
              )}
            </div> */}
          </section>
            <div>
            <Link to="/">
              {" "}
              <p>Back to events</p>{" "}
            </Link>

            </div>
          
          <section className="edit-event-details">
            <h3>Edit the Event</h3>

            <form onSubmit={handleFormSubmit}>
              <label className="LabelAddNewEvent">
                Name of event
                <input
                  type="text"
                  name="name"
                  placeholder={eventDetails.name}
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Description
                <input
                  type="text"
                  name="description"
                  placeholder="enter the description"
                  required={true}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Location
                <input
                  type="text"
                  name="location"
                  placeholder="enter the location"
                  required={true}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Date
                <input
                  type="date"
                  name="date"
                  placeholder="YYYY-MM-DD"
                  required={true}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Time
                <input
                  type="time"
                  name="time"
                  placeholder="what time are we gonna meet?"
                  required={true}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Creator
                <input
                  type="text"
                  name="creator"
                  placeholder="enter your nickname"
                  required={true}
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Image
                <input
                  type="text"
                  name="image"
                  placeholder="insert url"
                  required={false}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
              <br />
              <label className="LabelAddNewEvent">
                Notes
                <input
                  type="text"
                  name="notes"
                  placeholder="enter your notes"
                  required={false}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              <br />

              <button type="submit">Update details</button>
            </form>

            <button onClick={deleteEvent}>Delete this Event</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default EventDetailsPage;
