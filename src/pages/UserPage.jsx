import axios from "axios";
import { useEffect, useState } from "react";
import "../pages/UserPage.css"

function UserPage() {
  const [users, setUsers] = useState([]);
  const colors = ["#F08D7E", "#EFA18A", "#E2BAB1", "#DDA6B9", "#ACAEC5"];
  const defaultImage = "src/assets/default-profile-picture.png"

  const getAllUsers = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "users")
      .then((response) => {
        
        setUsers(response.data)
        
      })
      .catch((error) => {
        console.log("error: " + error)
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="UserPage">
        {users.map( (user) => {
            const randomColor = getRandomColor()
            return (
                <div className="users" key={user.id} style={{backgroundColor: randomColor}}>
                    <img className="user-img"
                    src={user.image}
                    alt="user img"
                    />
                    <h2>{user.userName}</h2>


                </div>
            )
        })}
    </div>
  )
}

export default UserPage;
