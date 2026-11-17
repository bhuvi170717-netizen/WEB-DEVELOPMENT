
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


// Show notification on booking page

if (window.location.pathname.includes("booking.html")) {

    showToast("Welcome! Book your IPL tickets here.");

}

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


// Show notification on booking page

if (window.location.pathname.includes("booking.html")) {

    showToast("Welcome! Book your IPL tickets here.");

}


// Activity 7: Live Booking Summary

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    // Selecting form elements

    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const ticketsInput = document.getElementById("tickets");

    // Selecting summary elements

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryTotal = document.getElementById("summaryTotal");


    // Ticket prices for different matches

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


    // Function to update booking summary

    function updateSummary() {

        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(ticketsInput.value);

        let price = 0;

        if (match && stand) {

            price = ticketPrices[match][stand];

        }

        const total = price * quantity;

        // Updating summary card

        summaryMatch.textContent = match || "Not selected";

        summaryStand.textContent = stand || "Not selected";

        summaryQuantity.textContent = quantity || 0;

        summaryPrice.textContent = price;

        summaryTotal.textContent = total;

        showToast("Booking summary updated!");

    }


    // Adding event listeners

    matchSelect.addEventListener("change", updateSummary);

    standSelect.addEventListener("change", updateSummary);

    ticketsInput.addEventListener("input", updateSummary);


    // Update summary when form is reset

    bookingForm.addEventListener("reset", function() {

        setTimeout(function() {

            summaryMatch.textContent = "Not selected";
            summaryStand.textContent = "Not selected";
            summaryQuantity.textContent = 1;
            summaryPrice.textContent = 0;
            summaryTotal.textContent = 0;

        }, 0);

    });


    // Prevent page reload on form submission

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        showToast("Booking submitted successfully!");

    });

}

