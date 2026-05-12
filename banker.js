function getMatrices() {

    let p = parseInt(document.getElementById("processes").value);
    let r = parseInt(document.getElementById("resources").value);

    let allocation = [];
    let max = [];
    let need = [];
    let available = [];

    // Allocation Matrix
    for(let i=0; i<p; i++) {

        allocation[i] = [];

        for(let j=0; j<r; j++) {

            allocation[i][j] = parseInt(
                document.getElementById(`alloc-${i}-${j}`).value
            );
        }
    }

    // Max Matrix
    for(let i=0; i<p; i++) {

        max[i] = [];

        for(let j=0; j<r; j++) {

            max[i][j] = parseInt(
                document.getElementById(`max-${i}-${j}`).value
            );
        }
    }

    // Need Matrix
    for(let i=0; i<p; i++) {

        need[i] = [];

        for(let j=0; j<r; j++) {

            need[i][j] = max[i][j] - allocation[i][j];
        }
    }

    // Available Vector
    for(let j=0; j<r; j++) {

        available[j] = parseInt(
            document.getElementById(`avail-${j}`).value
        );
    }

    return { p, r, allocation, max, need, available };
}

function calculateNeed() {

    let data = getMatrices();

    let html = "<h3>Need Matrix</h3>";
    html += "<table>";

    for(let i=0; i<data.p; i++) {

        html += "<tr>";

        for(let j=0; j<data.r; j++) {

            html += `<td>${data.need[i][j]}</td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById("needMatrix").innerHTML = html;
}

function runBanker() {

    let data = getMatrices();

    let p = data.p;
    let r = data.r;

    let work = [...data.available];

    let finish = new Array(p).fill(false);

    let safeSequence = [];

    let log = "<h3>Banker's Algorithm Execution</h3>";

    let count = 0;

    while(count < p) {

        let found = false;

        for(let i=0; i<p; i++) {

            if(!finish[i]) {

                let possible = true;

                // Check Need <= Available
                for(let j=0; j<r; j++) {

                    if(data.need[i][j] > work[j]) {

                        possible = false;
                        break;
                    }
                }

                // Process can execute
                if(possible) {

                    log += `
                    <p>
                    P${i} executes successfully.
                    </p>
                    `;

                    // Release resources
                    for(let j=0; j<r; j++) {

                        work[j] += data.allocation[i][j];
                    }

                    log += `
                    <p>
                    Available Resources:
                    [${work.join(", ")}]
                    </p>
                    `;

                    safeSequence.push(`P${i}`);

                    finish[i] = true;

                    found = true;

                    count++;
                }
            }
        }

        // Unsafe State
        if(!found) {

            log += `
            <h2 style="color:red;">
            System is UNSAFE (Deadlock Possible)
            </h2>
            `;

            document.getElementById("output").innerHTML = log;

            return;
        }
    }

    // Safe State
    log += `
    <h2 style="color:green;">
    System is SAFE
    </h2>

    <h3>
    Safe Sequence:
    ${safeSequence.join(" → ")}
    </h3>
    `;

    document.getElementById("output").innerHTML = log;
}