
/* =================================
   TOAST NOTIFICATION FUNCTION
================================= */

function showToast(message) {

    let toast = document.createElement("div");

    toast.innerText = message;

    toast.style.backgroundColor = "green";
    toast.style.color = "white";
    toast.style.padding = "15px";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}


/* =================================
   ACTIVITY 7 - LIVE BOOKING SUMMARY
================================= */

if (window.location.pathname.includes("booking.html")) {

    showToast("Welcome! Book your IPL tickets here.");

}

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const ticketsInput = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryTotal = document.getElementById("summaryTotal");


    const ticketPrices = {

        "RCB vs CSK": {
            "General": 800,
            "Premium": 2000,
            "VIP": 5000
        },

        "MI vs KKR": {
            "General": 900,
            "Premium": 2200,
            "VIP": 5500
        },

        "CSK vs MI": {
            "General": 700,
            "Premium": 1800,
            "VIP": 4500
        }

    };


    function updateSummary() {

        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(ticketsInput.value) || 0;

        let price = 0;

        if (match && stand) {

            price = ticketPrices[match][stand];

        }

        const total = price * quantity;

        summaryMatch.textContent = match || "Not selected";
        summaryStand.textContent = stand || "Not selected";
        summaryQuantity.textContent = quantity;
        summaryPrice.textContent = price;
        summaryTotal.textContent = total;

        showToast("Booking summary updated!");

    }


    matchSelect.addEventListener("change", updateSummary);

    standSelect.addEventListener("change", updateSummary);

    ticketsInput.addEventListener("input", updateSummary);


    // Reset booking summary

    bookingForm.addEventListener("reset", function() {

        setTimeout(function() {

            summaryMatch.textContent = "Not selected";
            summaryStand.textContent = "Not selected";
            summaryQuantity.textContent = 1;
            summaryPrice.textContent = 0;
            summaryTotal.textContent = 0;

        }, 0);

    });


    // Submit booking

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        showToast("Booking submitted successfully!");

    });

}


/* =================================
   ACTIVITY 8 - HAMBURGER MENU
================================= */

const hamburger = document.getElementById("hamburger");

const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", function() {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        hamburger.textContent = isOpen ? "✕" : "☰";

        hamburger.setAttribute("aria-expanded", isOpen);

    });


    // Close menu after clicking a navigation link

    const links = navLinks.querySelectorAll("a");

    links.forEach(function(link) {

        link.addEventListener("click", function() {

            navLinks.classList.remove("active");

            hamburger.textContent = "☰";

            hamburger.setAttribute("aria-expanded", "false");

        });

    });

}


/* =================================
   ACTIVITY 8 - TEAM FILTER
================================= */

const teamFilter = document.getElementById("teamFilter");

const matchContainer = document.getElementById("matchContainer");

const noMatches = document.getElementById("noMatches");

if (teamFilter && matchContainer) {

    const matchCards = matchContainer.querySelectorAll(".match-card");

    teamFilter.addEventListener("change", function() {

        const selectedTeam = teamFilter.value;

        let visibleCount = 0;

        matchCards.forEach(function(card) {

            const teams = card.dataset.team.split(" ");

            if (selectedTeam === "All" ||
                teams.includes(selectedTeam)) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });

        if (noMatches) {

            noMatches.hidden = visibleCount !== 0;

        }

        showToast("Match filter updated!");

    });

}


/* =================================
   ACTIVITY 8 - GRID AND LIST VIEW
================================= */

const gridButton = document.getElementById("gridView");

const listButton = document.getElementById("listView");

if (gridButton && listButton && matchContainer) {

    gridButton.addEventListener("click", function() {

        matchContainer.classList.remove("list-view");

        gridButton.classList.add("active-view");

        listButton.classList.remove("active-view");

        showToast("Grid view activated!");

    });


    listButton.addEventListener("click", function() {

        matchContainer.classList.add("list-view");

        listButton.classList.add("active-view");

        gridButton.classList.remove("active-view");

        showToast("List view activated!");

    });

}
