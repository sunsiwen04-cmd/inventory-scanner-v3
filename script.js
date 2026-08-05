// Inventory Scanner V3
// script.js (V1)

// ----------------------------
// Elements
// ----------------------------
const inBtn = document.getElementById("inBtn");
const outBtn = document.getElementById("outBtn");

const barcode = document.getElementById("barcode");
const productName = document.getElementById("productName");
const expiry = document.getElementById("expiry");
const batchNumber = document.getElementById("batchNumber");

const pieces = document.getElementById("pieces");
const cartons = document.getElementById("cartons");
const qty = document.getElementById("qty");
const writer = document.getElementById("writer");

const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

// ----------------------------
// Current Mode
// ----------------------------
let currentMode = "IN";

// ----------------------------
// Default Page
// ----------------------------
window.onload = () => {
    setMode("IN");
};

// ----------------------------
// Mode Switch
// ----------------------------
inBtn.addEventListener("click", () => {
    setMode("IN");
});

outBtn.addEventListener("click", () => {
    setMode("OUT");
});

function setMode(mode) {

    currentMode = mode;

    if (mode === "IN") {

        inBtn.classList.add("active");
        outBtn.classList.remove("active");

        batchNumber.readOnly = false;
        expiry.disabled = false;

    } else {

        outBtn.classList.add("active");
        inBtn.classList.remove("active");

        batchNumber.readOnly = true;
        expiry.disabled = false;

    }

}

// ----------------------------
// Submit
// ----------------------------
submitBtn.addEventListener("click", () => {

    submitBtn.disabled = true;
    submitBtn.innerText = "Saving...";

    setTimeout(() => {

        showSuccess();

        clearForm();

        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";

        // V2/V3 后面这里会加入：
        // startScanner();

    }, 1000);

});

// ----------------------------
// Success Message
// ----------------------------
function showSuccess() {

    successMessage.style.display = "block";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 1500);

}

// ----------------------------
// Clear Form
// ----------------------------
function clearForm() {

    barcode.value = "";
    productName.value = "";

    expiry.selectedIndex = 0;

    batchNumber.value = "";

    pieces.value = "";
    cartons.value = "";
    qty.value = "";

    writer.selectedIndex = 0;

}

// ----------------------------
// Future Functions
// ----------------------------

// startScanner()

// stopScanner()

// getProduct()

// getExpiry()

// getBatch()

// submitToGoogle()

// generateTransactionID()
