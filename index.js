const parseArgs = require("minimist");
const colors = require("colors");
const command = parseArgs(process.argv.slice(2, 3));
delete command._
console.log(command);

const handleCommand = ({ add, remove, list }) => {
    console.log(add, remove, list);
    if (add) {
        if (typeof add !== 'string') {
            return console.log("zadanie musi być w formie tekstu!".red);
        }
        console.log("dodawanie");
    } else if (remove) {
        console.log("usuwanie");
    } else if (list) {
        console.log("lista");
    } else {
        console.log("nie rozumiem polecenia");
    }
}

handleCommand(command);