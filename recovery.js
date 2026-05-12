function recoverDeadlock() {

    let data = getMatrices();

    let p = data.p;
    let r = data.r;

    let work = [...data.available];

    let finish = new Array(p).fill(false);

    let changed = true;

    // -----------------------------
    // Detect Deadlocked Processes
    // -----------------------------

    while(changed) {

        changed = false;

        for(let i=0; i<p; i++) {

            if(!finish[i]) {

                let possible = true;

                for(let j=0; j<r; j++) {

                    if(data.need[i][j] > work[j]) {

                        possible = false;
                        break;
                    }
                }

                if(possible) {

                    for(let j=0; j<r; j++) {

                        work[j] += data.allocation[i][j];
                    }

                    finish[i] = true;

                    changed = true;
                }
            }
        }
    }

    // -----------------------------
    // Find Deadlocked Processes
    // -----------------------------

    let deadlocked = [];

    for(let i=0; i<p; i++) {

        if(!finish[i]) {

            deadlocked.push(i);
        }
    }

    // No Deadlock
    if(deadlocked.length === 0) {

        document.getElementById("output").innerHTML = `
        <h2 style="color:green;">
        No Deadlock Present
        </h2>
        `;

        return;
    }

    // -----------------------------
    // Select Victim Process
    // Process holding MOST resources
    // -----------------------------

    let victim = deadlocked[0];

    let maxResources = 0;

    for(let process of deadlocked) {

        let total = 0;

        for(let j=0; j<r; j++) {

            total += data.allocation[process][j];
        }

        if(total > maxResources) {

            maxResources = total;

            victim = process;
        }
    }

    // -----------------------------
    // Release Victim Resources
    // -----------------------------

    let recoveryLog = `
    <h2 style="color:red;">
    DEADLOCK DETECTED
    </h2>

    <h3>
    Terminating Process P${victim}
    </h3>
    `;

    for(let j=0; j<r; j++) {

        work[j] += data.allocation[victim][j];

        recoveryLog += `
        <p>
        Released R${j}: ${data.allocation[victim][j]}
        </p>
        `;
    }

    recoveryLog += `
    <h3>
    Updated Available Resources:
    [${work.join(", ")}]
    </h3>
    `;

    recoveryLog += `
    <h2 style="color:green;">
    Deadlock Recovery Completed
    </h2>
    `;

    document.getElementById("output").innerHTML = recoveryLog;
}