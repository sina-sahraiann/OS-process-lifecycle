// operatingSystem.js
const Process = require('./process');

class OperatingSystem {

    constructor() {
        this.processes = [];
        this.currentProcess = null;
        this.intervalId = null;
    }

    createProcess(pid, name) {
        const process = new Process(pid, name, 'new');
        this.processes.push(process);
        console.log(`Process ${name} (PID: ${pid}) created in new state.`);
    }

    createChildProcess(parentPid, childName) {
        const parentProcess = this.findProcessByPid(parentPid);
        if (parentProcess) {
            const childPid = this.processes.length + 1;
            const childProcess = new Process(childPid, childName, 'new');
            parentProcess.children.push(childProcess);
            this.processes.push(childProcess);
            console.log(`Child process ${childName} (PID: ${childPid}) created under parent ${parentProcess.name} in new state.`);
        } else {
            console.log(`Parent process with PID ${parentPid} not found.`);
        }
    }

    terminateProcess(pid) {
        const processIndex = this.processes.findIndex(p => p.pid === pid);
        if (processIndex !== -1) {
            const terminatedProcess = this.processes.splice(processIndex, 1)[0];
            console.log(`Process ${terminatedProcess.name} (PID: ${terminatedProcess.pid}) terminated.`);

            // Recursively terminate children
            this.terminateChildren(terminatedProcess);

        } else {
            console.log(`Process with PID ${pid} not found.`);
        }
    }

    terminateChildren(parentProcess) {
        for (const childProcess of parentProcess.children) {
            this.terminateProcess(childProcess.pid);
            this.terminateChildren(childProcess);
        }
    }

    findProcessByPid(pid) {
        return this.processes.find(p => p.pid === pid);
    }

    run() {

        this.intervalId = setInterval(() => {
            if (this.currentProcess) {
                console.log(`Context switch: Switching from ${this.currentProcess.name} to another process.`);
            }

            if (this.processes.length > 0) {
                this.currentProcess = this.processes[0];
                this.currentProcess.changeState('running');
            } else {
                this.currentProcess = null;
                console.log('No processes to switch to. Exiting the interval.');
                clearInterval(this.intervalId);
            }
        }, 3000);

    }

}

module.exports = OperatingSystem;
