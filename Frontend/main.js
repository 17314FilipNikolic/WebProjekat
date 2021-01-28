import {Park} from "./park.js"

/*const park1 = new Park(1, "Aqua park", 5, 5, 6);
park1.drawPark(document.body);*/

fetch("https://localhost:5001/Aqua/PreuzmiParkove").then(p => {
    p.json().then(data => {
        data.forEach(park => {
            const park1 = new Park(park.id, park.name, park.n, park.m, park.capacity);
            park1.drawPark(document.body);
        });
    });
});