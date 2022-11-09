const prompt = require("prompt-sync")();

const llc = {
    processes: [],
}

const max = (a, b) => {
    if (a > b)
        return a;
    else
        return b;
}

let processes = prompt("Enter number of process: ");

for (let i = 1; i <= parseInt(processes); i++) {
    let totalEvents = prompt(`The time stamps of events in P${i}: `);
    let events = [];

    for (let i = 1; i <= parseInt(totalEvents); i++) {
        events.push(i);
    }

    llc.processes.push({
        name: 'P' + i,
        events: events,
    });
}

let messages = prompt('Enter the number of messages are shared : ');

for (let i = 1; i <= parseInt(messages); i++) {
    let sendProcess = Number(prompt(`Process no for the sending message ${i} : `));
    let sendEvent = Number(prompt(`Event no for the sending message ${i} : `));
    let receiveProcess = Number(prompt(`Process no for the receiving message ${i} : `));
    let receiveEvent = Number(prompt(`Event no for receiving message ${i} : `));

    if (receiveEvent >= 2) {
        llc.processes[receiveProcess - 1].events[receiveEvent - 1] = max(
            llc.processes[receiveProcess - 1].events[receiveEvent - 2],
            llc.processes[sendProcess - 1].events[sendEvent - 1]
        ) + 1;
    } else {
        llc.processes[receiveProcess - 1].events[receiveEvent - 1] = llc.processes[sendProcess - 1].events[sendEvent - 1] + 1;
    }
    for (let j = receiveEvent; j < llc.processes[receiveProcess - 1].events.length; j++) {
        llc.processes[receiveProcess - 1].events[j] = llc.processes[receiveProcess - 1].events[j - 1] + 1;
    }
}

console.log('\n');

llc.processes.forEach((process) => {
    console.log(process.name + " : " + process.events.toString());
});