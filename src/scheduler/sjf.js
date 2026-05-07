/**
  sjf.js
  Implements BOTH versions of the SJF algorithm
  1. Non-Preemptive SJF
  2. Preemptive SJF 
 */

/**
 runSJFNonPreemptive
 Runs the Standard (Non-Preemptive) SJF scheduling algorithm
 */
function runSJFNonPreemptive(processes) {
    var procs = [];
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

    var timeline = [];
    var time     = 0;
    var done     = 0;

    while (done < procs.length) {
        var ready = [];
        for (var j = 0; j < procs.length; j++) {
            if (procs[j].arrivalTime <= time && procs[j].remainingTime > 0) {
                 ready.push(j);
            }
        }

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

        var bestIdx = ready[0];
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

        
        chosen.firstRunTime  = time;
        timeline.push({ processId: chosen.id, start: time, end: time + chosen.burstTime });
        time                += chosen.burstTime;
        chosen.remainingTime = 0;
        chosen.finishTime    = time;
        done++;
    }

    return { timeline: timeline, completed: procs };
}


/**
  runSJF
  Runs the Preemptive SJF algorithm.
 */

function runSJF(processes) {
    var procs = [];
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

    var timeline   = [];  // Gantt chart segments: {processId, start, end}
    var time       = 0;   // Current clock
    var done       = 0;   // Finished process count
    var currentId  = null; // ID of process currently running
    var segStart   = 0;    // When the current segment started 

    
    var totalBurst = 0;
    for (var j = 0; j < procs.length; j++) {
        totalBurst += procs[j].burstTime;
    }

    while (done < procs.length) {
        var bestIdx       = -1;
        var bestRemaining = Infinity;

        for (var k = 0; k < procs.length; k++) {
            var p = procs[k];

            if (p.arrivalTime <= time && p.remainingTime > 0) {
                if (p.remainingTime < bestRemaining) {
                    bestRemaining = p.remainingTime;
                    bestIdx       = k;
                } else if (p.remainingTime === bestRemaining) {
    
                    if (p.originalIndex < procs[bestIdx].originalIndex) {
                        bestIdx = k;
                    }
                }
            }
        }


        if (bestIdx === -1) {
            if (currentId !== null) {
                timeline.push({ processId: currentId, start: segStart, end: time });
                currentId = null;
            }
            
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

        if (chosen.id !== currentId) {
            if (currentId !== null) {
                timeline.push({ processId: currentId, start: segStart, end: time });
            }
            currentId = chosen.id;
            segStart  = time;
        }

        if (chosen.firstRunTime === -1) {
            chosen.firstRunTime = time;
        }

        
        chosen.remainingTime--;
        time++;

        
        if (chosen.remainingTime === 0) {
            chosen.finishTime = time;
            done++;
            
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
