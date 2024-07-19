
// Base URL template
const baseURL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

// Function to fetch JSON data from the new API
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

// Function to get the exchange rate from one currency to another
async function getExchangeRate(fromCurrency, toCurrency) {
    // Construct the correct URL with the fromCurrency
    const url = `${baseURL}/${fromCurrency}.json`;
    
    // Fetch data for the fromCurrency
    const json = await fetchJSON(url);
    
    // Debugging: Log the JSON response to verify its structure
    console.log('JSON response:', json);
    
    // Get the exchange rate from the nested fetched data
    const rate = json[fromCurrency][toCurrency];
    
    // Debugging: Log the extracted rate to verify it's correct
    console.log(`Extracted rate for ${toCurrency}:`, rate);
    
    return rate;
}


const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ",
    ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG",
    BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV",
    BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL",
    CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ",
    DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR",
    FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM",
    GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU",
    IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO",
    JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW",
    KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT",
    LVL: "LV", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN",
    MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY",
    MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM",
    PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA",
    RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD",
    SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV",
    SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR",
    TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ",
    VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
};

const btn = document.querySelector("form button");

const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newsrc;
    }
};

// Function to initialize dropdowns
const initializeDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown select");
    
    dropdowns.forEach(select => {
        // Clear existing options
        // Add new options
        Object.keys(countryList).forEach(currCode => {
            const newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            select.append(newOption);
        });

        // Set event listener for change event
        select.addEventListener("change", () => updateFlag(select));

        // Initialize flag images based on the default selection
        updateFlag(select);
    });
};

// Initialize dropdowns when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeDropdowns);

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    const amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amt.value = "1";
    }

    getExchangeRate(fromcurr.value.toLowerCase(), tocurr.value.toLowerCase()).then(rate => {
        const msgDiv = document.querySelector(".msg");
        msgDiv.textContent = `${amtVal} ${fromcurr.value} = ${rate*amtVal} ${tocurr.value}`;
    }).catch(error => {
        console.error('Error fetching exchange rate:', error);
    });
});