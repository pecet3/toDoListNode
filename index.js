const parseArgs = require("minimist");
const colors = require("colors");
const fs = require("fs");

const command = parseArgs(process.argv.slice(2, 3));
delete command._


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

const handleData = (type, title) => {
    // type - number(1 - add, 2 - remove, 3 - list)
    // title (string || null)

    const data = fs.readFileSync("data.json", "utf-8");
    const tasks = JSON.parse(data);

    if (type === 1 || type === 2) {
        const isExisted = tasks.find(task => task.title === title) ? true : false;
        if (type === 1 && isExisted) {
            return console.log("takie zadanie już istnieje!".red);
        }
        else if (type === 2 && !isExisted) {
            return console.log("takie zadanie nie istnieje!".red);
        }
    }

    let dataJSON = "";

    const getId = () => {
        for (const i in tasks) {
            tasks[i].id = i
        }
        dataJSON = JSON.stringify(tasks);
        fs.writeFileSync("data.json", dataJSON);
    }

    switch (type) {
        case 1:
            console.log("Dodaje zadanie ".cyan + title.magenta);
            const id = tasks.forEach(task => task.id === tasks.length + 1)
            tasks.push({ id, title });
            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync("data.json", dataJSON);
            break;
        case 2:
            const index = tasks.findIndex(task => task.title === title);
            tasks.splice(index, 1);
            dataJSON = JSON.stringify(tasks);
            fs.writeFile("data.json", dataJSON, "utf-8", (error) => {
                if (error) throw error;
                console.log("Usuwam zadanie ".cyan + title.magenta);
            })
            break;
        case 3:
            console.log("Wyświetlam listę...".cyan);
            console.log(``)
            if (tasks.length) {
                setTimeout(() => {
                    tasks.forEach((task, index) => {
                        if (index % 2) return console.log(`${task.id}. ${task.title}`.green);
                        console.log(`${task.id}. ${task.title}`.yellow)
                    })
                }, 1000)
            }
            break;
    }
    getId();
};

handleCommand(command);