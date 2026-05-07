<div align="center">
  <h1> SJF Logic Team</h1>
  <h3>Round Robin vs SJF Simulator</h3>
</div>

##  Responsibilities
- **Algorithms:** Write the JavaScript code for both versions of the SJF algorithm (Preemptive & Non-Preemptive).
- **Context Switching:** Ensure the logic correctly switches between interrupting a process (Preemptive) and letting it finish (Non-Preemptive) based on the user's choice.

##  Requirements
- **Non-Preemptive SJF:** Once a process starts, it runs to completion even if a shorter job arrives.
- **Preemptive SJF (SRTF):** If a new process arrives with a shorter remaining time than the currently running process, the current process is preempted.
- **Tie-Breaking:** If remaining times are equal, prefer the process that arrived first.
- **Output:** Generate an array of execution intervals (Gantt chart data).
