import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AddNewEventPage from "./pages/AddNewEventPage";
import Footer from "./components/Footer";
import UserPage from "./pages/UserPage";
import UserDetails from "./pages/UserDetailsPage";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  function getEvents() {
    axios
      .get(import.meta.env.VITE_API_URL + "events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  function getUsers() {
    axios
      .get(import.meta.env.VITE_API_URL + "users")
      .then((result) => {
        setUsers(result.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  useEffect(() => {
    getEvents();
    getUsers();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/events/:eventId"
          element={<EventDetailsPage  />}
        />
        <Route path="/add-event" element={<AddNewEventPage users={users}/>} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:userId" element={<UserDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
