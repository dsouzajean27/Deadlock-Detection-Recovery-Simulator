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

function createMatrix(title, prefix, p, r) {

    let html = `<div><h3>${title} Matrix</h3>`;
    html += "<table>";

    for(let i=0; i<p; i++) {

        html += "<tr>";

        for(let j=0; j<r; j++) {

            html += `
            <td>
                <input type="number"
                id="${prefix}-${i}-${j}"
                value="0">
            </td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    html += "</div>";

    return html;
}