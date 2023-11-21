import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import EventDetailsPage from './pages/EventDetailsPage'
import AddNewEventPage from './pages/AddNewEventPage'
import Footer from './components/Footer'
import UserPage from './pages/UserPage'
import UserDetails from './pages/UserDetailsPage'


function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/add-event" element={<AddNewEventPage />} />
        <Route path="/users" element={<UserPage/>} />
        <Route path="/users/:userId" element={<UserDetails />} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App
