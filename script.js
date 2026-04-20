// Luhn Algorithm
function validateCard(number) {
let sum = 0;
let alternate = false;


for (let i = number.length - 1; i >= 0; i--) {
    let n = parseInt(number[i]);

    if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
    }

    sum += n;
    alternate = !alternate;
}

return sum % 10 === 0;


}

// Detect Card Type
function detectCardType(number) {
if (number.startsWith("4")) return "VISA";
if (/^5[1-5]/.test(number)) return "MasterCard";
return "Unknown";
}

// Mask Card Number
function maskCard(number) {
return "**** **** **** " + number.slice(-4);
}

// Submit Form
function submitForm() {
let name = document.getElementById("name").value;
let number = document.getElementById("cardNumber").value;
let type = document.getElementById("cardType").value;
let expiry = document.getElementById("expiry").value;


if (!name || !number || !expiry) {
    alert("Fill all fields");
    return;
}

let isValid = validateCard(number);
let detectedType = detectCardType(number);

// Store data
localStorage.setItem("cardData", JSON.stringify({
    name, number, type, expiry, isValid, detectedType
}));

// Redirect
window.location.href = "result.html";


}

// Load Result Page
if (window.location.pathname.includes("result.html")) {
let data = JSON.parse(localStorage.getItem("cardData"));


if (data) {
    document.getElementById("result").innerHTML = `
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Card Number:</b> ${maskCard(data.number)}</p>
        <p><b>Entered Type:</b> ${data.type}</p>
        <p><b>Detected Type:</b> ${data.detectedType}</p>
        <p><b>Expiry:</b> ${data.expiry}</p>

        <h3 style="color:${data.isValid ? 'green' : 'red'}">
            ${data.isValid ? '✅ Valid Card' : '❌ Invalid Card'}
        </h3>
    `;
}


}

// Go Back
function goBack() {
window.location.href = "index.html";
}
