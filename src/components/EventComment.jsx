function EventComment({ userName, date, comment }) {


  return (
    <section className="comment">
      <span>{userName}: </span>
      <p>{comment}</p>
      <span>{date}</span>
      
    </section>
  );
}

export default EventComment;
