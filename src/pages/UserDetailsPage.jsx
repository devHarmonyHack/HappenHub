import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../pages/UserDetailsPage.css'

const urlAPI = import.meta.env.VITE_API_URL;

function UserDetails() {
  const [userDetails, setUserDetails] = useState({});
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${urlAPI}/users/${userId}`)
      .then((response) => {
        console.log("getting user from API");
        console.log(response.data)
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log("Error getting user details from the API...");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="UserDetails">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <section className="user-info">
          <h2>UserName: {userDetails.userName}</h2>
          <p>Contact: {userDetails.contact}</p>
          <p>About me: {userDetails.aboutMe}</p>
          <img src={userDetails.image} alt="" />
        </section>
        <div className="user-events">
          <Link to="/events/1">
            <p>Attending Events:   (Link to events)</p>
          </Link>
          <Link to="/events/2">
          <p>Events created:   (Link to events)</p>
          </Link>
            
            
        </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
