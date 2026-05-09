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
- **Output:** Produce an array of execution intervals (Gantt chart data) with accurate start and end times.
