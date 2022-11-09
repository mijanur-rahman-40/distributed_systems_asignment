const prompt = require("prompt-sync")();

const llc = {
    processes: [],
}

let processes = prompt("Enter number of process: ");

for (let i = 1; i <= parseInt(processes); i++) {
    let totalEvents = prompt(`The time stamps of events in P ${i}: `);
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
    let sendProcess = Number(prompt("Send process no for message " + i + " : "));
    let sendEvent = Number(prompt("Send event no for message " + i + " : "));
    let receiveProcess = Number(prompt("Receive process no for message " + i + " : "));
    let receiveEvent = Number(prompt("Receive event no for message " + i + " : "));
}

console.log(llc)