
var GANTT_COLORS = [
    '#6366f1', // Indigo
    '#f97316', // Orange
    '#10b981', // Emerald
    '#06b6d4', // Cyan
    '#ec4899', // Pink
    '#eab308', // Yellow
    '#8b5cf6', // Purple
    '#3b82f6', // Blue
    '#f43f5e', // Rose
    '#14b8a6'  // Teal
];


function drawGanttChart(containerId, timeline) {
    var container = document.getElementById(containerId);
    if (!container) { return; }

    // Clear anything that was there before
    container.innerHTML = '';

    if (!timeline || timeline.length === 0) {
        container.innerHTML = '<p>No timeline data.</p>';
        return;
    }

    // Build a mapping from process id → color
    var colorMap = {};
    var colorIndex = 0;

    // Collect unique process ids in the order they first appear
    for (var i = 0; i < timeline.length; i++) {
        var pid = timeline[i].processId;
        if (!colorMap[pid]) {
            colorMap[pid] = GANTT_COLORS[colorIndex % GANTT_COLORS.length];
            colorIndex++;
        }
    }

    // Find the total time span for scaling
    var totalTime = timeline[timeline.length - 1].end;

    // ---- Build the chart wrapper ----
    var wrapper = document.createElement('div');
    wrapper.className = 'gantt-wrapper';

    // ---- Build the bars row ----
    var barsRow = document.createElement('div');
    barsRow.className = 'gantt-bars';

    for (var j = 0; j < timeline.length; j++) {
        var seg = timeline[j];
        var duration = seg.end - seg.start;
        var widthPercent = (duration / totalTime) * 100;

        var block = document.createElement('div');
        block.className = 'gantt-block';
        block.style.width           = widthPercent + '%';
        block.style.backgroundColor = colorMap[seg.processId];
        block.title = seg.processId + ' [' + seg.start + ' – ' + seg.end + ']';

        // Label inside the block (hidden if too narrow)
        var label = document.createElement('span');
        label.className = 'gantt-label';
        label.textContent = seg.processId;

        block.appendChild(label);
        barsRow.appendChild(block);
    }

    // ---- Build the time labels row ----
    var labelsRow = document.createElement('div');
    labelsRow.className = 'gantt-times';

    // Collect all unique time tick points
    var ticks = [];
    for (var k = 0; k < timeline.length; k++) {
        if (ticks.indexOf(timeline[k].start) === -1) {
            ticks.push(timeline[k].start);
        }
        if (ticks.indexOf(timeline[k].end) === -1) {
            ticks.push(timeline[k].end);
        }
    }
    ticks.sort(function(a, b) { return a - b; });

    for (var t = 0; t < ticks.length; t++) {
        var tick = ticks[t];
        var tickEl = document.createElement('span');
        tickEl.className = 'gantt-tick';
        // Position each tick proportionally
        tickEl.style.left = ((tick / totalTime) * 100) + '%';
        tickEl.textContent = tick;
        labelsRow.appendChild(tickEl);
    }

    wrapper.appendChild(barsRow);
    wrapper.appendChild(labelsRow);
    container.appendChild(wrapper);
}
