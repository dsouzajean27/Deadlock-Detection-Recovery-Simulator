function detectDeadlock() {

    let data = getMatrices();

    let p = data.p;
    let r = data.r;

    let work = [...data.available];

    let finish = new Array(p).fill(false);

    let changed = true;

    // Deadlock Detection Algorithm
    while(changed) {

        changed = false;

        for(let i=0; i<p; i++) {

            if(!finish[i]) {

                let possible = true;

                // Request/Need <= Available
                for(let j=0; j<r; j++) {

                    if(data.need[i][j] > work[j]) {

                        possible = false;
                        break;
                    }
                }

                if(possible) {

                    // Process completes
                    for(let j=0; j<r; j++) {

                        work[j] += data.allocation[i][j];
                    }

                    finish[i] = true;

                    changed = true;
                }
            }
        }
    }

    // Find Deadlocked Processes
    let deadlocked = [];

    for(let i=0; i<p; i++) {

        if(!finish[i]) {

            deadlocked.push(`P${i}`);
        }
    }

    let output = "<h3>Deadlock Detection Result</h3>";

    if(deadlocked.length === 0) {

        output += `
        <h2 style="color:green;">
        NO DEADLOCK DETECTED
        </h2>
        `;
    }
    else {

        output += `
        <h2 style="color:red;">
        DEADLOCK DETECTED
        </h2>

        <h3>
        Deadlocked Processes:
        ${deadlocked.join(", ")}
        </h3>
        `;
    }

    document.getElementById("output").innerHTML = output;
}