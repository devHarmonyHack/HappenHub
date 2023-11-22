function EventComment({comments}) {

console.log(comments.length)
  return (
    <section className="comments-section">
     {comments.length === 0 && (
      <p>No comments yet</p>
     )} 

    {comments.length !== 0 && (
      comments.map((comment, index) => (
        <div className="comment" key={index}>
          <span>{comment.userName}: </span>
          <p>{comment.comment}</p>
          <span>{comment.date}</span>
        </div>
      ))
    )}
      
    </section>
  );
}

export default EventComment;
