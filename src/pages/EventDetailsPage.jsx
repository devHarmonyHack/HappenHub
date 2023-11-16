import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const urlAPI = import.meta.env.VITE_API_URL
const defaultImg = ('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

function EventDetailsPage () {

    const {eventId} = useParams();

    const [eventDetails, setEventDetails] = useState({})
    const [loading, setLoading] = useState((true))

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

    return (
      <div className="EventDetails">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="event-card">
            <div className="info">
              <h2>{eventDetails.name}</h2>
              <p>{eventDetails.description}</p>
              <span>Creator: {eventDetails.creator}</span>
              <span>Location: {eventDetails.location}</span>
              <img src={eventDetails.img || defaultImg} alt="event img" />   {/*Later will be img from event */}
              <div className="notes">
                {eventDetails &&
                  eventDetails.notes.length > 0 ? (
                    eventDetails.notes.map((note, index) => {
                        return <p key={note[index]}>{note}</p>;
                      })
                  ) : (<p>No notes for the event</p>)                  
                  }
              </div>
            </div>
          </div>
        )}
      </div>
    );

}

export default EventDetailsPage