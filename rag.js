function drawRAG() {

    let data = getMatrices();

    let p = data.p;
    let r = data.r;

    let elements = [];

    // -------------------------
    // PROCESS NODES
    // -------------------------

    for(let i=0; i<p; i++) {

        elements.push({
            data: {
                id: `P${i}`,
                label: `P${i}`
            }
        });
    }

    // -------------------------
    // RESOURCE NODES
    // -------------------------

    for(let j=0; j<r; j++) {

        elements.push({
            data: {
                id: `R${j}`,
                label: `R${j}`
            }
        });
    }

    // -------------------------
    // ALLOCATION EDGES
    // Resource -> Process
    // -------------------------

    for(let i=0; i<p; i++) {

        for(let j=0; j<r; j++) {

            let alloc = data.allocation[i][j];

            if(alloc > 0) {

                elements.push({
                    data: {
                        id: `alloc-${j}-${i}`,
                        source: `R${j}`,
                        target: `P${i}`,
                        label: `${alloc}`
                    }
                });
            }
        }
    }

    // -------------------------
    // REQUEST EDGES
    // Process -> Resource
    // -------------------------

    for(let i=0; i<p; i++) {

        for(let j=0; j<r; j++) {

            let need = data.need[i][j];

            if(need > 0) {

                elements.push({
                    data: {
                        id: `req-${i}-${j}`,
                        source: `P${i}`,
                        target: `R${j}`,
                        label: `${need}`
                    }
                });
            }
        }
    }

    // -------------------------
    // CREATE GRAPH
    // -------------------------

    let cy = cytoscape({

        container: document.getElementById('cy'),

        elements: elements,

        style: [

    {
        selector: 'node',
        style: {
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '18px',
            'font-weight': 'bold',
            'color': 'white',
            'width': 60,
            'height': 60,
            'text-outline-width': 2,
            'text-outline-color': '#111827'
        }
    },

    {
        selector: 'node[id ^= "P"]',
        style: {
            'shape': 'ellipse',
            'background-color': '#ef4444'
        }
    },

    {
        selector: 'node[id ^= "R"]',
        style: {
            'shape': 'round-rectangle',
            'background-color': '#22c55e'
        }
    },

    {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'width': 4,
            'label': 'data(label)',
            'font-size': '14px',
            'color': '#111827',
            'text-background-color': 'white',
            'text-background-opacity': 1,
            'text-background-padding': 3
        }
    }
],

        layout: {
            name: 'cose',
            animate: true,
            animationDuration: 1200
        }

    });
}