<div align="center">
  <h1>⚙️ CPU Scheduling Simulator</h1>
  <h3>Round Robin vs Shortest Job First (SJF) Comparison</h3>
</div>

## 🎯 Responsibilities
- **Metrics Calculation:** Calculate the averages for Waiting, Turnaround, and Response Times.
- **Comparison:** Build the comparison table.
- **Visualization:** Generate the dynamic, colored Gantt charts for the results.
- **Algorithm:** Write the JavaScript code for the Round Robin algorithm.
- **Queue Management:** Manage how the Ready Queue handles the Time Quantum.
- **Algorithms:** Write the JavaScript code for both versions of the SJF algorithm (Preemptive & Non-Preemptive).
- **Context Switching:** Ensure the logic correctly switches between interrupting a process (Preemptive) and letting it finish (Non-Preemptive) based on the user's choice.
- **Design:** Build and style the web page (HTML/CSS).
- **Features:** Build the new SJF Mode Toggle switch (Preemptive vs Non-Preemptive).
- **Validation:** Write the validation code to block wrong inputs like zero burst times or missing IDs.

## 📋 Requirements
- **Calculations:**
  - `Turnaround Time = Completion Time - Arrival Time`
  - `Waiting Time = Turnaround Time - Burst Time`
  - `Response Time = First Start Time - Arrival Time`
- **Visualization:**
  - Gantt chart must accurately reflect the timeline and process interruptions.
  - Colors must be distinct and visually appealing.
- **Comparison Table:** Clearly present which algorithm performs better based on the average metrics.
- **Quantum Management:** Accurately subtract the quantum from burst time and preempt the process if it's not finished.
- **Queue Logic:** New arrivals must be placed in the queue appropriately, and preempted processes must go to the back of the queue.
- **Non-Preemptive SJF:** Once a process starts, it runs to completion even if a shorter job arrives.
- **Preemptive SJF (SRTF):** If a new process arrives with a shorter remaining time than the currently running process, the current process is preempted.
- **Tie-Breaking:** If remaining times are equal, prefer the process that arrived first.
- **Output:** Produce an array of execution intervals (Gantt chart data) with accurate start and end times.
- **Aesthetics:** Ensure a modern, responsive, and intuitive interface.
- **Toggle Switch:** Must clearly indicate whether SJF is in Preemptive or Non-Preemptive mode.
- **Validation Rules:**
  - Process ID must be unique.
  - Arrival Time must be $\ge$ 0.
  - Burst Time must be $>$ 0.
  - Display user-friendly error messages when validation fails.
