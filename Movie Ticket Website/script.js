document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    const seatContainer = document.querySelector(".row-container");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const movieSelect = document.getElementById("movie");
    const bookButton = document.getElementById("bookButton");

    populateUI();

    let ticketPrice = +movieSelect.value;

    function setMovieData(movieIndex, moviePrice) {
        localStorage.setItem("selectedMovieIndex", movieIndex);
        localStorage.setItem("selectedMoviePrice", moviePrice);
    }

    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll(".row-container .selected");

        seatsIndex = [...selectedSeats].map(function (seat) {
            return [...seats].indexOf(seat);
        });

        localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

        let selectedSeatsCount = selectedSeats.length;
        count.textContent = selectedSeatsCount;
        total.textContent = selectedSeatsCount * ticketPrice;
    }

    function populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

        if (selectedSeats !== null && selectedSeats.length > 0) {
            seats.forEach(function (seat, index) {
                if (selectedSeats.indexOf(index) > -1) {
                    seat.classList.add("selected");
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

        if (selectedMovieIndex !== null) {
            movieSelect.selectedIndex = selectedMovieIndex;
        }
    }

    movieSelect.addEventListener("change", function (e) {
        ticketPrice = +movieSelect.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
    });

    seatContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
            e.target.classList.toggle("selected");
            updateSelectedCount();
        }
    });


    bookButton.addEventListener("click", function () {
        // Add logic for booking here
        alert("Tickets Booked");
    });

    updateSelectedCount();
});
