/* =========================
   WHATSAPP FUNCTIONS
========================= */

function openWhatsApp() {
    window.open("https://wa.me/8801720262742", "_blank");
}

function buyNow(product) {
    const message = `I want to order ${product}`;
    const url = `https://wa.me/8801720262742?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

/* =========================
   IPS CALCULATOR
========================= */

function calculateIPS() {

    let fans = Number(document.getElementById("fanCount").value);
    let lights = Number(document.getElementById("lightCount").value);

    let totalVA = (fans * 120) + (lights * 30);

    document.getElementById("totalVA").innerText = totalVA;

    let recommendation = "";

    if (totalVA <= 650) {
        recommendation = "Recommended: 650VA IPS — ৳12,000";
    }
    else if (totalVA <= 850) {
        recommendation = "Recommended: 850VA Pure Sine Wave IPS — ৳18,500";
    }
    else if (totalVA <= 1200) {
        recommendation = "Recommended: 1200VA IPS — Contact SmartTech BD";
    }
    else {
        recommendation = "Heavy Load System Required — Contact SmartTech BD";
    }

    document.getElementById("suggestion").innerText = recommendation;
}

/* =========================
   SHOW PRODUCTS (CATEGORY)
========================= */

const products = {
    pure: [
        { name: "650VA Pure Sine Wave IPS", price: "৳12,000" },
        { name: "850VA Pure Sine Wave IPS", price: "৳18,500" }
    ],
    used: [
        { name: "Used 650VA IPS", price: "৳6,500" },
        { name: "Used 850VA UPS", price: "৳7,500" }
    ],
    modified: [
        { name: "Modified UPS 650VA", price: "৳8,500" },
        { name: "Custom Modified IPS", price: "৳10,000" }
    ],
    smart: [
        { name: "Smart Switch", price: "৳1,500" },
        { name: "IR Fan Light Controller", price: "৳2,500" }
    ],
    lamp: [
        { name: "Wooden Table Lamp", price: "৳1,200" },
        { name: "RGB Smart Lamp", price: "৳2,000" }
    ]
};

function showProducts(category) {

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products[category].forEach(product => {

        list.innerHTML += `
        <div class="view-card">
            <h3>${product.name}</h3>
            <span>${product.price}</span>
            <button onclick="buyNow('${product.name}')">
                Order Now
            </button>
        </div>
        `;
    });

    document.getElementById("categoryTitle").innerText =
        category.toUpperCase() + " PRODUCTS";

    document.getElementById("productList").scrollIntoView({
        behavior: "smooth"
    });
}

/* =========================
   QUANTITY SYSTEM
========================= */

function increaseQty(id) {
    let qty = document.getElementById(id);
    qty.innerText = parseInt(qty.innerText) + 1;
}

function decreaseQty(id) {
    let qty = document.getElementById(id);
    let current = parseInt(qty.innerText);

    if (current > 1) {
        qty.innerText = current - 1;
    }
}

/* =========================
   ORDER SYSTEM
========================= */

function confirmOrder(product, qtyId) {

    let qtyElement = document.getElementById(qtyId);
    if (!qtyElement) {
        alert("Quantity not found!");
        return;
    }

    let quantity = qtyElement.innerText;

    // STEP 1: CUSTOMER DETAILS
    let name = prompt("👤 Enter Your Name:");
    if (name === null || name.trim() === "") return;

    let phone = prompt("📞 Enter Your Phone Number:");
    if (phone === null || phone.trim() === "") return;

    let location = prompt("📍 Enter Delivery Location:");
    if (location === null || location.trim() === "") return;

    let note = prompt("📝 Any extra note (optional):");
    if (note === null || note.trim() === "") note = "No extra note";

    // STEP 2: MESSAGE FORMAT
    let message =
`🛒 NEW ORDER

📦 Product: ${product}
🔢 Quantity: ${quantity}

👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${location}

📝 Note: ${note}
`;

    // STEP 3: SEND TO WHATSAPP
    let url = "https://wa.me/8801720262742?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
/* =========================
   SEARCH SYSTEM (FIXED + WORKING)
========================= */

function searchProducts() {

    let input = document.getElementById("searchInput").value.toLowerCase().trim();

    if (input === "") {
        alert("Please type something to search!");
        return;
    }

    /* PAGE ROUTING MAP */
    const routes = {
        "pure": "pure.html",
		"ips": "pure.html",
        "sine": "pure.html",
        "ups": "pure.html",
        "used": "used.html",
        "modified": "modified.html",
        "smart": "smart.html",
        "switch": "smart.html",
        "lamp": "lamp.html",
        "light": "lamp.html",
        "3d": "3dprint.html",
        "print": "3dprint.html",
        "3d print": "3dprint.html"
    };

    let found = false;

    for (let key in routes) {
        if (input.includes(key)) {
            window.location.href = routes[key];
            found = true;
            break;
        }
    }

    if (!found) {
        alert("Product not found!");
    }
}

/* ENTER KEY SEARCH */

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("searchInput");

    if (input) {
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }
});

/* =========================
   SCROLL ANIMATION (FIXED)
========================= */

const cards = document.querySelectorAll(
    '.feature-card, .product-card, .service-card, .view-card'
);

function revealCards() {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            card.classList.add("show-card");
        }

    });
}

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);
function sendOrder(event, product, qtyId) {

    event.preventDefault(); // stop page reload

    let quantity = document.getElementById(qtyId).innerText;

    let formId = qtyId.replace("qty", "");

    let name = document.getElementById("name" + formId).value;
    let phone = document.getElementById("phone" + formId).value;
    let location = document.getElementById("location" + formId).value;
    let note = document.getElementById("note" + formId).value;

    if (!note) note = "No extra note";

    let message =
`🛒 NEW ORDER

📦 Product: ${product}
🔢 Quantity: ${quantity}

👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${location}

📝 Note: ${note}
`;

    let url = "https://wa.me/8801720262742?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
/* ================= HOME PAGE SLIDER ================= */

let homeIndex = 0;

const homeSlides =
document.querySelectorAll(".home-slide");

/* SHOW SLIDE */

function showHomeSlide(index){

    homeSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    homeSlides[index].classList.add("active");
}

/* NEXT / PREV BUTTON */

function changeHomeSlide(direction){

    homeIndex += direction;

    if(homeIndex >= homeSlides.length){
        homeIndex = 0;
    }

    if(homeIndex < 0){
        homeIndex = homeSlides.length - 1;
    }

    showHomeSlide(homeIndex);
}

/* AUTO SLIDE EVERY 3 SECONDS */

setInterval(() => {

    homeIndex++;

    if(homeIndex >= homeSlides.length){
        homeIndex = 0;
    }

    showHomeSlide(homeIndex);

}, 3000);
