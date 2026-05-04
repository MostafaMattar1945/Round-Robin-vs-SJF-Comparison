<div align="center">
  <h1>⚙️ CPU Scheduling Simulator</h1>
  <h3>Round Robin vs Shortest Job First (SJF) Comparison</h3>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<br />

<div align="center">
  <strong>A modern, browser-based simulator to visualize and compare CPU scheduling algorithms.</strong>
</div>

<br />

##  Description

This project is a purely browser-based CPU scheduling simulator that lets you compare two classic scheduling algorithms side by side: **Round Robin (RR)** and **Preemptive Shortest Job First (SJF / SRTF)**. 

Simply enter a list of processes (with arrival times and burst times), set a Round Robin quantum, and click **Run Simulation**. The simulator produces colored Gantt charts, per-process metrics tables (Waiting Time, Turnaround Time, Response Time), a head-to-head comparison table, and an automatically generated conclusion explaining which algorithm performed better for the given workload.

The entire project uses only plain **HTML**, **CSS**, and **JavaScript** — no frameworks, no build tools, no internet connection required.

---

##  How to Run

1. Download or clone this repository to your computer.
2. Open **`index.html`** in any modern web browser (Chrome, Firefox, Edge, Safari).
3. No installation, no terminal, no server needed. You're good to go! 

---

##  File Structure

```text
project-root/
  ├── src/
  │   ├── model/
  │   │   └── process.js          ← Defines the Process object
  │   ├── scheduler/
  │   │   ├── roundRobin.js       ← Round Robin algorithm logic
  │   │   └── sjf.js              ← Preemptive SJF (SRTF) algorithm logic
  │   ├── metrics/
  │   │   └── metrics.js          ← Calculates WT, TAT, RT and averages
  │   ├── gui/
  │   │   ├── gantt.js            ← Draws the visual Gantt charts
  │   │   └── table.js            ← Renders results and comparison tables
  │   └── util/
  │       └── validate.js         ← Input validation logic
  ├── assets/
  │   └── style.css               ← All application styling
  ├── test-cases/
  │   ├── test1.json              ← Normal 3-process test case (quantum 2)
  │   ├── test2.json              ← Long-job sensitivity test (quantum 3)
  │   └── test3.json              ← Invalid input test description
  ├── screenshots/                ← Example simulation results
  ├── index.html                  ← Main entry point
  └── README.md                   ← You are here
```

---

##  Team Members

-  **Member 1**: *’Mostafa Mattar*
-  **Member 2**: *Sama Sherif*
-  **Member 3**: *Nagham Reda*
-  **Member 4**: *Rana Rashad*
-  **Member 5**: *Jowairya Ahmed*
-  **Member 6**: *Seif El Den Tamer*

---

##  Assumptions & Logic

| Assumption | Detail |
| :--- | :--- |
| **SJF Variant** | Preemptive (Shortest Remaining Time First / SRTF) |
| **Tie-breaking** | When two processes have the same remaining time, the one that appeared earlier in the input list wins. |
| **Quantum** | Must be a positive integer ≥ 1. |
| **Arrival & Burst Times** | Must be non-negative integers; Burst time must be > 0. |
| **New Arrivals in RR** | A process that arrives during a quantum is added to the back of the ready queue *after* the current quantum ends. |

---

##  Limitations

- **Browser-only**: The app runs entirely in the client's browser. There is no back-end server.
- **No Data Persistence**: Refreshing the page clears all input. There is no save/load feature.
- **Integer Times Only**: Arrival and burst times must be whole numbers.
- **Static Rendering**: The Gantt chart is rendered statically after clicking Run (no animations).

---

##  Test Cases

###  Test 1 — Normal Case (Quantum = 2)
Load `test-cases/test1.json` manually:
```text
P1: arrival=0, burst=5
P2: arrival=1, burst=3
P3: arrival=2, burst=8
```
**Expected:** All three processes complete; SJF generally outperforms RR on Waiting Time.

###  Test 2 — Long-job Sensitivity (Quantum = 3)
Load `test-cases/test2.json`:
```text
P1: arrival=0, burst=20
P2: arrival=1, burst=2
P3: arrival=2, burst=3
```
**Expected:** SJF finishes P2 and P3 very quickly (potentially starving P1), while RR gives P1 regular turns.

###  Test 3 — Invalid Input
Follow the instructions in `test-cases/test3.json` to verify that error messages appear correctly and no simulation runs on bad input.

---
<div align="center">
  <p>Made with dedication by Mostafa Mattar & Team</p>
</div>
