const colors = require("colors");
const fs = require("fs");
const handleData = (type, title) => {

    const data = fs.readFileSync("data.json", "utf-8");
    let tasks = JSON.parse(data);

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

    switch (type) {
        case 1:
            console.log("Dodaje zadanie ".cyan + title.magenta);
            tasks = tasks.map((task, index) => ({ id: index + 1, title: task.title }));
            const id = tasks.length + 1;
            tasks.push({ id, title });
            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync("data.json", dataJSON);
            break;
        case 2:
            const index = tasks.findIndex(task => task.title === title);
            tasks.splice(index, 1);
            tasks = tasks.map((task, index) => ({ id: index + 1, title: task.title }));
            dataJSON = JSON.stringify(tasks);
            fs.writeFile("data.json", dataJSON, "utf-8", (error) => {
                if (error) throw error;
                console.log("Usuwam zadanie ".cyan + title.magenta);
            })
            break;
        case 3:
            console.log("Wyświetlam listę...".cyan);
            console.log(`Lista składa się z ${tasks.length} pozycji`.magenta)
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
};

module.exports = handleData;