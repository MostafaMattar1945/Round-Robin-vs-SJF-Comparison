/**
 * table.js
 * --------
 * Renders the results table and comparison table to the page.
 *
 * This file exports TWO functions:
 *   - renderResultsTable(containerId, metricsResult)
 *   - renderComparisonTable(containerId, rrMetrics, sjfMetrics)
 */

/**
 * renderResultsTable
 * Builds an HTML table showing per-process metrics and an averages summary row.
 *
 * @param {string} containerId    - id of the HTML element to render into
 * @param {object} metricsResult  - Output from calculateMetrics():
 *                                    { rows: [...], avgWT, avgTAT, avgRT }
 */
function renderResultsTable(containerId, metricsResult) {
    var container = document.getElementById(containerId);
    if (!container) { return; }

    // Clear previous content
    container.innerHTML = '';

    // Build the table element
    var table = document.createElement('table');
    table.className = 'results-table';

    // ---- Header row ----
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var headers = ['Process', 'Arrival Time', 'Burst Time', 'Waiting Time', 'Turnaround Time', 'Response Time'];

    for (var h = 0; h < headers.length; h++) {
        var th = document.createElement('th');
        th.textContent = headers[h];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ---- Body rows (one per process) ----
    var tbody = document.createElement('tbody');

    for (var i = 0; i < metricsResult.rows.length; i++) {
        var row = metricsResult.rows[i];
        var tr = document.createElement('tr');

        // Alternate row shading is handled by CSS (nth-child)
        var cells = [row.id, row.arrivalTime, row.burstTime, row.wt, row.tat, row.rt];
        for (var c = 0; c < cells.length; c++) {
            var td = document.createElement('td');
            td.textContent = cells[c];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // ---- Summary / average row ----
    var avgRow = document.createElement('tr');
    avgRow.className = 'avg-row';

    var avgLabel = document.createElement('td');
    avgLabel.textContent = 'Average';
    avgLabel.colSpan = 3;
    avgRow.appendChild(avgLabel);

    var avgWtTd = document.createElement('td');
    avgWtTd.textContent = metricsResult.avgWT;
    avgRow.appendChild(avgWtTd);

    var avgTatTd = document.createElement('td');
    avgTatTd.textContent = metricsResult.avgTAT;
    avgRow.appendChild(avgTatTd);

    var avgRtTd = document.createElement('td');
    avgRtTd.textContent = metricsResult.avgRT;
    avgRow.appendChild(avgRtTd);

    tbody.appendChild(avgRow);
    table.appendChild(tbody);
    container.appendChild(table);
}

/**
 * renderComparisonTable
 * Builds a side-by-side comparison table for RR vs SJF metrics.
 * Also highlights the winner (lower value = better) for each metric.
 *
 * @param {string} containerId - id of the HTML element to render into
 * @param {object} rrMetrics   - { avgWT, avgTAT, avgRT } for Round Robin
 * @param {object} sjfMetrics  - { avgWT, avgTAT, avgRT } for SJF
 */
function renderComparisonTable(containerId, rrMetrics, sjfMetrics) {
    var container = document.getElementById(containerId);
    if (!container) { return; }

    container.innerHTML = '';

    var table = document.createElement('table');
    table.className = 'results-table comparison-table';

    // ---- Header ----
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var headers = ['Metric', 'Round Robin', 'SJF (Preemptive)', 'Winner'];

    for (var h = 0; h < headers.length; h++) {
        var th = document.createElement('th');
        th.textContent = headers[h];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ---- Metric rows ----
    var tbody = document.createElement('tbody');

    // Data for each row: [label, rrValue, sjfValue]
    var metrics = [
        ['Avg Waiting Time',      rrMetrics.avgWT,  sjfMetrics.avgWT],
        ['Avg Turnaround Time',   rrMetrics.avgTAT, sjfMetrics.avgTAT],
        ['Avg Response Time',     rrMetrics.avgRT,  sjfMetrics.avgRT]
    ];

    for (var i = 0; i < metrics.length; i++) {
        var label    = metrics[i][0];
        var rrVal    = metrics[i][1];
        var sjfVal   = metrics[i][2];
        var winner   = '';
        var rrClass  = '';
        var sjfClass = '';

        if (rrVal < sjfVal) {
            winner   = 'Round Robin ';
            rrClass  = 'winner-cell';
        } else if (sjfVal < rrVal) {
            winner   = 'SJF ';
            sjfClass = 'winner-cell';
        } else {
            winner = 'Tie';
        }

        var tr = document.createElement('tr');

        var tdLabel = document.createElement('td');
        tdLabel.textContent = label;
        tr.appendChild(tdLabel);

        var tdRR = document.createElement('td');
        tdRR.textContent = rrVal;
        tdRR.className = rrClass;
        tr.appendChild(tdRR);

        var tdSJF = document.createElement('td');
        tdSJF.textContent = sjfVal;
        tdSJF.className = sjfClass;
        tr.appendChild(tdSJF);

        var tdWinner = document.createElement('td');
        tdWinner.textContent = winner;
        tdWinner.className = 'winner-label';
        tr.appendChild(tdWinner);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    container.appendChild(table);
}
