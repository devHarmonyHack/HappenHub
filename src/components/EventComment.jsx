import axios from "axios";
import { useState } from "react";

const urlAPI = import.meta.env.VITE_API_URL;

function EventComment({ comments, eventId, eventDetails }) {
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");
// console.log(comments.length)

  const today = new Date().toLocaleDateString('en-US');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      userName,
      comment : userComment,
      date : today
    }
    const copyEvent = {...eventDetails}
    console.log(copyEvent)

    const requestBody= copyEvent.comments.push(newComment)

    axios.put(`${urlAPI}events/${eventId}`, requestBody)
    .then((response) => {
      
      console.log('event updated')
      console.log(response.data)
      setShowForm(false)
      refreshPage();
    })

  }

  return (
    <>
      <section className="comments-section">
        {showForm ? (
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="userName">
              User Name:
              <select
               name="userName"
                id="userName"
                required={true}
                value={userName}
                onChange={(e)=> setUserName(e.target.value)}
              >
                <option disabled selected value="">
                  Who are you?
                </option>
                <option value=""></option>
                <option value="Elise">Elise</option>
                    <option value="Fran">Fran</option>
                    <option value="MasterBug">MasterBug</option>
                    <option value="Teacher21">Teacher21</option>
                    <option value="Pixel">Pixel</option>
                    <option value="Ale">Ale</option>
                    <option value="SkyWalker42">SkyWalker42</option>
                    <option value="HarmonyQuest">HarmonyQuest</option>
                    <option value="DataSculptor">DataSculptor</option>
                    <option value="Maria_32">Maria_32</option>
              </select>
            </label>
            <label htmlFor="comment">
              Comment: 
              <textarea
               type="text-area"
               name="new comment"
               required={true}
               value={userComment} 
               onChange={(e) => setUserComment(e.target.value)} 
               />
            </label>
            <button type="submit" onClick={(e) => {setShowForm(false)}}>Submit comment</button>
          </form>
        ) : (
          <>
          {comments.length === 0 && <p>No comments yet</p> }
           
        </>
        )}

        {comments.length !== 0 &&
          comments.map((comment, index) => (
            <div className="comment" key={index}>
              <span>{comment.userName}: </span>
              <p>{comment.comment}</p>
              <span>{comment.date}</span>
            </div>
          ))}

      </section>

      <button onClick={() => setShowForm(true)} >Add Comment</button>
      <button onClick={() => setShowForm(false)} >Show comments</button>
    </>
  );
}

export default EventComment;
