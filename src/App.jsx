import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import EventDetailsPage from './pages/EventDetailsPage'
import AddNewEventPage from './pages/AddNewEventPage'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:eventId" element={<EventDetailsPage />} />
        <Route path="/add-event" element={<AddNewEventPage />} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App
