
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/heroo";
import MatchCard from "./components/MatchCard";

import "./App.css";

function App() {
  // Match data
  const matches = [
    {
      matchNo: 1,
      teams: "RCB vs CSK",
      date: "15 April 2026",
      time: "7:30 PM",
      venue: "Bengaluru",
      general: 800,
      premium: 2000,
      vip: 5000,
    },
    {
      matchNo: 2,
      teams: "MI vs KKR",
      date: "18 April 2026",
      time: "7:30 PM",
      venue: "Mumbai",
      general: 900,
      premium: 2200,
      vip: 5500,
    },
    {
      matchNo: 3,
      teams: "CSK vs MI",
      date: "21 April 2026",
      time: "3:30 PM",
      venue: "Chennai",
      general: 700,
      premium: 1800,
      vip: 4500,
    },
  ];

  // React State
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Handle booking
  
  function handleBooking(match) {
  console.log("Button clicked!", match);
  setSelectedMatch(match);
}

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    if (selectedTeam === "All") {
      return true;
    }

    return match.teams.includes(selectedTeam);
  });

  return (
    <div>
      <Navbar />

      <Hero />

      <section className="matches-section" id="matches">
        <h2>Match Schedule</h2>

        <label>Filter by Team: </label>

        <select
          value={selectedTeam}
          onChange={(event) => setSelectedTeam(event.target.value)}
        >
          <option value="All">All Teams</option>
          <option value="RCB">RCB</option>
          <option value="CSK">CSK</option>
          <option value="MI">MI</option>
          <option value="KKR">KKR</option>
        </select>

        <div className="match-container">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.matchNo}
              matchNo={match.matchNo}
              teams={match.teams}
              date={match.date}
              time={match.time}
              venue={match.venue}
              general={match.general}
              premium={match.premium}
              vip={match.vip}
              onBook={handleBooking}
            />
          ))}
        </div>

        {selectedMatch && (
          <div className="booking-confirmation">
            <h2>Booking Selected!</h2>
            <p>Match: {selectedMatch.teams}</p>
            <p>Date: {selectedMatch.date}</p>
            <p>Venue: {selectedMatch.venue}</p>

            <button onClick={() => setSelectedMatch(null)}>
              Close
            </button>
          </div>
        )}

        {filteredMatches.length === 0 && <p>No matches found.</p>}
      </section>
    </div>
  );
}

export default App;
