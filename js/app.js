
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
