import { NavLink } from "react-router-dom"

function Header () {
    return (
        <div className="Header">
            <NavLink to='/'>
                <p>Home</p>
                
            </NavLink>

            <NavLink to="/add-event">
                <p>Add New Event</p>
            </NavLink>
        </div>
        
    )

}

"react-router-dom"

export default Header