import axios from "axios";
import { useEffect, useState } from "react";
import "../pages/UserPage.css";

function UserPage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState("")
  const colors = ["#F08D7E", "#EFA18A", "#E2BAB1", "#DDA6B9", "#ACAEC5"];

  const filteredUsers = users.filter( (user) => {
    return user.userName.toLowerCase().includes(query.toLowerCase())
  })

  const getAllUsers = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "users")
      .then((response) => {
        setUsers(response.data)        
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="UserPage">
      <label htmlFor="">
        Search:
        <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="search" />
      </label>
      {filteredUsers.map( (user) => {
        const randomColor = getRandomColor();
        return (
          <div
            className="users"
            key={user.id}
            style={{ backgroundColor: randomColor }}
          >
            <img className="user-img" src={user.image} alt="user img" />
            <h2>{user.userName}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default UserPage;
