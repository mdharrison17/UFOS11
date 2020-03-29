// import data from data.js
const tableData = data;

// point data to html page. data displayed in table hence the reference to the tbody html tag
//d3.select tells javascript to look for the tbody tags in html
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // find the tbody tag and append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() { //does this need a parameter??

  // Save the element, value, and id of the filter object
  filters = {
  datetime: d3.select("#datetime").property("value"),
  city: d3.select("#city").property("value"),
  state: d3.select("#state").property("value"),
  country: d3.select("#country").property("value"),
  shape: d3.select("#shape").property("value")
  };

  console.log(filters);
  // If a filter value was not entered then delet the filter property 
for (var key in filters) {
    if(!(filters[key])) {
    delete filters[key];
  }
}
console.log(filters);
  // Call function to apply all filters and rebuild the table
  filterTable(filters);
}

function filterTable(someFilter) {

  // Set the filteredData to the tableData
  let filteredData = tableData;
  // Loop through all of the filters and keep any data that
  // matches the filter values
    for(var key in someFilter) {
      filteredData = filteredData.filter(row => row[key] == someFilter[key]);
    }
 
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on('click', updateFilters);

// Build the table when the page loads
buildTable(tableData);
