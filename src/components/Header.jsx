import { NavLink } from "react-router-dom"
import './Header.css'
import homeicon from '../assets/white-home-icon.png'

function Header () {
    return (
        <div className="Header">
            <NavLink to='/'>
                <img src={homeicon}/>
                
            </NavLink>

            <NavLink to="/add-event">
                <p>Add New Event</p>
            </NavLink>
        </div>
        
    )

}

"react-router-dom"

export default Header