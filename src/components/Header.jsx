import { NavLink } from "react-router-dom"
import './Header.css'

function Header () {
    return (
        <div className="Header">
            <NavLink to='/'>
                <img src="src/assets/white-diary.png"/>
                
            </NavLink>

            <NavLink to="/add-event">
                <p>Add New Event</p>
            </NavLink>
        </div>
        
    )

}

"react-router-dom"

export default Header