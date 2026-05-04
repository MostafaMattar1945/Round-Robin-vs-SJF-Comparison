# Round Robin vs SJF — CPU Scheduling Simulator

## Description

This project is a browser-based CPU scheduling simulator that lets you compare two classic scheduling algorithms side by side: **Round Robin (RR)** and **Preemptive Shortest Job First (SJF / SRTF)**. You enter a list of processes (with arrival times and burst times), set a Round Robin quantum, and click **Run Simulation**. The simulator produces coloured Gantt charts, per-process metrics tables (Waiting Time, Turnaround Time, Response Time), a head-to-head comparison table, and an automatically generated conclusion explaining which algorithm performed better for the given workload.

The entire project uses only plain HTML, CSS, and JavaScript — no frameworks, no build tools, no internet connection required.

---

## How to Run

1. Download or clone this repository to your computer.
2. Open **`index.html`** in any modern web browser (Chrome, Firefox, Edge, Safari).
3. No installation, no terminal, no server needed.

---

## File Structure

```
project-root/
  src/
    model/
      process.js          ← defines the Process object
    scheduler/
      roundRobin.js       ← Round Robin algorithm
      sjf.js              ← Preemptive SJF (SRTF) algorithm
    metrics/
      metrics.js          ← calculates WT, TAT, RT and averages
    gui/
      gantt.js            ← draws the Gantt chart
      table.js            ← renders results and comparison tables
    util/
      validate.js         ← input validation
  assets/
    style.css             ← all styling
  test-cases/
    test1.json            ← normal 3-process test case  (quantum 2)
    test2.json            ← long-job sensitivity test   (quantum 3)
    test3.json            ← invalid input test description
  screenshots/            ← place your screenshots here
  index.html              ← open this file to run the app
  README.md               ← this file
  .gitignore
```

---

## Team Members

- Member 1: *(Your Name Here)*
- Member 2: *(Your Name Here)*
- Member 3: *(Your Name Here)*
- Member 4: *(Your Name Here)*

---

## Assumptions

| Assumption | Detail |
|---|---|
| SJF variant | Preemptive (Shortest Remaining Time First / SRTF) |
| Tie-breaking | When two processes have the same remaining time, the one that appeared earlier in the input list wins |
| Quantum | Must be a positive integer ≥ 1 |
| Arrival / Burst | Must be non-negative integers; Burst must be > 0 |
| New arrivals in RR | A process that arrives during a quantum is added to the back of the ready queue *after* the current quantum ends |

---

## Limitations

- **Browser-only**: The app runs entirely in the browser. There is no back-end server.
- **No data persistence**: Refreshing the page clears all input. There is no save/load feature.
- **Integer times only**: Arrival and burst times must be whole numbers.
- **No animation**: The Gantt chart is rendered statically after clicking Run.

---

## Test Cases

### Test 1 — Normal case (quantum = 2)
Load `test-cases/test1.json` manually:
```
P1: arrival=0, burst=5
P2: arrival=1, burst=3
P3: arrival=2, burst=8
```
Expected: All three processes complete; SJF generally outperforms RR on WT.

### Test 2 — Long-job sensitivity (quantum = 3)
Load `test-cases/test2.json`:
```
P1: arrival=0, burst=20
P2: arrival=1, burst=2
P3: arrival=2, burst=3
```
Expected: SJF finishes P2 and P3 very quickly (potentially starving P1), while RR gives P1 regular turns.

### Test 3 — Invalid input
Follow the instructions in `test-cases/test3.json` to verify that error messages appear correctly and no simulation runs on bad input.
