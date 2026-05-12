function generateTables() {

    let p = parseInt(document.getElementById("processes").value);
    let r = parseInt(document.getElementById("resources").value);

    let html = "";

    // Allocation Matrix
    html += createMatrix("Allocation", "alloc", p, r);

    // Max Matrix
    html += createMatrix("Max", "max", p, r);

    // Available Vector
    html += "<h3>Available Vector</h3>";
    html += "<table><tr>";

    for(let j=0; j<r; j++) {
        html += `<td><input type="number" id="avail-${j}" value="0"></td>`;
    }

    html += "</tr></table>";

    // Need Matrix
    html += `<div id="needMatrix"></div>`;

    document.getElementById("tables").innerHTML = html;
}

function generateTables() {

    let p = parseInt(document.getElementById("processes").value);
    let r = parseInt(document.getElementById("resources").value);

    let html = "";

    // Allocation Matrix
    html += createMatrix("Allocation", "alloc", p, r);

    // Max Matrix
    html += createMatrix("Max", "max", p, r);

    // Available Vector
    html += "<h3>Available Vector</h3>";
    html += "<table><tr>";

    for(let j=0; j<r; j++) {
        html += `<td><input type="number" id="avail-${j}" value="0"></td>`;
    }

    html += "</tr></table>";

    // Need Matrix
    html += `<div id="needMatrix"></div>`;

    document.getElementById("tables").innerHTML = html;

    // Disable Generate Button
    document.getElementById("generateBtn").disabled = true;
}