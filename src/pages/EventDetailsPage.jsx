import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams, useNavigate } from "react-router-dom"


const urlAPI = import.meta.env.VITE_API_URL
const defaultImg = ('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

function EventDetailsPage () {

    const {eventId} = useParams();
    const navigate = useNavigate();

    const [eventDetails, setEventDetails] = useState({})
    const [loading, setLoading] = useState((true))

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("YYYY-MM-DD")
    const [location, setLocation] = useState("")
    const [creator, setCreator] = useState("")


    // get data from API
    useEffect(() => {
        setLoading(true);
        axios.get(`${urlAPI}events/${eventId}`)
            .then((response) => {

                console.log('getting event from API...')
                console.log(response.data)
                setEventDetails(response.data)
            })
            .catch((error) => {
                console.log("Error getting event details from the API...");
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            })
    },[eventId])

    // edit project
    const handleFormSubmit = (e) => {
      e.preventDefault();
    
      const requestBody = { name, description, date, location, creator };
    
      axios
        .put(`${urlAPI}events/${eventId}`, requestBody)
        .then((response) => {
          setLoading(false);
          console.log("Success updating event");
          console.log(response.data);
          navigate(`/`);
        })
        .catch((error) => {
          setLoading(false); 
          console.log("Error updating project...");
          console.log(error);
        });
    };
    
    return (
      <div className="EventDetails">
        {loading ? (
          <p>Loading...</p>
        ) : (
          
          <div>
            <section className="event-card">
              <div className="info">
                <h1>{eventDetails.name}</h1>
                <p>{eventDetails.description}</p>
                <span>Location: {eventDetails.location}</span>
                <br />
                <span>Date: {eventDetails.date}</span>
                <br />
                <span>Creator of the event: {eventDetails.creator}</span>
              </div>

              <img src={eventDetails.img || defaultImg} alt="event img" />

              <div className="notes">
                <h3>Notes: </h3>
                {eventDetails.notes && eventDetails.notes.length > 0 ? (
                  eventDetails.notes.map((note, index) => {
                    return <p key={note[index]}>{note}</p>;
                  })
                ) : (
                  <p>No notes for the event</p>
                )}
              </div>

              <Link to="/"> <p>Back to events</p> </Link>
            </section>

            <section className="edit-event-details">
                  <h3>Edit the Event</h3>

                  <form onSubmit={handleFormSubmit}>
                    <label>
                      Name of event
                      <input
                         type="text"
                         name="name"
                         placeholder="enter the name"
                         required = {true}
                         value={name} 
                         onChange={((e) => setName(e.target.value))}
                         />
                    </label>
                    <br />  
                    <label>
                      Description
                      <input
                         type="text"
                         name="description"
                         placeholder="enter the description"
                         required = {true}
                         value={description} 
                         onChange={((e) => setDescription(e.target.value))}
                         />
                    </label>
                    <br />
                    <label>
                      Location
                      <input
                         type="text"
                         name="location"
                         placeholder="enter the location"
                         required = {true}
                         value={location} 
                         onChange={((e) => setLocation(e.target.value))}
                         />
                    </label>
                    <br />
                    <label>
                      Date
                      <input
                         type="text"
                         name="date"
                         placeholder="YYYY-MM-DD"
                         required = {true}
                         value={date} 
                         onChange={((e) => setDate(e.target.value))}
                         />
                    </label>
                    <br />
                    <label>
                      Creator
                      <input
                         type="text"
                         name="creator"
                         placeholder="enter your nickname"
                         required = {true}
                         value={creator} 
                         onChange={((e) => setCreator(e.target.value))}
                         />
                    </label>
                    <br />
                    <button type="submit">Update details</button>
                  </form>

            </section>

          </div>
          
        )}
      </div>
    );

}

export default EventDetailsPage