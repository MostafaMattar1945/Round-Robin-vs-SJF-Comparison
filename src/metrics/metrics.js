/** metrics.js */

/**
 * calculateMetrics
 * Computes WT, TAT, and RT for every process, and returns averages.
 *
 * @param {Array} processes     - Original process list {id, arrivalTime, burstTime}
 * @param {Array} completedList - Output from the scheduler, each item has:
 *                                  id, arrivalTime, burstTime,
 *                                  firstRunTime, finishTime
 * @returns {object} An object with:
 *   - rows    : Array of per-process metrics {id, arrivalTime, burstTime, wt, tat, rt}
 *   - avgWT   : Average waiting time (rounded to 2 decimal places)
 *   - avgTAT  : Average turnaround time
 *   - avgRT   : Average response time
 */
function calculateMetrics(processes, completedList) {
    var rows = [];

    // Build a lookup so we can find the original burst time by process id
    var originalBurst = {};
    for (var i = 0; i < processes.length; i++) {
        originalBurst[processes[i].id] = processes[i].burstTime;
    }

    // For each completed process, compute the three metrics
    for (var j = 0; j < completedList.length; j++) {
        var proc = completedList[j];

        var tat = proc.finishTime   - proc.arrivalTime;  // Turnaround Time
        var wt  = tat               - proc.burstTime;    // Waiting Time
        var rt  = proc.firstRunTime - proc.arrivalTime;  // Response Time

        rows.push({
            id:          proc.id,
            arrivalTime: proc.arrivalTime,
            burstTime:   proc.burstTime,
            wt:          wt,
            tat:         tat,
            rt:          rt
        });
    }

    // Sort the rows by process id so the table always appears in a consistent order
    rows.sort(function(a, b) {
        return a.id.localeCompare(b.id);
    });

    // Calculate averages
    var totalWT  = 0;
    var totalTAT = 0;
    var totalRT  = 0;

    for (var k = 0; k < rows.length; k++) {
        totalWT  += rows[k].wt;
        totalTAT += rows[k].tat;
        totalRT  += rows[k].rt;
    }

    var count = rows.length;

    return {
        rows:   rows,
        avgWT:  Math.round((totalWT  / count) * 100) / 100,
        avgTAT: Math.round((totalTAT / count) * 100) / 100,
        avgRT:  Math.round((totalRT  / count) * 100) / 100
    };
}
