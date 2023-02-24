const colors = require("colors");
const fs = require("fs");
const handleData = require("./handleData.js");

const handleCommand = ({ add, remove, list }) => {
    if (add) {
        if (typeof add !== 'string') {
            return console.log("zadanie musi być w formie tekstu!".red);
        } else if (add.length < 7) {
            return console.log("zadanie musi mieć przynajmniej 6 znaków!".red);
        }
        handleData(1, add);
    } else if (remove) {
        if (typeof remove !== 'string' || remove.length < 7) {
            return console.log("podano błędną nazwę zadania...".red);
        }
        handleData(2, remove);
    } else if (list || list === "") {
        handleData(3, null);
    } else {
        console.log("Nie rozumiem polecenia. Uzyj:\n--add, aby dodać zadanie\n--remove, żeby usunąć zadanie ".cyan);
    }
}

module.exports = handleCommand;