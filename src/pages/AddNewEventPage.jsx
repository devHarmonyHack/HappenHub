import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/AddNewEventPage.css";

const ADD_NEW_EVENT_URL = `${import.meta.env.VITE_API_URL}events`

function AddNewEventPage () {

const [name, setName] = useState("")
const [location, setLocation] = useState("")
const [date, setDate] = useState("")
const [time, setTime] = useState("")
const [creator, setCreator] = useState("")
const [description, setDescription] = useState("")
const [image, setImage] = useState("")
const [notes, setNotes] = useState("")


const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault()

   

    const requestBody = {
        name: name,
        location: location,
        date: date,
        time: time,
        creator: creator,
        description: description,
        image: image,
        notes: notes,
    }  

    axios.post(ADD_NEW_EVENT_URL, requestBody)
    .then( (response) => {
        navigate("/")
    })
    .catch( (error) => {
        console.log("Error in creating a new event: " + error)
    })
}

return (
  <div>
    <form onSubmit={handleSubmit}>
      <div className="AddNewEvent">
        <label className="LabelAddNewEvent">
          Name of event
          <input
            type="text"
            name="name"
            placeholder="enter the name of the event"
            required={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="LabelAddNewEvent">
          Description
          <textarea
            type="text"
            name="description"
            placeholder="describe the event"
            required={false}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="LabelAddNewEvent">
          Location
          <input
            type="text"
            name="location"
            placeholder="where are we gonna meet?"
            required={false}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label className="LabelAddNewEvent">
          Date
          <input
            type="date"
            name="date"
            placeholder="when are we gonna meet?"
            required={false}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="LabelAddNewEvent">
          Time
          <input
            type="time"
            name="time"
            placeholder="what time are we gonna meet?"
            required={false}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label className="LabelAddNewEvent">
          Creator
          <input
            type="text"
            name="creator"
            placeholder="enter your (nick)name"
            required={false}
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </label>

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

        <label className="LabelAddNewEvent">
          Notes
          <input
            type="text"
            name="notes"
            placeholder="insert a note"
            required={false}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
      </div>

      <button type="subit">Add New Event</button>
    </form>
  </div>
);
}

export default AddNewEventPage