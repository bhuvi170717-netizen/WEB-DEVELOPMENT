
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/heroo";
import MatchCard from "./components/MatchCard";

import { supabase } from "./supabase";
import "./App.css";

function App() {
    const [matches, setMatches] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("All");
    const [selectedMatch, setSelectedMatch] = useState(null);

    const [customerName, setCustomerName] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    // Fetch matches from Supabase
    async function fetchMatches() {
        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .order("id");

        if (error) {
            console.error("Error fetching matches:", error.message);
            setLoading(false);
            return;
        }

        setMatches(data || []);
        setLoading(false);
    }

    // Fetch matches and listen for database changes
    useEffect(() => {
        fetchMatches();

        const channel = supabase
            .channel("matches-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "matches"
                },
                () => {
                    fetchMatches();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Filter matches by team
    const filteredMatches = matches.filter((match) => {
        return (
            selectedTeam === "All" ||
            match.teams.includes(selectedTeam)
        );
    });

    // Select match for booking
    function handleBooking(match) {
        setSelectedMatch(match);
        setCustomerName("");
        setQuantity(1);
    }

    // Book tickets
    async function bookTicket(event) {
        event.preventDefault();

        if (!selectedMatch || bookingLoading) {
            return;
        }

        const ticketCount = Number(quantity);

        // Validate customer name
        if (!customerName.trim()) {
            alert("Please enter your name.");
            return;
        }

        // Validate ticket quantity
        if (
            !Number.isInteger(ticketCount) ||
            ticketCount < 1 ||
            ticketCount > 10
        ) {
            alert("Please select between 1 and 10 tickets.");
            return;
        }

        const totalAmount =
            Number(selectedMatch.ticket_price) * ticketCount;

        setBookingLoading(true);

        try {
            // Step 1: Update available seats
            const { data: updatedMatch, error: updateError } =
                await supabase
                    .from("matches")
                    .update({
                        available_seats:
                            selectedMatch.available_seats - ticketCount
                    })
                    .eq("id", selectedMatch.id)
                    .gte("available_seats", ticketCount)
                    .select();

            if (
                updateError ||
                !updatedMatch ||
                updatedMatch.length === 0
            ) {
                console.error("Seat update error:", updateError);

                alert(
                    "Booking failed. Not enough seats available or database permission denied."
                );

                await fetchMatches();
                return;
            }

            // Step 2: Insert booking into bookings table
            const { error: bookingError } = await supabase
                .from("bookings")
                .insert([
                    {
                        customer_name: customerName.trim(),
                        match_id: selectedMatch.id,
                        tickets: ticketCount,
                        total_amount: totalAmount
                    }
                ]);

            // Step 3: Restore seats if booking insertion fails
            if (bookingError) {
                console.error(
                    "Booking insertion error:",
                    bookingError.message
                );

                const { error: restoreError } = await supabase
                    .from("matches")
                    .update({
                        available_seats:
                            updatedMatch[0].available_seats + ticketCount
                    })
                    .eq("id", selectedMatch.id);

                if (restoreError) {
                    console.error(
                        "Seat restoration error:",
                        restoreError.message
                    );
                }

                alert("Booking could not be saved. Please try again.");

                await fetchMatches();
                return;
            }

            // Step 4: Booking successful
            alert(
                `Booking successful!\n\nMatch: ${selectedMatch.teams}\nTickets: ${ticketCount}\nTotal Amount: ₹${totalAmount}`
            );

            setSelectedMatch(null);
            setCustomerName("");
            setQuantity(1);

            await fetchMatches();

        } catch (error) {
            console.error("Unexpected booking error:", error);
            alert("Something went wrong. Please try again.");

        } finally {
            setBookingLoading(false);
        }
    }

    return (
        <div>
            <Navbar />

            <Hero />

            <section className="matches-section" id="matches">

                <h2>Match Schedule</h2>

                {/* Team Filter */}
                <label>Filter by Team: </label>

                <select
                    value={selectedTeam}
                    onChange={(event) =>
                        setSelectedTeam(event.target.value)
                    }
                >
                    <option value="All">All Teams</option>
                    <option value="RCB">RCB</option>
                    <option value="CSK">CSK</option>
                    <option value="MI">MI</option>
                    <option value="KKR">KKR</option>
                </select>

                {/* Match Cards */}
                <div className="match-container">

                    {loading ? (
                        <p>Loading matches...</p>

                    ) : filteredMatches.length === 0 ? (
                        <p>No matches found.</p>

                    ) : (
                        filteredMatches.map((match) => (
                            <MatchCard
                                key={match.id}
                                matchNo={match.id}
                                teams={match.teams}
                                date={match.match_date}
                                time="7:30 PM"
                                venue={match.venue}
                                general={match.ticket_price}
                                premium={match.ticket_price}
                                vip={match.ticket_price}
                                onBook={() => handleBooking(match)}
                            />
                        ))
                    )}

                </div>

                {/* Booking Form */}
                {selectedMatch && (
                    <div className="booking-confirmation">

                        <h2>Book Tickets</h2>

                        <p>
                            Match: {selectedMatch.teams}
                        </p>

                        <p>
                            Date: {selectedMatch.match_date}
                        </p>

                        <p>
                            Venue: {selectedMatch.venue}
                        </p>

                        <p>
                            Price per ticket: ₹{selectedMatch.ticket_price}
                        </p>

                        <p>
                            Available Seats: {selectedMatch.available_seats}
                        </p>

                        <form onSubmit={bookTicket}>

                            <label>Your Name:</label>

                            <input
                                type="text"
                                value={customerName}
                                onChange={(event) =>
                                    setCustomerName(event.target.value)
                                }
                                placeholder="Enter your name"
                                required
                            />

                            <br /><br />

                            <label>Number of Tickets:</label>

                            <input
                                type="number"
                                min="1"
                                max="10"
                                step="1"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                                required
                            />

                            <h3>
                                Total Amount: ₹
                                {Number(selectedMatch.ticket_price) *
                                    Number(quantity)}
                            </h3>

                            <button
                                type="submit"
                                disabled={bookingLoading}
                            >
                                {bookingLoading
                                    ? "Processing..."
                                    : "Confirm Booking"}
                            </button>

                            <button
                                type="button"
                                disabled={bookingLoading}
                                onClick={() => setSelectedMatch(null)}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>
                )}

            </section>
        </div>
    );
}

export default App;
