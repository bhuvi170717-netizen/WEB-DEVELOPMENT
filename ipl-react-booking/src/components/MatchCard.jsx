
function MatchCard(props) {
  return (
    <div className="match-card">
      <h2>{props.teams}</h2>
      <p>Match No: {props.matchNo}</p>
      <p>Date: {props.date}</p>
      <p>Time: {props.time}</p>
      <p>Venue: {props.venue}</p>

      <div className="prices">
        <p>General: ₹{props.general}</p>
        <p>Premium: ₹{props.premium}</p>
        <p>VIP: ₹{props.vip}</p>
      </div>

      <button onClick={() => props.onBook(props)}>
        Book Ticket
      </button>
    </div>
  );
}

export default MatchCard;
