import axios from "axios";
import { useState } from "react";


function HomePage() {
  const [eventDetails, setEventDetails] = useState();

  const getAllEvents = () => {
    axios.get(import.meta.env.VITE_API_URL + "events")
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log("error: " + error)
        });
  };

  getAllEvents();
}

export default HomePage;
