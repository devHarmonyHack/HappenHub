import {  useState } from "react";

function EventComment({ userName, date, comment }) {

  const [comments, setComments] = useState([
    { userName: "User1", date: "2023-01-01", comment: "Great event!" },
    { userName: "User2", date: "2023-01-01", comment: "Awesome experience!" },
  ]);

  return (
    <section className="comments-section">
      {comments.map((comment, index) => (
         <div className="comment" key={index}>
         <span>{comment.userName}: </span>
         <p>{comment.comment}</p>
         <span>{comment.date}</span>
       </div>
      ))}
    </section>
  );
}

export default EventComment;
