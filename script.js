// Global variable to hold data
var data = {};

// Fetch and parse CSV data
function loadData() {
    fetch('rate.csv')
        .then(response => response.text())
        .then(text => {
            var parsedData = d3.csvParse(text);
            parsedData.forEach(function(d) {
                if (!data[d.state_code]) {
                    data[d.state_code] = [];
                }
                data[d.state_code].push({
                    county_code: d.county_code,
                    same_num: d.same_num,
                    same_rate: d.same_rate,
                    similar_rate: d.similar_rate,
                    long_name: d.long_name
                });
            });
            initializeStates(); // Initialize state dropdown after data is loaded
        });
}

// Populate state dropdown
function initializeStates() {
    var stateSelect = document.getElementById('stateSelect');
    Object.keys(data).forEach(function(state) {
        var option = document.createElement('option');
        option.value = state;
        option.textContent = state; // Display state code; modify if actual name is needed
        stateSelect.appendChild(option);
    });
}

// Update counties dropdown based on selected state
function updateCounties() {
    var stateSelect = document.getElementById('stateSelect');
    var countySelect = document.getElementById('countySelect');
    var selectedState = stateSelect.value;
    countySelect.innerHTML = '<option value="">--Select a County--</option>';

    if (data[selectedState]) {
        data[selectedState].forEach(function(county) {
            var option = document.createElement('option');
            option.value = county.county_code;
            option.textContent = county.long_name; // Display county name
            countySelect.appendChild(option);
        });
    }
}

// Display data for selected county
function displayData() {
    var caseNumber = document.getElementById('caseNumber');
    var approvalRate = document.getElementById('approvalRate');
    var publicRate = document.getElementById('publicRate');

    var stateSelect = document.getElementById('stateSelect');
    var countySelect = document.getElementById('countySelect');
    var selectedState = stateSelect.value;
    var selectedCounty = countySelect.value;

    if (selectedState && selectedCounty) {
        var countyData = data[selectedState].find(county => county.county_code === selectedCounty);
        if (countyData) {
            // Set text with data from selected county
            caseNumber.innerHTML = "Number of Mortgage Cases with Same-sex Borrowers: " + countyData.same_num;
            approvalRate.innerHTML = "Approval rate of same-sex borrowers: " + (countyData.same_rate * 100).toFixed(2) + '%';
            publicRate.innerHTML = "Approval rate of borrowers with similar demographic characteristics: " + (countyData.similar_rate * 100).toFixed(2) + '%';
        }
    } else {
        // Default text when no county is selected
        caseNumber.innerHTML = "Number of Mortgage Cases with Same-sex Borrowers: Select a county";
        approvalRate.innerHTML = "Approval rate of same-sex borrowers: Select a county";
        publicRate.innerHTML = "Approval rate of borrowers with similar demographic characteristics: Select a county";
    }
}

window.onload = loadData;