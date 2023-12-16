const OperatingSystem = require('./operatingSystem')

const os = new OperatingSystem();

//craeting processes
os.createProcess(1, 'ProcessA');
os.createProcess(2, 'ProcessB');

//creating child processes
os.createChildProcess(1, 'ChildProcessC');
os.createChildProcess(1, 'ChildProcessD');
os.createChildProcess(2, 'ChildProcessE');

//running the operating system
os.run();

//in 9 seconds terminate process A
setTimeout(function() {
    os.terminateProcess(1)
},9000)

//in 9 seconds terminate process B
setTimeout(function() {
    os.terminateProcess(2)
},12000)


