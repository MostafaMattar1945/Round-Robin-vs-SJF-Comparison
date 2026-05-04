/**
 * validate.js
 * -----------
 * Contains all input validation functions for the simulator.
 *
 * Rules enforced:
 *   - No field may be empty
 *   - Arrival Time must be a non-negative integer (>= 0)
 *   - Burst Time must be a positive integer (> 0)
 *   - Process IDs must be unique within the list
 *   - Quantum must be an integer >= 1
 *   - At least one process must be added before running
 *
 * This file exports TWO functions:
 *   - validateProcessInput(id, arrivalStr, burstStr, existingProcesses)
 *   - validateRunInputs(processList, quantumStr)
 */

/**
 * validateProcessInput
 * Checks the fields for a single new process before adding it to the list.
 *
 * @param {string} id                - The process ID entered by the user
 * @param {string} arrivalStr        - The arrival time as a raw string (from input)
 * @param {string} burstStr          - The burst time as a raw string
 * @param {Array}  existingProcesses - Current list of already-added processes
 * @returns {object} { valid: true } on success,
 *                   { valid: false, message: "..." } on failure
 */
function validateProcessInput(id, arrivalStr, burstStr, existingProcesses) {
    // Check for empty fields
    if (!id || id.trim() === '') {
        return { valid: false, message: 'Process ID cannot be empty.' };
    }
    if (arrivalStr === '' || arrivalStr === null || arrivalStr === undefined) {
        return { valid: false, message: 'Arrival Time cannot be empty.' };
    }
    if (burstStr === '' || burstStr === null || burstStr === undefined) {
        return { valid: false, message: 'Burst Time cannot be empty.' };
    }

    // Check that values are numeric (no letters, no special chars)
    var arrivalNum = Number(arrivalStr);
    var burstNum   = Number(burstStr);

    if (isNaN(arrivalNum) || arrivalStr.trim() === '') {
        return { valid: false, message: 'Arrival Time must be a number.' };
    }
    if (isNaN(burstNum) || burstStr.trim() === '') {
        return { valid: false, message: 'Burst Time must be a number.' };
    }

    // Arrival time must be >= 0
    if (arrivalNum < 0) {
        return { valid: false, message: 'Arrival Time must be 0 or greater.' };
    }

    // Arrival time must be a whole number
    if (Math.floor(arrivalNum) !== arrivalNum) {
        return { valid: false, message: 'Arrival Time must be a whole number (no decimals).' };
    }

    // Burst time must be > 0
    if (burstNum <= 0) {
        return { valid: false, message: 'Burst Time must be greater than 0.' };
    }

    // Burst time must be a whole number
    if (Math.floor(burstNum) !== burstNum) {
        return { valid: false, message: 'Burst Time must be a whole number (no decimals).' };
    }

    // Check for duplicate Process ID (case-insensitive)
    var trimmedId = id.trim().toUpperCase();
    for (var i = 0; i < existingProcesses.length; i++) {
        if (existingProcesses[i].id.toUpperCase() === trimmedId) {
            return { valid: false, message: 'Process ID "' + id.trim() + '" is already in the list.' };
        }
    }

    return { valid: true };
}

/**
 * validateRunInputs
 * Checks whether the simulation can be started.
 *
 * @param {Array}  processList - The list of processes currently added
 * @param {string} quantumStr  - The quantum value as a raw string
 * @returns {object} { valid: true } on success,
 *                   { valid: false, message: "..." } on failure
 */
function validateRunInputs(processList, quantumStr) {
    // Must have at least one process
    if (!processList || processList.length === 0) {
        return { valid: false, message: 'Please add at least one process before running.' };
    }

    // Quantum must not be empty
    if (quantumStr === '' || quantumStr === null || quantumStr === undefined) {
        return { valid: false, message: 'Round Robin Quantum cannot be empty.' };
    }

    var quantumNum = Number(quantumStr);

    // Quantum must be numeric
    if (isNaN(quantumNum) || String(quantumStr).trim() === '') {
        return { valid: false, message: 'Round Robin Quantum must be a number.' };
    }

    // Quantum must be a whole number >= 1
    if (Math.floor(quantumNum) !== quantumNum || quantumNum < 1) {
        return { valid: false, message: 'Round Robin Quantum must be a whole number of at least 1.' };
    }

    return { valid: true };
}
