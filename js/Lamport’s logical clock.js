
// JavaScript program to illustrate the Lamport's
// Logical Clock

// Function to find the maximum timestamp
// between 2 events
const max1 = (a, b) => {
    // Return the greatest of th two
    if (a > b)
        return a;
    else
        return b;
}

// Function to display the logical timestamp
const display = (e1, e2, p1, p2) => {
    let i;

    document.write(`<br />The time stamps of events in P1:<br />`);

    for (i = 0; i < e1; i++) {
        document.write(`${p1[i]} `);
    }

    document.write(`<br />The time stamps of events in P2:<br />`);

    // Print the array p2[]
    for (i = 0; i < e2; i++)
        document.write(`${p2[i]} `);
}

// Function to find the timestamp of events
const lamportLogicalClock = (e1, e2, m) => {
    let i, j, k, p1 = [], p2 = [];

    // Initialize p1[] and p2[]
    for (i = 0; i < e1; i++)
        p1[i] = i + 1;

    for (i = 0; i < e2; i++)
        p2[i] = i + 1;

    for (i = 0; i < e2; i++)
        document.write(`\te2${i + 1}`)

    for (i = 0; i < e1; i++) {

        document.write(`<br/>e1${i + 1} `)
        for (j = 0; j < e2; j++)
            document.write(`${m[i][j]}\t`);
    }

    for (i = 0; i < e1; i++) {
        for (j = 0; j < e2; j++) {

            // Change the timestamp if the
            // message is sent
            if (m[i][j] == 1) {
                p2[j] = max1(p2[j], p1[i] + 1);
                for (k = j + 1; k < e2; k++)
                    p2[k] = p2[k - 1] + 1;
            }

            // Change the timestamp if the
            // message is received
            if (m[i][j] == -1) {
                p1[i] = max1(p1[i], p2[j] + 1);
                for (k = i + 1; k < e1; k++)
                    p1[k] = p1[k - 1] + 1;
            }
        }
    }

    // Function Call
    display(e1, e2, p1, p2);
}

// Driver Code

let e1 = 5, e2 = 3;

// message is sent and received
// between two process

/*dep[i][j] = 1, if message is sent
            from ei to ej
dep[i][j] = -1, if message is received
                by ei from ej
dep[i][j] = 0, otherwise*/
const m = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [0, -1, 0]
]

// Function Call
lamportLogicalClock(e1, e2, m);


