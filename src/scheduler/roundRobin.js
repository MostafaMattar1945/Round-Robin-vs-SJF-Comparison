

function runRoundRobin(processes, quantum) {
    // Make a deep copy so we don't modify the original list
    var remaining = [];
    var queueLog = []; // The execution log for the Ready Queue

    for (var i = 0; i < processes.length; i++) {
        remaining.push({
            id: processes[i].id,
            arrivalTime: processes[i].arrivalTime,
            burstTime: processes[i].burstTime,
            remainingTime: processes[i].burstTime, // tracks how much is left
            firstRunTime: -1,                      // records when it first got CPU
            finishTime: 0
        });
    }

    // Sort a copy by arrival time (ties broken by original order)
    remaining.sort(function(a, b) {
        return a.arrivalTime - b.arrivalTime;
    });

    var timeline = [];   // Each entry: { processId, start, end }
    var queue    = [];   // The ready queue (holds indices into 'remaining')
    var time     = 0;    // Current clock tick
    var done     = 0;    // How many processes have finished

    // We'll track which processes have already been enqueued
    var enqueued = [];
    for (var j = 0; j < remaining.length; j++) {
        enqueued.push(false);
    }

    // Add all processes that arrive at time 0
    for (var k = 0; k < remaining.length; k++) {
        if (remaining[k].arrivalTime <= time) {
            queue.push(k);
            enqueued[k] = true;
        }
    }

    // Keep going until every process has finished
    while (done < remaining.length) {

        // If the queue is empty, jump time forward to the next arrival
        if (queue.length === 0) {
            // Find the earliest process not yet enqueued
            var nextArrival = Infinity;
            for (var n = 0; n < remaining.length; n++) {
                if (!enqueued[n] && remaining[n].remainingTime > 0) {
                    if (remaining[n].arrivalTime < nextArrival) {
                        nextArrival = remaining[n].arrivalTime;
                    }
                }
            }
            time = nextArrival;
            // Enqueue all processes that have now arrived
            for (var m = 0; m < remaining.length; m++) {
                if (!enqueued[m] && remaining[m].arrivalTime <= time) {
                    queue.push(m);
                    enqueued[m] = true;
                }
            }
        }

        // --- NEW CODE: Record the queue state before picking a process ---
        var queueNames = [];
        for (var q = 0; q < queue.length; q++) {
            queueNames.push(remaining[queue[q]].id);
        }
        queueLog.push("At Time " + time + " ➜ Queue: [" + queueNames.join(", ") + "]");
        // ------------------------------------------------------------------

        // Pick the first process in the queue
        var idx = queue.shift();
        var proc = remaining[idx];

        // Record the first time this process actually runs
        if (proc.firstRunTime === -1) {
            proc.firstRunTime = time;
        }

        // Determine how long it will run this turn
        var runTime = Math.min(quantum, proc.remainingTime);
        var start   = time;
        var end     = time + runTime;

        // Record this segment in the timeline
        timeline.push({ processId: proc.id, start: start, end: end });

        // Update remaining time and clock
        proc.remainingTime -= runTime;
        time = end;

        // Enqueue any new arrivals that happened during this run
        for (var p = 0; p < remaining.length; p++) {
            if (!enqueued[p] && remaining[p].arrivalTime <= time) {
                queue.push(p);
                enqueued[p] = true;
            }
        }

        // If the process still has work left, put it back in the queue
        if (proc.remainingTime > 0) {
            queue.push(idx);
        } else {
            // Process is done
            proc.finishTime = time;
            done++;
        }
    }

    return {
        timeline:  timeline,
        completed: remaining,
        queueLog:  queueLog // <-- NEW CODE
    };
}
