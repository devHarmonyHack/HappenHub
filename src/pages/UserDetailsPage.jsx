import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../pages/UserDetailsPage.css'

const urlAPI = import.meta.env.VITE_API_URL;
const colors = ["#F08D7E", "#EFA18A", "#E2BAB1", "#DDA6B9", "#ACAEC5"];

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

  const randomColor =  () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };


  return (
    <div className="UserDetails">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
      
        <section className="user-info" style={{backgroundColor : randomColor()}}>
          <h2>UserName: {userDetails.userName}</h2>
          <p>Contact: {userDetails.contact}</p>
          <p>About me: {userDetails.aboutMe}</p>
          <img src={userDetails.image} alt="" />
        </section>
        <div className="user-events">
          {userDetails.events.attending !== null && 
            <Link to={`/events/${userDetails.events.attending}`}>
              <p>Attending Events:   {userDetails.events.attending}</p>
            </Link>}
          {userDetails.events.created !== null && <Link to={`/events/${userDetails.events.created}`}>
          <p>Events created: </p>
          </Link>}
          
            
            
        </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
