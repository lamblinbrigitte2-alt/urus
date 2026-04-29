const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const dailyRates = {
  economy: 250,
  sedan: 400,
  suv: 650,
  premium: 950,
};

const quickBooking = document.getElementById("quickBooking");
if (quickBooking) {
  quickBooking.addEventListener("submit", (event) => {
    event.preventDefault();

    const pickup = new Date(document.getElementById("pickupDate").value);
    const dropoff = new Date(document.getElementById("returnDate").value);
    const vehicleClass = document.getElementById("vehicleClass").value;
    const result = document.getElementById("quoteResult");
    const dayMs = 24 * 60 * 60 * 1000;
    const days = Math.ceil((dropoff - pickup) / dayMs);

    if (!Number.isFinite(days) || days <= 0) {
      result.textContent = "Return date must be after pickup date.";
      return;
    }

    const total = days * dailyRates[vehicleClass];
    result.textContent = `${days} day rental estimate: ${total.toLocaleString("en-US")} DHS. Final price is confirmed by URUS CAR.`;
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const fleetSearch = document.getElementById("fleetSearch");
const vehicleCards = document.querySelectorAll(".vehicle-card");
let activeFilter = "all";

function updateFleet() {
  const query = (fleetSearch?.value || "").trim().toLowerCase();

  vehicleCards.forEach((card) => {
    const typeMatch = activeFilter === "all" || card.dataset.type === activeFilter;
    const searchable = `${card.textContent} ${card.dataset.tags}`.toLowerCase();
    const searchMatch = !query || searchable.includes(query);
    card.hidden = !(typeMatch && searchMatch);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateFleet();
  });
});

if (fleetSearch) {
  fleetSearch.addEventListener("input", updateFleet);
}

const requestForm = document.getElementById("requestForm");
if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(requestForm);
    const result = document.getElementById("requestResult");
    const name = formData.get("name") || "Customer";
    const phone = formData.get("phone") || "phone not provided";
    const pickup = formData.get("pickup") || "URUS CAR Tangier office";
    const message = formData.get("message") || "No extra message";

    result.textContent = `Request ready for URUS CAR: ${name}, ${phone}, pickup at ${pickup}. Details: ${message}`;
  });
}
