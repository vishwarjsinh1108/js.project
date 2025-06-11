// Initialize background shapes
const backgroundShapes = document.createElement('div');
backgroundShapes.className = 'background-shapes';
backgroundShapes.innerHTML = `
  <div></div>
  <div></div>
  <div></div>
`;
document.body.insertBefore(backgroundShapes, document.body.firstChild);

const apiURL = "https://data.incovid19.org/v4/min/data.min.json";

// State name to code mapping
const stateMapping = {
  "andaman and nicobar islands": "AN",
  "andhra pradesh": "AP",
  "arunachal pradesh": "AR",
  "assam": "AS",
  "bihar": "BR",
  "chandigarh": "CH",
  "chhattisgarh": "CT",
  "dadra and nagar haveli": "DN",
  "daman and diu": "DD",
  "delhi": "DL",
  "goa": "GA",
  "gujarat": "GJ",
  "haryana": "HR",
  "himachal pradesh": "HP",
  "jammu and kashmir": "JK",
  "jharkhand": "JH",
  "karnataka": "KA",
  "kerala": "KL",
  "ladakh": "LA",
  "lakshadweep": "LD",
  "madhya pradesh": "MP",
  "maharashtra": "MH",
  "manipur": "MN",
  "meghalaya": "ML",
  "mizoram": "MZ",
  "nagaland": "NL",
  "odisha": "OR",
  "puducherry": "PY",
  "punjab": "PB",
  "rajasthan": "RJ",
  "sikkim": "SK",
  "tamil nadu": "TN",
  "telangana": "TG",
  "tripura": "TR",
  "uttar pradesh": "UP",
  "uttarakhand": "UT",
  "west bengal": "WB"
};

// Initialize datalist with state names only
function initializeStateList() {
  const stateList = document.getElementById('stateList');
  
  // Add only state names in title case
  Object.keys(stateMapping).forEach(name => {
    const option = document.createElement('option');
    option.value = name.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    stateList.appendChild(option);
  });
}

// Show state name while typing
document.getElementById("stateInput").addEventListener("input", (e) => {
  const input = e.target.value.trim().toLowerCase();
  if (stateMapping[input]) {
    const titleCaseName = input.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    e.target.value = titleCaseName;
  }
});

async function getStateData(stateName) {
  const normalizedStateName = stateName.toLowerCase().trim();
  const stateCode = stateMapping[normalizedStateName];
  
  if (!stateCode) {
    throw new Error(`"${stateName}" not found. Please enter a valid state name.`);
  }

  const res = await fetch(apiURL);
  if (!res.ok) throw new Error(`Failed to fetch data. Please try again later.`);
  
  const json = await res.json();
  const state = json[stateCode];
  if (!state || !state.total) throw new Error(`Data not available for ${stateName}`);
  
  const t = state.total;
  return {
    name: stateName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    confirmed: t.confirmed || 0,
    recovered: t.recovered || 0,
    deceased: t.deceased || 0,
    tested: t.tested || 0
  };
}

function render(data) {
  return `
    <div class="stat-card">
      <h2>${data.name}</h2>
      <p><strong>Confirmed:</strong> <span>${data.confirmed.toLocaleString()}</span></p>
      <p><strong>Recovered:</strong> <span>${data.recovered.toLocaleString()}</span></p>
      <p><strong>Deaths:</strong> <span>${data.deceased.toLocaleString()}</span></p>
      <p><strong>Tested:</strong> <span>${data.tested.toLocaleString()}</span></p>
    </div>
  `;
}

// Initialize the state list when the page loads
document.addEventListener('DOMContentLoaded', initializeStateList);

// Handle search button click
document.getElementById("searchBtn").addEventListener("click", async () => {
  const stateName = document.getElementById("stateInput").value.trim();
  const statsDiv = document.getElementById("stats");
  
  if (!stateName) {
    statsDiv.innerHTML = `<p class="error">Please enter a state name (e.g., Maharashtra, Delhi)</p>`;
    return;
  }
  
  statsDiv.innerHTML = '<p class="loading">Loading data...</p>';
  
  try {
    const data = await getStateData(stateName);
    statsDiv.innerHTML = render(data);
  } catch (e) {
    statsDiv.innerHTML = `<p class="error">${e.message}</p>`;
  }
});

// Handle Enter key press in input field
document.getElementById("stateInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});
