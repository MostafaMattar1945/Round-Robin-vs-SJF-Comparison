/**
 * process.js
 * ----------
 * Defines what a "Process" looks like in our simulator.
 * A process has three properties:
 *   - id          : a name like "P1", "P2", etc.
 *   - arrivalTime : the time (in units) when the process arrives in the system
 *   - burstTime   : how many time units the process needs to finish running
 *
 * This file does NOT do any scheduling — it just describes the data shape.
 */

/**
 * createProcess
 * Creates and returns a simple process object.
 *
 * @param {string} id          - The process identifier (e.g. "P1")
 * @param {number} arrivalTime - When the process arrives (>= 0)
 * @param {number} burstTime   - How long the process needs to run (> 0)
 * @returns {object} A plain JavaScript object representing the process
 */
function createProcess(id, arrivalTime, burstTime) {
    return {
        id: id,
        arrivalTime: arrivalTime,
        burstTime: burstTime
    };
}
