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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("YYYY-MM-DD");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [creator, setCreator] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");

  const [userId, setUserId] = useState(null);

  // const[eventsCreated, setEventsCreated] = useState({})

  const randomImageId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/400/300?random=${randomImageId}`;

  const [comments, setComments] = useState([
    { userName: "User1", date: "2023-01-01", comment: "Great event!" },
    { userName: "User2", date: "2023-01-01", comment: "Awesome experience!" },
  ]);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${urlAPI}events/${eventId}`)
      .then((response) => {
        // console.log("getting event from API...");
        // console.log(response.data);
        setEventDetails(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setLocation(response.data.location);
        setDate(response.data.date);
        setTime(response.data.time);
        setCreator(response.data.creator);
        setImage(response.data.image);
        setNotes(response.data.notes);

        axios
          .get(`${urlAPI}users`)
          .then((result) => {
          const user = result.data.find(element => element.userName === response.data.creator)
            
            setUserId(user.id)
          }
           
          );
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
      notes,
    };

    // const updatedArray = new array here

    

  
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


      // axios.get(`${urlAPI}users/${eventDetails.id}`) //just used get to see the information
      // .then( (information) => {
      //   console.log(information.data.events)

      // })
      // .catch( (error) => {

      // })

// 1. fetch data from original creator (.get)
// 2. filter out event from the array of original creator (array.filter)
// 3. update that filtered array in the API (.put)
// 4. fetch new creator data (.get)
// 5. add event to array of this creator ([...array, new event])
// 6. update the array in API (.put)
      
      // I need the eventId, new creator and old creator
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

          <h3>Comments</h3>
          <div className="comments-section">
            {comments.map((comment, index) => (
              <EventComment key={index} {...comment} />
            ))}
          </div>

          <section>
            <h3>Edit the Event</h3>

            <form onSubmit={handleFormSubmit} className="edit-event-form">
              <div className="form-wrapper">
                <div className="form-item-1 form-item">
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

                <div className="form-item-2 form-item">
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
                <div className="form-item-3 form-item">
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
                <div className="form-item-7 form-item">
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
                <div className="form-item-8 form-item">
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
