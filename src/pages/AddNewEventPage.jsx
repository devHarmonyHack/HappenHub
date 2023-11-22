import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/AddNewEventPage.css";

const ADD_NEW_EVENT_URL = `${import.meta.env.VITE_API_URL}events`;

function AddNewEventPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const attendeesArray = [];
    const attendeesKeys = Object.keys(checked);
    
    attendeesKeys.forEach((key) => {
      const isAttending = checked[key];
      if (isAttending) {
        attendeesArray.push(key);
      }
    });

    console.log(attendeesArray);

    const requestBody = {
      name,
      location,
      date,
      time,
      creator,
      description,
      image,
      notes,
      attendees: attendeesArray,
      comments: []
    };

    axios
      .post(ADD_NEW_EVENT_URL, requestBody)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error in creating a new event: " + error);
      });
  };

  function handleCheckBox(event, attendee) {
    const copyChecked = { ...checked };
    copyChecked[event.target.defaultValue] = event.target.checked;
    setChecked(copyChecked);
  }

  return (
    <div className="AddNewEvent">
      <form onSubmit={handleSubmit}>
        <div className="AddNewEvent-grid">
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
          <label>Attendees:</label>
          <div className="attendees-boxes">
            <label className="checkbox">
              <input
                type="checkbox"
                value="Elise"
                onChange={handleCheckBox}
              />
              Elise
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="Fran"
                onChange={handleCheckBox}
              />
              Fran
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="MasterBug"
                onChange={handleCheckBox}
              />
              MasterBug
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="Teacher21"
                onChange={handleCheckBox}
              />
              Teacher21
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="Pixel"
                onChange={handleCheckBox}
              />
              Pixel
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="Ale"
                onChange={handleCheckBox}
              />
              Ale
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="SkyWalker42"
                onChange={handleCheckBox}
              />
              SkyWalker42
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="HarmonyQuest"
                onChange={handleCheckBox}
              />
              HarmonyQuest
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="DataSculptor"
                onChange={handleCheckBox}
              />
              DataSculptor
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="Maria_32"
                onChange={handleCheckBox}
              />
              Maria_32
            </label>
          </div>
        </div>

        <button type="subit">Add New Event</button>
      </form>
    </div>
  );
}

export default AddNewEventPage;
