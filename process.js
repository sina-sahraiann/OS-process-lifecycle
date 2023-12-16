class Process {
    constructor(pid, name, state) {
        this.pid = pid;
        this.name = name;
        this.state = state;
        this.children = [];
    }

    changeState(newState) {
        this.state = newState;
        console.log(`Process ${this.name} (PID: ${this.pid}) is now in ${newState} state.`);
    }
}

module.exports = Process;