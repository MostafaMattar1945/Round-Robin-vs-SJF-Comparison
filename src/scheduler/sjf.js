
  // Shortest Job First (SJF) scheduling algorithm:
 
 
function runSJFNonPreemptive(processes) {
    var procs = []; // Create copy so original data is not modified
    
    for (var i = 0; i < processes.length; i++) {
        procs.push({
            id:            processes[i].id,
            arrivalTime:   processes[i].arrivalTime,
            burstTime:     processes[i].burstTime,
            remainingTime: processes[i].burstTime,
            firstRunTime:  -1,
            finishTime:    0,
            originalIndex: i
        });
    }

    var timeline = [];   // Stores execution order for Gantt Chart
    var time     = 0;   // Current CPU time
    var done     = 0;   // Number of finished processes

    while (done < procs.length) {
        // Collect all arrived, unfinished processes
        var ready = [];
        for (var j = 0; j < procs.length; j++) {
            if (procs[j].arrivalTime <= time && procs[j].remainingTime > 0) {
                 ready.push(j);
            }
        }

        // Nobody ready yet — jump to next arrival
        if (ready.length === 0) {
            var nextArrival = Infinity;
            for (var n = 0; n < procs.length; n++) {
                 if (procs[n].remainingTime > 0 && procs[n].arrivalTime > time) {
                     if (procs[n].arrivalTime < nextArrival) nextArrival = procs[n].arrivalTime;
                 }
            }
            time = nextArrival;
            continue;
        }

        // Pick shortest burst; tie-break by original index
        var bestIdx = ready[0];   // Assume first ready process is shortest
        for (var k = 1; k < ready.length; k++) {
            var candidate = procs[ready[k]];
            var current   = procs[bestIdx];
            if (candidate.burstTime < current.burstTime || 
               (candidate.burstTime === current.burstTime && 
                candidate.originalIndex < current.originalIndex)) {
                 bestIdx = ready[k];
            }
        }

        var chosen = procs[bestIdx];

        // Run to full completion — no preemption
        chosen.firstRunTime  = time;
        timeline.push({ processId: chosen.id, start: time, end: time + chosen.burstTime });
        time                += chosen.burstTime;
        chosen.remainingTime = 0;
        chosen.finishTime    = time;
        done++;
    }

    return { timeline: timeline, completed: procs };
}


 // Runs the Preemptive SJF (SRTF) scheduling algorithm.


function runSJF(processes) {
    // Make a working copy so we don't change the caller's data
    var procs = [];
    for (var i = 0; i < processes.length; i++) {
        procs.push({
            id:            processes[i].id,
            arrivalTime:   processes[i].arrivalTime,
            burstTime:     processes[i].burstTime,
            remainingTime: processes[i].burstTime,
            firstRunTime:  -1,
            finishTime:    0,
            originalIndex: i   // used for tie-breaking
        });
    }

    var timeline   = [];  // Gantt chart segments: {processId, start, end}
    var time       = 0;   // Current clock
    var done       = 0;   // Finished process count
    var currentId  = null; // ID of process currently running
    var segStart   = 0;    // When the current segment started

    // Find the total time we need to simulate
    // (at most: latest arrival + sum of all bursts, but we stop when done)
    var totalBurst = 0;
    for (var j = 0; j < procs.length; j++) {
        totalBurst += procs[j].burstTime;
    }

    // Simulate tick by tick
    while (done < procs.length) {
        // Find the process with the shortest remaining time among those that have arrived
        var bestIdx       = -1;
        var bestRemaining = Infinity;

        for (var k = 0; k < procs.length; k++) {
            var p = procs[k];
            // Must have arrived and still have work left
            if (p.arrivalTime <= time && p.remainingTime > 0) {
                if (p.remainingTime < bestRemaining) {
                    bestRemaining = p.remainingTime;
                    bestIdx       = k;
                } else if (p.remainingTime === bestRemaining) {
                    // Tie-break: prefer the process that arrived first (originalIndex)
                    if (p.originalIndex < procs[bestIdx].originalIndex) {
                        bestIdx = k;
                    }
                }
            }
        }

        // If no process is ready yet, jump to the next arrival time
        if (bestIdx === -1) {
            // Close any open segment (idle period)
            if (currentId !== null) {
                timeline.push({ processId: currentId, start: segStart, end: time });
                currentId = null;
            }
            // Advance to next arrival
            var nextTime = Infinity;
            for (var n = 0; n < procs.length; n++) {
                if (procs[n].remainingTime > 0 && procs[n].arrivalTime > time) {
                    if (procs[n].arrivalTime < nextTime) {
                        nextTime = procs[n].arrivalTime;
                    }
                }
            }
            time = nextTime;
            continue;
        }

        var chosen = procs[bestIdx];

        // If the chosen process is different from the one that was just running,
        // close the previous segment and start a new one
        if (chosen.id !== currentId) {
            if (currentId !== null) {
                timeline.push({ processId: currentId, start: segStart, end: time });
            }
            currentId = chosen.id;
            segStart  = time;
        }

        // Record first-run time if this is the first time this process gets CPU
        if (chosen.firstRunTime === -1) {
            chosen.firstRunTime = time;
        }

        // Advance one tick
        chosen.remainingTime--;
        time++;

        // Check if this process just finished
        if (chosen.remainingTime === 0) {
            chosen.finishTime = time;
            done++;
            // Close the segment for this process
            timeline.push({ processId: currentId, start: segStart, end: time });
            currentId = null;
            segStart  = time;
        }
    }

    return {
        timeline:  timeline,
        completed: procs
    };
}
