import axios from "axios";
import { useEffect, useState } from "react";
import "../pages/UserPage.css";
import { NavLink } from "react-router-dom";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const colors = ["#F08D7E", "#EFA18A", "#E2BAB1", "#DDA6B9", "#ACAEC5"];

  const filteredUsers = users.filter((user) => {
    return user.userName.toLowerCase().includes(query.toLowerCase());
  });

  const getAllUsers = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "users")
      .then((response) => {
        setUsers(response.data);
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

  const getRandomImg = () => {
    const randomImageId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/100?random=${randomImageId}`;
  }

  const sortByName = () => {
    const toSortyByName = [...users];
    const sortedByName = toSortyByName.sort((a, b) => {
      return a.userName.toLowerCase().localeCompare(b.userName.toLowerCase());
    });
    setUsers(sortedByName);
  };

  return (
    <div className="UserPage">
        <div className="sort-search">
        <button
        className="SortByName"
        onClick={() => {
          sortByName();
        }}
      >
        Sort by name
      </button>
      <label>
        Search:
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
        />
      </label>
        </div>
      {filteredUsers.map((user) => {
        const randomColor = getRandomColor();
        const userImageUrl = getRandomImg();
        return (
          <NavLink to={`/users/${user.id}`} key={user.id}>
            <div
              className="users"
              key={user.id}
              style={{ backgroundColor: randomColor }}
            >
              <img className="user-img" src={userImageUrl} alt="user img" />
              <h2 className="user-name">{user.userName}</h2>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}

export default UserPage
